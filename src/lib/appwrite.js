import { Client, Account, Databases, ID, Query } from "appwrite";

const client = new Client()
	.setEndpoint(
		import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
	)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export { client, ID, Query };
