import 'dotenv/config';
import {
  Driver,
  getSACredentialsFromJson,
  declareType,
  TypedData,
  Types,
  IamAuthService,
} from 'ydb-sdk';
import { v4 } from 'uuid';
import logger from 'modules/logger';
import { User } from './types';

const endpoint = process.env.YANDEX_DATABASE_ENDPOINT;
const database = process.env.YANDEX_DATABASE_EMPLACEMENT;
const authService = new IamAuthService(getSACredentialsFromJson('key.json'));
const driver = new Driver({ endpoint, database, authService });

async function initDriver() {
  if (!driver.ready(30000)) {
    logger.error('Driver has not become ready in 10 seconds!');
    process.exit(1);
  }
}

initDriver();

class RequestUser extends TypedData {
  @declareType(Types.UTF8)
  public name: string;

  constructor(user: User) {
    super(user);
    this.name = user.name;
  }
}

async function YDBrunQuery(query: string, user: User) {
  const queryTemplate = `
    --!syntax_v1
    DECLARE $username as Utf8;

    ${query}
    `;
  const info = await driver.tableClient.withSessionRetry(async (session) => {
    const preparedQuery = await session.prepareQuery(queryTemplate);
    const requestUser = new RequestUser(user);

    const { resultSets } = await session.executeQuery(preparedQuery, {
      $username: requestUser.getTypedValue('name'),
    });

    return resultSets;
  });

  return info;
}

async function getUserInfoYDBUnsafe(user: User) {
  const query = `
  SELECT id, name, balance
  FROM user
  WHERE user.name = $username;
  `;
  const result = await YDBrunQuery(query, user);
  if (!(result[0].rows.length === 0)) {
    return result[0].rows[0].items;
  }
  return undefined;
}

async function createUserYDB(user: User) {
  const query = `
  INSERT INTO user (id, name, balance)
  VALUES ('${v4()}', $username, 0);
  `;
  await YDBrunQuery(query, user);
}

async function getUserInfoYDB(user: User) {
  let info = await getUserInfoYDBUnsafe(user);
  if (info === undefined) {
    await createUserYDB(user);
    info = await getUserInfoYDBUnsafe(user);
  }

  const parsedInfo = {
    id: info[0].textValue,
    name: info[1].textValue,
    balance: info[2].floatValue,
  };
  return parsedInfo;
}

async function getUserServersYDB(user: User) {
  const query = `
  SELECT server.name, server.token
  FROM server LEFT JOIN user
  ON server.userId = user.id
  WHERE user.name = $username
  `;
  const result = await YDBrunQuery(query, user);
  const serverList = result[0].rows.map((row) => {
    const serverInfo = { name: row.items[0].textValue, token: row.items[1].textValue };
    return serverInfo;
  });
  return serverList;
}

export async function getUserBalance(user: User) {
  const info = await getUserInfoYDB(user);
  return info.balance;
}
export async function getUserServersOnline(user: User) {
  return getUserServersTotal(user);
}
export async function getUserServersTotal(user: User) {
  const servers = await getUserServersYDB(user);
  return servers.length;
}

export async function getUserServersNameList(user: User) {
  const servers = (await getUserServersYDB(user)).map((server) => server.name);
  return servers;
}
