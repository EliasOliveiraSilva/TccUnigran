import { Router } from 'express'
const route = Router()

import UserControllers from '../controllers/UserController.js'

route.post('/', UserControllers.createUsers)
route.get('/', UserControllers.getUsers)
route.get('/:id', UserControllers.getUserById)
route.patch('/:id', UserControllers.updateUser)
route.patch('/scheduling/:patientId', UserControllers.registerScheduling)
route.patch('/medicines/:patientId', UserControllers.registerMedicine)

export default route 