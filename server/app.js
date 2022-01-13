import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema.js'
import mongoose from 'mongoose'
// const express = require('express')
// const graphqlHTTP = require('express-graphql')
// const schema = require('./schema/schema.js')
// const mongoose = require('mongoose')
const app = express()

// connect to db myFirstDatabase or test
// mongodb+srv://<username>:<password>@cluster0.kqfmb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://taofik:kini419,247@cluster0.kqfmb.mongodb.net/test')
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