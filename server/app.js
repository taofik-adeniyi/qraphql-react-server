import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema.js'
const app = express()


// graphql base middleware

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(4000, ()=>{
    console.log('app listening on port 4000')
})