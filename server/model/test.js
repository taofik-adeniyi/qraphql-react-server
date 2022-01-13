// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const matchSchema = new Schema({
//       gender: {
//       type: String,
//       required: true
//       },
//       age: {
//         type: Number
//       }
// });

// export const mongooseMatch = mongoose.model('match', matchSchema);


import mongoose from 'mongoose'

const CompletedSchema = new mongoose.Schema(
	{
		type: { type: String, enum: ['course', 'classroom'], required: true },
		parentslug: { type: String, required: true },
		slug: { type: String, required: true },
		userid: { type: String, required: true }
	},
	{ collection: 'completed' }
)

CompletedSchema.index({ slug: 1, userid: 1 }, { unique: true })

const MyModel = mongoose.model('Completed', CompletedSchema)
export default MyModel