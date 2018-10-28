export abstract class CommandsConstants {
}

export abstract class Commands {
    
    public static readonly SET_PARAMETER = 'setParameter';
    public static readonly GET_PARAMETER = 'getParameter';
    public static readonly LIST_PARAMETERS = `listParameters`;
    public static readonly PING = 'ping';
    public static readonly TIMED_MUTE = 'timedMute';
    public static readonly MUTE = 'mute';
    public static readonly LIST_MUTED_USERS = 'listMutedUsers';
    public static readonly RELOAD_PARAMETERS = 'reloadParameters';

    
    public static readonly COMMANDS: string[] = [
        Commands.SET_PARAMETER,
        Commands.GET_PARAMETER,
        Commands.LIST_PARAMETERS,
        Commands.PING,
        Commands.TIMED_MUTE,
        Commands.MUTE,
        Commands.LIST_MUTED_USERS,
        Commands.RELOAD_PARAMETERS
    ];
}