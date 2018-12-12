import { ILogger } from "./../interfaces";
import { TextChannel } from "discord.js";
import * as FS from 'fs';
import { LoggerConstants } from "./constants/loggingConstants";

export class Logger implements ILogger {
    private readonly LOG_PATH: string;
    private LogColor: number; 
    private LogLevel: number;

    
    constructor() {
        this.LOG_PATH = LoggerConstants.LOG_PATH;
        this.LogColor = LoggerConstants.LOG_COLOR;
        this.LogLevel = LoggerConstants.LOG_LEVEL;
    }
    
    public SetLogLevel(value: number) {
        this.LogLevel = value;
    }

    public SetLogColor(value: number) {
        this.LogColor = value;
    }

    public LogWarning(place: string, message: string, channel?: TextChannel, operationType?: string) {
        if (this.LogLevel < 1) return;

        const NAME = `LOG_WARNING`;

        this.WriteToFile(NAME, place, message, operationType);
        if (channel !== undefined) {
            this.WriteToLogChannel(NAME, place, message, channel, operationType);
        }
    }

    public LogError(place: string, message: string, channel?: TextChannel, operationType?: string) {
        if (this.LogLevel < 1) return;

        const NAME = `LOG_ERROR`;

        this.WriteToFile(NAME, place, message, operationType);
        if (channel !== undefined) {
            this.WriteToLogChannel(NAME, place, message, channel, operationType);
        }
    }

    public LogInfo(place: string, message: string, channel?: TextChannel, operationType?: string) {
        if (this.LogLevel < 1) return;

        const NAME = `LOG_INFO`;

        this.WriteToFile(NAME, place, message, operationType);
        if (channel !== undefined) {
            this.WriteToLogChannel(NAME, place, message, channel, operationType);
        }
    }

    private WriteToLogChannel(NAME: string, place: string, message: string, channel: TextChannel, operationType?: string) {
        channel.send(this.CreateLogEmbedMessage(NAME, place, message, operationType));
    }

    private WriteToFile(NAME: string, place: string, message: string, operationType?: string) {
        FS.appendFile(this.LOG_PATH, `${new Date().toLocaleTimeString()}:{${NAME}:${place}:${operationType}:${message}:\n`, (error: any) => {
            console.log(`${NAME}: ${error}`);
        });
    }

    private CreateLogEmbedMessage(NAME: string, place: string, message: string, operationType?: string): any {
        return {embed:{
            title: `${place}`,
            description: `${operationType}\n${message}\n${new Date().toLocaleTimeString()}`,
            color: this.LogColor 
        }}
    }
}