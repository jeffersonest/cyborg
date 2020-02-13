import {Router} from 'express'

const mainRoutes = Router()

mainRoutes.get('/', (req, res, next)=>(res.send('Server Online!')))

module.exports = mainRoutes