import { Client, Account, Databases, Query} from 'appwrite';

const client = new Client();

 client.setEndpoint(import.meta.env.VITE_APPWRITE_URL)
.setProject(import.meta.env.VITE_API_KEY);

export const account = new Account(client);
export const databases = new Databases(client);
export  const dbId  = import.meta.env.VITE_DATABASE_ID;
export  const collId = import.meta.env.VITE_COLLECTION_ID;

export default client;