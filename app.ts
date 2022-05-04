import dotenv from 'dotenv'
import Server from './lib/models/server';

dotenv.config();
const server = new Server();

server.listen();