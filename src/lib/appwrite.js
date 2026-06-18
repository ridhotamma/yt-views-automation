import { Client, Account, Databases, Functions, ID, Query } from "appwrite";

const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

export const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;

export { client, ID, Query };
