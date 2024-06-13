import User from '../models/User.js'

const create = (body) => User.create(body)

const findAll = () => User.find()

const findById = (id) => User.findById(id)

const upDate = (id, name, age, cpf, cns, telephone, address) => User.findOneAndUpdate({ _id: id }, { name, age, cpf, cns, telephone, address })

const registerScheduling = (patientId, schedulingId, title, date, description) => User.findOneAndUpdate({ _id: patientId }, { $push: { scheduling: { schedulingId, title, date, description, createdAt: new Date() } } })

const registerMedicine = (patientId, medicinesId, commercial_name, generic_name, amount) => User.findOneAndUpdate({ _id: patientId }, { $push: { medicines: { medicinesId, commercial_name, generic_name, amount, createdAt: new Date() } } })

export default { create, findAll, findById, upDate, registerScheduling, registerMedicine }