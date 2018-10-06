import { DBHandler } from './index';
import { Tsukiko } from './main';
import "reflect-metadata";

let dbConn = new DBHandler();
new Tsukiko(dbConn);