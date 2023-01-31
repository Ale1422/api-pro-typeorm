import "reflect-metadata";

import * as dotenv from 'dotenv';
import app from './app'
import {AppDataSource} from './db'
dotenv.config();

async function main (){
    try {
        await AppDataSource.initialize();
        console.log('Data base connected')
        app.listen(process.env.PORT);
        console.log(`Server is listening on port ${process.env.PORT}`)        
    } catch (error) {
        console.log(error)
    }
}

main();
