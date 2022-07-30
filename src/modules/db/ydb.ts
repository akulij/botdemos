import 'dotenv/config';
import { Driver, getCredentialsFromEnv } from 'ydb-sdk';

const endpoint = process.env.YANDEX_DATABASE_ENDPOINT;
const database = process.env.YANDEX_DATABASE_EMPLACEMENT;
const authService = getCredentialsFromEnv();
const driver = new Driver({ endpoint, database, authService });

export async function getUserFromCtx() {

}
export async function getUserBalance() {

}
export async function getUserServersOnline() {

}
export async function etUserServersTotal() {

}
