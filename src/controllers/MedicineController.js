import mongoose from 'mongoose'
import medicineServices from "../services/MedicineServices.js";

// Cadastra um medicamento
const createMedicine = async (request, response) => {
    try {
        const { commercial_name, generic_name, amount } = request.body

        if (!commercial_name || !generic_name || !amount) {
            response.status(400).send({ message: 'Preencha todos os campos para envio!' })
        }

        const medicine = await medicineServices.create(request.body)

        if (!medicine) {
            return response.status(400).send({ message: 'Erro ao cadastrar medicamento!' })
        }

        response.status(201).send({ medicine: { id: medicine._id, commercial_name, generic_name, amount }, message: 'Medicamento criado com sucesso!' })

    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// Busca por medicamentos
const getMedicines = async (request, response) => {
    try {
        const medicines = await medicineServices.findAll()

        if (medicines.length === 0) {
            return response.status(400).send({ message: 'Não ha medicamentos cadastrados!' })
        }

        response.send(medicines)
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}
// // Busca um medicamento por ID
const getMedicineById = async (request, response) => {
    try {
        const id = request.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ message: 'Medicamento inválido!' })
        }

        const medicine = await medicineServices.findById(id)

        if (!medicine) {
            return response.status(400).send({ message: 'Medicamento não encontrado!' })
        }

        response.send(medicine)
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// // Atualiza um medicamento por ID
const upDateMedicine = async (request, response) => {
    try {
        const { commercial_name, generic_name, amount } = request.body

        if (!commercial_name && !generic_name && !amount) {
            response.status(400).send({ message: 'Preencha pelo menos um campo para envio!' })
        }

        const id = request.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ message: 'Medicamento inválido!' })
        }

        const medicine = await medicineServices.findById(id)

        if (!medicine) {
            return response.status(400).send({ message: 'Medicamento não encontrado!' })
        }

        await medicineServices.upDate(id, commercial_name, generic_name, amount)

        response.send({ message: 'Medicamento atualizado com sucesso!' })
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// // Deleta um medicamento por ID
const deleteMedicine = async (request, response) => {
    try {
        const id = request.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ message: 'Medicamento inválido!' })
        }

        const medicine = await medicineServices.findById(id)

        if (!medicine) {
            return response.status(400).send({ message: 'Medicamento não encontrado!' })
        }

        await medicineServices.deleteId(id)

        response.send({ message: 'Medicamento deletado com sucesso!' })

    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

export default { createMedicine, getMedicines, getMedicineById, upDateMedicine, deleteMedicine }