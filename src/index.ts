import "reflect-metadata"

import app from './app'
import {AppDataSource} from './db'

async function main (){
    try {
        await AppDataSource.initialize();
        console.log('Data base connected')
        app.listen(3001);
        console.log('Server is listening on port 3001')        
    } catch (error) {
        console.log(error)
    }
}

main();
