import Medicines from "../models/Medicines.js";

const create = (body) => Medicines.create(body)

const findAll = () => Medicines.find()

const findById = (id) => Medicines.findById(id)

const upDate = (id, commercial_name, generic_name, amount) => Medicines.findOneAndUpdate({ _id: id }, { commercial_name, generic_name, amount })

const deleteId = (id) => Medicines.findOneAndDelete({ _id: id })

export default { create, findAll, findById, upDate, deleteId }