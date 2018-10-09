import { Tsukiko } from './main';
import "reflect-metadata";
import { createConnection } from 'typeorm';

createConnection().then(() => {    
    new Tsukiko();
}).catch(error => {
    console.log(error);
});