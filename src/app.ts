import { Tsukiko } from './tsukiko';
import { DBHandler } from './Common/dbHandler'
//new Tsukiko();

DBHandler.connect(function () { 
    console.log('dupa');
});