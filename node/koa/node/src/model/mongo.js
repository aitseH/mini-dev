import mongoose, {Schema, ObjectId} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import timestamp from 'mongoose-timestamp'
import bluebird from 'bluebird'
import config from '../../conf/config'

mongoose.Promise = bluebird

let mongoUrl = `${config.mongoHost}:${config.mongoPort}/${config.mongoDatabase}`

mongoose.connect(mongoUrl)

let db = mongoose.connection

db.on('error', (err)=>{
    console.error("connect error:", err)
})

db.once('open', () => {
    console.log('MongoDB is ready')
})


let user = new Schema({
  username: {type: String, unique: true},
  password: String,
  email: {type: String, unique: true}
})

user.plugin(uniqueValidator)
user.plugin(timestamp)

export const User = mongoose.model('User', user)