import graphql from 'graphql'
import _ from 'lodash'
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql

// dummy data

var books = [
    {name: 'Name of the wind', genre: 'Fantasy', id: '1'},
    {name: 'The final empire', genre: 'Fantasy', id: '2'},
    {name: 'The long earth', genre: 'Sci-Fi', id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                console.log(typeof(args.id))
                // here you query your db to get data or other source 
                return _.find(books, {id: args.id} )
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})