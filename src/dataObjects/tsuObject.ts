import { Client } from "discord.js";
import { DBHandler, Logger } from "../common";

export class TsuObject {
    protected objBotClient: Client;
    protected objDBConnection: DBHandler;
    protected objLogger: Logger;

    constructor(objBotClient: Client, objDBConnection: DBHandler, objLogger: Logger) {
        this.objBotClient = objBotClient;
        this.objDBConnection = objDBConnection;
        this.objLogger = objLogger;
    }
}