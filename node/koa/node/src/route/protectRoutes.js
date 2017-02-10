import Router from 'koa-router'
import {getAuthUser} from '../controllers/auth'

const router = new Router()

router.get('/user/profile', getAuthUser)

export default router
