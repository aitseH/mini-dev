import Koa from 'koa'
import cors from 'kcors'
import jwt from 'koa-jwt'
import restc from 'restc'
import convert from 'koa-convert'
import bodyparser from 'koa-bodyparser'

import './entry'
import publicRoutes from './src/route/publicRoutes'
import protectRoutes from './src/route/protectRoutes'
import config from './conf/config'

const app = new Koa()

app.use(convert(cors()))
app.use(convert(bodyparser()))
app.use(restc.koa2())

app.use(publicRoutes.routes())
app.use(publicRoutes.allowedMethods())

app.use(convert(jwt({ secret: config.tokenSecret })))

app.use(protectRoutes.routes())
app.use(protectRoutes.allowedMethods())

const PORT = process.env.PORT || 8080
app.listen(PORT || 8080, () => {
  console.log(`app is running ${PORT}`)
})