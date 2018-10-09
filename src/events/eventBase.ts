import { Tsukiko, BotParameters } from "../main";
import { Client } from "discord.js";

export abstract class EventBase{
    protected client: Client;
    protected parameters: BotParameters;

    constructor(client: Client, parameters: BotParameters) {
        this.client = client;
        this.parameters = parameters;

        this.RegisterEvent();
    }

    protected abstract RegisterEvent(): any;
}