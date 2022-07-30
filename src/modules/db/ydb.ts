import 'dotenv/config';
import { Driver, getCredentialsFromEnv } from 'ydb-sdk';
import logger from 'modules/logger';

const endpoint = process.env.YANDEX_DATABASE_ENDPOINT;
const database = process.env.YANDEX_DATABASE_EMPLACEMENT;
const authService = getCredentialsFromEnv();
const driver = new Driver({ endpoint, database, authService });

driver.ready(1000).then(async (ready) => {
  if (!ready) {
    logger.error('Driver has not become ready in 10 seconds!');
    process.exit(1);
  }
});

export async function getUserBalance() {

}
export async function getUserServersOnline() {

}
export async function getUserServersTotal() {

}
