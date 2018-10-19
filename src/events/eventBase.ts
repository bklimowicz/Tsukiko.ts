import { Tsukiko, TsuParameters } from "../main";
import { Client } from "discord.js";

export abstract class EventBase{
    protected client: Client;
    protected parameters: TsuParameters;

    constructor(client: Client, parameters: TsuParameters) {
        this.client = client;
        this.parameters = parameters;

        this.RegisterEvent();
    }

    protected abstract RegisterEvent(): any;
}