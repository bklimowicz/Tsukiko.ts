import { Parameters } from "../entity";
import { ParameterKeyConstants } from "./constants";

export class BotParameters {
    public COMMAND_PREFIX: string; 
    public TOKEN: string;

    constructor() {
        this.InitializeParameters();
    }

    private async InitializeParameters() {
        await Parameters.findOne( { parameter: ParameterKeyConstants.COMMAND_PREFIX_NAME }).then(record => {
            this.COMMAND_PREFIX = this.GetParameterValue(record, DefaultParameters.COMMAND_PREFIX);
        });        
    }

    public GetToken() {
        return Parameters.findOne(ParameterKeyConstants.TOKEN_NAME);        
    }
    
    private GetParameterValue(record: Parameters | undefined, defaultValue: any) {
        return record ? record.value : defaultValue;
    }
}

class DefaultParameters {
    public static readonly COMMAND_PREFIX = 'ts!';
}