import express from 'express'
import devBundle from './devBundle'
import path from 'path'
const CURRENT_WORKING_DIR = process.cwd()
import template from './../template'
import {MongoClient} from 'mongodb'

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern'

MongoClient.connect(url, (err, db) => {
    console.log("Connected succesfully to mongodb server");
    db.close()
})

const app = express()
devBundle.compile(app)

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req,res) => {
    res.status(200).send(template())
})

let port = process.env.PORT || 3000
app.listen(port, function onStart(err){
    if(err){
        console.log(err);
    }
    console.info(`Server started on port: ${port}`);
})