import express from 'express';
import dotenv from 'dotenv';
import logger from './src/utils/loggers.js'
import { welcomeUser } from './src/mailServices/welcomeUser.js';
import { newFriend } from './src/mailServices/friendship.js'
import cron from 'node-cron'

dotenv.config();
const app=express();


const PORT=process.env.PORT || 3500





const run = async()=>{
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('Checking for a new user');
        
        await welcomeUser()
        await newFriend()
        // console.log(welcomeUser());
    })
    
}

run()

app.listen(PORT,()=>{
    logger.info(`This App is running on port : ${PORT}`);
})