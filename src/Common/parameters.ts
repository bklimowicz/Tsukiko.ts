import { Parameters, Guild } from "../entity";
import { ParametersKeysConstants } from "./constants/constants";
import { Roles } from "../entity/roles";
import { RolesContainer } from "../dataObjects/dataContainers/rolesContainer";

export class TsuParameters {
    public COMMAND_PREFIX: string; 
    public TOKEN: string;
    public GUILD_ID: string;

    public Roles: RolesContainer = new RolesContainer();

    constructor() {
        this.InitializeParameters();
        console.log('Parameters loaded.');
    }

    private async InitializeParameters() {
        Parameters.findOne( { parameter: ParametersKeysConstants.COMMAND_PREFIX }).then(record => {
            this.COMMAND_PREFIX = this.GetParameterValue(record, DefaultParameters.COMMAND_PREFIX);            
        });

        Guild.findOne( { name: ParametersKeysConstants.GUILD_NAME } ).then(record => {
            this.GUILD_ID = record ? record.guildID : "";
        });

        this.LoadRoles();        
    }

    private async LoadRoles() {
        Roles.findOne({ name: ParametersKeysConstants.ADMIN_ROLE_NAME }).then(record => {
            this.Roles.ADMIN = record ? record.roleID : "";            
        });
        Roles.findOne({ name: ParametersKeysConstants.MOD_ROLE_NAME }).then(record => {
            this.Roles.MOD = record ? record.roleID : "";            
        });
        Roles.findOne({ name: ParametersKeysConstants.TECHNICIAN_ROLE_NAME }).then(record => {
            this.Roles.TECHNICIAN = record ? record.roleID : "";            
        });
    }

    public GetToken() {
        return Parameters.findOne(ParametersKeysConstants.TOKEN_NAME);        
    }
    
    private GetParameterValue(record: Parameters, defaultValue: any = "") {
        return record ? record.value : defaultValue;
    }
}

class DefaultParameters {
    public static readonly COMMAND_PREFIX = 'ts!';    
}