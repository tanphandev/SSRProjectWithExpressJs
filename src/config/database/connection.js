const mongoose = require('mongoose')
async function connection() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect('mongodb://127.0.0.1/db_education')
        console.log('connect database success!')
    } catch (error) {
        console.log('connect database fail! error:', error)
    }
}

module.exports = { connection }
