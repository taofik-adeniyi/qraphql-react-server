import _ from "lodash";
import graphql, {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
}  from "graphql";
// import Completed from "../model/test.js";
import MyModel from "../model/test.js"
import Author from "../model/author.js";
import { Book } from "../model/book.js";
// MyModel
// const graphql, {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLSchema,
//   GraphQLID,
//   GraphQLInt,
//   GraphQLList
// }  = require('graphql')
// const _ = require('lodash')
// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLSchema,
//   GraphQLID,
//   GraphQLInt,
//   GraphQLList
// } = graphql;
// const Author = require('../model/author')


// import {mongooseMatch} from '../model/test';

// import graphql from "graphql";
// import _ from "lodash";
// import {Book} from '../model/book'
// import {Author} from '../model/author'
// const Book = require('../model/book')
// const Author = require('../model/author')

// Book

// author

// dummy data

// var books = [
//   { name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The final empire", genre: "Fantasy", id: "2", authorId: "2" },
//   { name: "The long earth", genre: "Sci-Fi", id: "3", authorId: "3" },
//   { name: "hero of ages", genre: "myth", id: "4", authorId: "3" },
//   { name: "color of magic", genre: "myth", id: "5", authorId: "3" },
//   { name: "crimes of grindewal", genre: "Sci-Fi", id: "6", authorId: "2" },
// ];

// var authors = [
//   { name: "ileriayo", age: 27, id: "1" },
//   { name: "taofik", age: 28, id: "2" },
//   { name: "prince", age: 67, id: "3" },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        // return _.find(authors, { id: parent?.authorId });
        return Author.findById(parent?.authorId)
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        console.log(parent);
        // return _.filter (books, { authorId: parent.id });
        return Book.find({
          authorId: parent?.id
        })
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(typeof args.id);
        // here you query your db to get data or other source
        // return _.find(books, { id: args.id });
        return Book.findById(args.id)
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(args.id);
        // return _.find(authors, { id: args.id });
        return Author.findById(args?.id)
      },
    },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args){
            // return books
            return Book.find({})
        }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
            // return authors
            return Author.find({})
        }
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
