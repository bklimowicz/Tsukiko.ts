import { Tsukiko } from "../main";
import { Client } from "discord.js";
import { DBHandler } from "../common";

export class EventBase {
    objBot: Tsukiko;
    objClient: Client;
    objDBHandler: DBHandler;

    constructor(objBot: Tsukiko, objClient: Client, objDBHandler: DBHandler) {
        this.objBot = objBot;
        this.objClient = objClient;
        this.objDBHandler = objDBHandler;
    }
}