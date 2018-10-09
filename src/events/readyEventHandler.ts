import { Client, Guild } from "discord.js";
import { Tsukiko } from "../main";
import { TsuGuild } from "../dataObjects";
import { EventBase } from "./eventBase";

export class ReadyEventHandler extends EventBase {
    protected RegisterEvent() {
        throw new Error("Method not implemented.");
    }

}