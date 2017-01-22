import joi from 'joi'
import jwt from 'koa-jwt'

import {User} from '../model'
import {createToken, verifyToken, validate, encrypt}from '../helper'


export const signin = async(ctx) => {
  let userData = {
    // username or email
    account: ctx.request.body.account,
    password: ctx.request.body.password
  }

  try {
    userData = await validate(userData, joi.object().keys({
      account: joi.string().min(2).max(20).required(),
      password: joi.string().min(6).max(20).required()
    }))
  } catch (err) {
    return ctx.throw(403, err)
  }

  const user = await User.findOne({
    $or: [
      {username: userData.account},
      {email: userData.account}
    ]
  })
    .select('username avatar createdAt updatedAt password')
    .exec()

  if (!user) {
    return ctx.throw(404, 'user not found')
  }

  const isPasswordCorrect = await encrypt.compare(userData.password, user.password)
  user.password = undefined

  if (!isPasswordCorrect) {
    ctx.throw(403, 'Passoword mismatches')
  }

  const token = createToken(user.id)
  ctx.body = {
    token,
    user
  }
}

export const signup = async(ctx) => {

  let userData = {
    username: ctx.request.body.username,
    email: ctx.request.body.email,
    password: ctx.request.body.password
  }

  try {
    const user = await User.findOne({
      $or: [
        {username: userData.username},
        {email: userData.email}
      ]
    })
    if(user) {
      return ctx.throw(403, 'sorry, the user name or email has already been used')
    } else {
      userData = await validate(userData, joi.object().keys({
        username: joi.string().min(2).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).required()
      }))

      userData.password = await encrypt.hash(userData.password, 10)

      const user = new User(userData)
      await user.save()
      const token = createToken(user.id)

      ctx.body = {
        token,
        user
      }
    }
  } catch (err) {
    ctx.throw(403, err)
  }
}