const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const storySchema = new Schema({

	title: { type: String, unique: false, required: false },
    author: { type: String, unique: false, required: false },
    date: { type: Date, default: Date.now },
    views: { type: Number, default:0 },
    content: { type: String, unique: false, required: false },
    base64: { type: String, unique: false, required: false }

})

// Define schema methods
// userSchema.methods = {
// 	checkPassword: function (inputPassword) {
// 		return bcrypt.compareSync(inputPassword, this.password)
// 	},
// 	hashPassword: plainTextPassword => {
// 		return bcrypt.hashSync(plainTextPassword, 10)
// 	}
// }

// Define hooks for pre-saving
// userSchema.pre('save', function (next) {
// 	if (!this.password) {
// 		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
// 		next()
// 	} else {
// 		console.log('models/user.js hashPassword in pre save');
		
// 		this.password = this.hashPassword(this.password)
// 		next()
// 	}
// })



const Story = mongoose.model('Story', storySchema)
module.exports = Story