import jwt from 'jsonwebtoken'
import config from '../conf/config'
import bluebird from 'bluebird'
import joi from 'joi'
import bcrypt from 'bcrypt'
import pify from 'pify'

const {tokenSecret, tokenExpiresIn} = config

const validate = pify(joi.validate)

const encrypt = pify(bcrypt)


const createToken = (info) => {
  let token = jwt.sign({foo: info}, tokenSecret, {
    expiresIn: tokenExpiresIn
  })
  return token
}

const verifyToken = (token) => {
  if (!token) {
    return false
  }
  try{
    let result = jwt.verify(token, tokenSecret)
    return result
  } catch (err){
    return false
  }
} 

export {
  createToken,
  verifyToken,
  validate,
  encrypt
}