import { TextChannel } from "discord.js";

export interface ILogger {            
    LogError(place: string, message: string, channel?: TextChannel, operationType?: string): any;
    LogInfo(place: string, message: string, channel?: TextChannel, operationType?: string): any;
    LogWarning(place: string, message: string, channel?: TextChannel, operationType?: string): any;
}