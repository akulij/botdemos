import 'dotenv/config';
import { Driver, getCredentialsFromEnv } from 'ydb-sdk';

const endpoint = process.env.YANDEX_DATABASE_ENDPOINT;
const database = process.env.YANDEX_DATABASE_EMPLACEMENT;
const authService = getCredentialsFromEnv();
const driver = new Driver({ endpoint, database, authService });

export function getUserFromCtx() {

}
export function getUserBalance() {

}
export function getUserServersOnline() {

}
export function etUserServersTotal() {

}
