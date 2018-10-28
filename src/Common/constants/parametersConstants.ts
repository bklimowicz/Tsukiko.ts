export abstract class ParametersConstants {    
    public static readonly BOT_CHANNEL = 'botChannel';
    public static readonly LOG_CHANNEL = 'logChannel';
    public static readonly COMMAND_PREFIX = 'command_prefix';
    public static readonly TIMED_MUTE_AVAILABLE = 'timed_mute_available';
    public static readonly MESSAGE_DELETE_TIME = 'message_delete_time';
    public static readonly EMBEDED_COLOR = 'embeded_color';

    public static readonly PARAMETERS = [
        ParametersConstants.BOT_CHANNEL,
        ParametersConstants.LOG_CHANNEL,
        ParametersConstants.COMMAND_PREFIX,
        ParametersConstants.TIMED_MUTE_AVAILABLE,
        ParametersConstants.MESSAGE_DELETE_TIME,
        ParametersConstants.EMBEDED_COLOR
    ];
}