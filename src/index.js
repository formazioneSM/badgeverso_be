'use strict'

const fs = require('fs');
const path = require("path");
const mongoose = require('./services/mongoose')
const app = require('./services/express');
const { default: axios } = require('axios');

// start app and connect to database
const startApp = async () => {
    try{
        await app.start()
        await mongoose.connect()
        // let file = JSON.parse(fs.readFileSync(path.resolve(__dirname, './UtentiGIBA.json'))).map(u => ({...u, password: '123456'}));
        // file.forEach( f => {
        //     setTimeout(async () => {
        //         try{
        //             await axios.post('http://localhost:3000/api/auth/register', f)
        //         }catch( error ){
        //             console.log(erro1r)
        //         }
        //     }, 300);
        // })
    }
    catch(err){
        console.log(err);
    }
}
startApp();

module.exports = app
