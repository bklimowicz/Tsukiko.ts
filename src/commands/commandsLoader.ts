import { CommandBase } from "./commandBase";
import * as cmd from './index';

class Command {
    public name: string;
    public class: CommandBase;

    constructor(name: string, _class: CommandBase) {
        this.name = name;
        this.class = _class;
    }    
}

export let commands: Command[] = [];
commands.push(new Command('setBotChannel', new cmd.SetBotChannelCommand()));
commands.push(new Command('setLogChannel', new cmd.SetLogChannelCommand()));