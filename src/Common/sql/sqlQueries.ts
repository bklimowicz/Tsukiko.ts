export class SQLQueries {
    public static getBotChannel = `select channelID from guildChannelsAffiliation
                                    where \`channelName\` = 'botChannel'`;
    public static getLogChannel = `select channelID from guildChannelsAffiliation
                                    where \`channelName\` = 'logsChannel'`;
    public static getToken = `select value from parameters where \`key\` = 'TOKEN'`;
}