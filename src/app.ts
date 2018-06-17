import { DBHandler } from './index';
import { Tsukiko } from './main';

let dbConn = new DBHandler();
new Tsukiko(dbConn);