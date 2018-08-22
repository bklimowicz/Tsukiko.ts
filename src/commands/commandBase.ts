import { Logger } from "../common";

export class CommandBase {
    protected isAdminCommand: boolean = false;
    protected commandName: string = '';
    private readonly commandPrefix: string = 'ts!';
    private objLogger: Logger;

    constructor()
    {
        this.objLogger = new Logger();
        this.DoCommand();
    }

    protected run(): void {
        // debug purposes
        console.log(this.commandName);
    }

    protected DoCommand(): boolean {                
        let result = false;
        return result;
    }
}