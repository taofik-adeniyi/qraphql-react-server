import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema.js'
import mongoose from 'mongoose'
// import config from './config.js';
process.env.MONGO_URI="mongodb+srv://taofik:kini419,247@cluster0.kqfmb.mongodb.net/test"


// require('custom-env').env()
// Require custom-env and set your preferred env file
// import env from 'custom-env'
// env('staging')
// require ('custom-env').env('staging')
// console.log(process.env.APP_ENV)
// const express = require('express')
// const graphqlHTTP = require('express-graphql')
// const schema = require('./schema/schema.js')
// const mongoose = require('mongoose')
process.env.MY_VARIABLE = 'ahoy';
console.log('env p', process.env, process.env.MONGO_URI)
const app = express()
// console.log(`NODE_ENV=${config.NODE_ENV}`);
console.log(process.env.MY_VARIABLE)
// connect to db myFirstDatabase or test
// mongodb+srv://<username>:<password>@cluster0.kqfmb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', ()=> {
    console.log('connected to database')
})

// graphql base middleware

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(4000, ()=>{
    console.log('app listening on port 4000')
})