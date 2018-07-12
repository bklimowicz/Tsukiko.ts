import { TextChannel } from "discord.js";

export interface ILogger {    
    readonly LOG_PATH: string;
    readonly LOG_COLOR: number;
    LogEntry(place: string, message: string, channel: TextChannel): any;
    LogExit(place: string, message: string, channel: TextChannel): any;
    LogWarning(place: string, message: string, channel: TextChannel): any;
}