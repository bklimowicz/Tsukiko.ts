import { ILogger } from "../interfaces";
import { TextChannel } from "discord.js";
import * as FS from 'fs';

export class Logger implements ILogger {
    readonly LOG_PATH: string;
    readonly LOG_COLOR: number; 
    readonly LogLevel: number;

    constructor() {
        this.LOG_PATH = './log/log.txt';
        this.LOG_COLOR = 0x17A589;
        this.LogLevel = 1;
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
            color: this.LOG_COLOR 
        }}
    }
}