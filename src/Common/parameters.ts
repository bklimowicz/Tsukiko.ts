import { Parameters, Guild, Channels } from "../entity";
import { ParametersKeysConstants } from "./constants/constants";
import { Roles } from "../entity/roles";
import { RolesContainer } from "../dataObjects/dataContainers/rolesContainer";
import { ChannelsContainer } from "../dataObjects/dataContainers";

export class TsuParameters {
    public COMMAND_PREFIX: string; 
    public TOKEN: string;
    public GUILD_ID: string;

    public Roles: RolesContainer = new RolesContainer();
    public Channels: ChannelsContainer = new ChannelsContainer();

    public MESSAGE_DELETE_TIME: number;

    public EMBEDED_COLOR: number;

    constructor() {
        this.InitializeParameters();
        console.log('Parameters loaded.');
    }

    private InitializeParameters() {        
        Parameters.findOne({ parameter: ParametersKeysConstants.COMMAND_PREFIX }).then(record => {
            this.COMMAND_PREFIX = this.GetParameterValue(record, "");            
        });

        Parameters.findOne({ parameter: ParametersKeysConstants.MESSAGE_DELETE_TIME }).then(record => {
            this.MESSAGE_DELETE_TIME = Number(this.GetParameterValue(record, ""));
            console.log(this.MESSAGE_DELETE_TIME);
        });

        Parameters.findOne({ parameter: ParametersKeysConstants.EMBEDED_COLOR }).then(record => {
            this.EMBEDED_COLOR = Number(this.GetParameterValue(record, ""));
            console.log(this.EMBEDED_COLOR);
        });

        Guild.findOne({ name: ParametersKeysConstants.GUILD_NAME }).then(record => {
            this.GUILD_ID = record ? record.guildID : "";
        });

        this.LoadChannels();
        this.LoadRoles();
    }

    public ReloadParameters() {
        this.InitializeParameters();
    }

    private LoadChannels() {
        Channels.findOne({ channelName: ParametersKeysConstants.BOT_CHANNEL }).then(record => {
            if (record === null || record === undefined) {
                return;
            }
            this.Channels.BOT_CHANNEL = record.channelID;
        });
        
        Channels.findOne({ channelName: ParametersKeysConstants.LOG_CHANNEL }).then(record => {
            if (record === null || record === undefined) { 
                return;
            }
            this.Channels.LOG_CHANNEL = record.channelID;
        });

        Channels.findOne({ channelName: ParametersKeysConstants.GENERAL_CHANNEL }).then(record => {
            if (record === null || record === undefined) {
                return;
            }
            this.Channels.GENERAL_CHANNEL = record.channelID;
        });
    }

    private LoadRoles() {
        Roles.findOne({ name: ParametersKeysConstants.ADMIN_ROLE_NAME }).then(record => {
            if (record === null || record === undefined) { 
                return;
            }
            this.Roles.ADMIN = record ? record.roleID : "";            
        });
        Roles.findOne({ name: ParametersKeysConstants.MOD_ROLE_NAME }).then(record => {
            if (record === null || record === undefined) {
                return;
            }
            this.Roles.MOD = record ? record.roleID : "";            
        });
        Roles.findOne({ name: ParametersKeysConstants.TECHNICIAN_ROLE_NAME }).then(record => {
            if (record === null || record === undefined) {
                return;
            }
            this.Roles.TECHNICIAN = record ? record.roleID : "";            
        });
        Roles.findOne({ name: ParametersKeysConstants.MUTED_ROLE_NAME }).then(record => {
            if (record === null || record === undefined) {
                return;
            }
            this.Roles.MUTED = record ? record.roleID : "";
        })
    }

    public GetToken() {
        return Parameters.findOne({ parameter: ParametersKeysConstants.TOKEN_NAME}); 
    }
    
    private GetParameterValue(record: Parameters, defaultValue: any = "") {
        return record ? record.value : defaultValue;
    }
}