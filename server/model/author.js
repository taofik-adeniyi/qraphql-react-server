import mongoose from 'mongoose'
// const mongoose = require('mongoose')


const AuthorSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

const Author =  mongoose.model('Author', AuthorSchema)
export default Author
// export default model('Author', AuthorSchema);
// module.exports =  mongoose.model('Author', AuthorSchema)