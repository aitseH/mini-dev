import Router from 'koa-router'
import * as auth from '../controllers/auth'

const router = new Router()

router.get('/', (ctx) => {
  ctx.body = 'Hello Wrold'
})

router.post('/auth/signup', auth.signup)
router.post('/auth/signin', auth.signin)

export default router
