import { Router } from 'express'
const route = Router()

import MedicineControllers from '../controllers/MedicineController.js'

route.post('/', MedicineControllers.createMedicine)
route.get('/',MedicineControllers.getMedicines)
route.get('/:id',MedicineControllers.getMedicineById)
route.patch('/:id', MedicineControllers.upDateMedicine)
route.delete('/:id', MedicineControllers.deleteMedicine)

export default route