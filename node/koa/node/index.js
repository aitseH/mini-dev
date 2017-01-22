import Koa from 'koa'
import cors from 'kcors'
import jwt from 'koa-jwt'
import restc from 'restc'
import Router from 'koa-router'
import convert from 'koa-convert'
import bodyparser from 'koa-bodyparser'

import './entry'
import routes from './src/route'

const app = new Koa()
const router = new Router()

app.use(convert(cors()))
app.use(convert(bodyparser()))
app.use(restc.koa2())

app.use(routes.routes())
app.use(routes.allowedMethods())

app.use(async(ctx, next) => {
  try {
     await next()
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = '401 Unauthorized - Protected resource, use Authorization header to get access\n';
    } else {
      throw err
    }
  }
})

app.use(jwt({ secret: 'secret' }))

const PORT = process.env.PORT || 8080
app.listen(PORT || 8080, () => {
  console.log(`app is running ${PORT}`)
})