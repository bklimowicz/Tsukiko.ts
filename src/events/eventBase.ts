import { Tsukiko } from "../main";
import { Client, User, Guild } from "discord.js";
import { DBHandler } from "../common";

export abstract class EventBase {
    protected objBot: Tsukiko;
    protected objClient: Client;
    protected objDBHandler: DBHandler;

    constructor(objBot: Tsukiko, objClient: Client, objDBHandler: DBHandler) {
        this.objBot = objBot;
        this.objClient = objClient;
        this.objDBHandler = objDBHandler;
        this.RegisterEvent();
    };

    protected abstract RegisterEvent(): void;    
}