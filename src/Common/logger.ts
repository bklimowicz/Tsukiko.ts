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
    
    public LogEntry(place: string, message: string, channel?: TextChannel) {
        if (this.LogLevel < 1) return;

        const NAME = `LOG_ENTRY`;

        this.WriteToFile(NAME, place, message);
        if (channel !== undefined) {
            this.WriteToLogChannel(NAME, place, message, channel);
        }
    }

    public LogExit(place: string, message: string, channel?: TextChannel) {
        if (this.LogLevel < 1) return;

        const NAME = `LOG_EXIT`;        

        this.WriteToFile(NAME, place, message);
        if (channel !== undefined) {
            this.WriteToLogChannel(NAME, place, message, channel);
        }
    }
    public LogWarning(place: string, message: string, channel?: TextChannel) {
        if (this.LogLevel < 1) return;

        const NAME = `LOG_WARNING`;

        this.WriteToFile(NAME, place, message);
        if (channel !== undefined) {
            this.WriteToLogChannel(NAME, place, message, channel);
        }
    }

    private WriteToLogChannel(NAME: string, place: string, message: string, channel: TextChannel) {
        channel.send(this.CreateLogEmbedMessage(NAME, place, message));
    }

    private WriteToFile(NAME: string, place: string, message: string) {
        FS.appendFile(this.LOG_PATH, `${new Date().toLocaleTimeString()}:{${NAME}:${place}:${message}\n`, (error: any) => {
            console.log(`${NAME}: ${error}`);
        });
    }

    private CreateLogEmbedMessage(NAME: string, place: string, message: string): any {
        return {embed:{
            title: `${place}`,
            description: `${message}\n${new Date().toLocaleTimeString()}`,
            color: this.LOG_COLOR 
        }}
    }
}