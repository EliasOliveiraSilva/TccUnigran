import mongoose from 'mongoose'
import userService from '../services/UserServices.js'

// Cria um usuário
const createUsers = async (request, response) => {
    try {
        const { name, age, cpf, cns, telephone, address } = request.body

        if (!name || !age || !cpf || !cns || !telephone || !address) {
            response.status(400).send({ message: 'Preencha todos os campos para envio!' })
        }

        const user = await userService.create(request.body)

        if (!user) {
            return response.status(400).send({ message: 'Erro ao cadastrar usuário!' })
        }

        response.status(201).send({ user: { id: user._id, name, age, cpf, cns, telephone, address }, message: 'Usuário criado com sucesso!' })

    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// Busca todos os usuários
const getUsers = async (request, response) => {
    try {
        const users = await userService.findAll()

        if (users.length === 0) {
            return response.status(400).send({ message: 'Não ha usuários  cadastrados!' })
        }

        response.send(users)

    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// Busca usuário por ID
const getUserById = async (request, response) => {
    try {
        const id = request.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ message: 'Ususário inválido!' })
        }

        const user = await userService.findById(id)

        if (!user) {
            return response.status(400).send({ message: 'Ususário não encontrado!' })
        }

        response.send(user)

    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// Atualiza um usuário por ID
const updateUser = async (request, response) => {
    try {
        const { name, age, cns, telephone, address } = request.body

        if (!name && !age && !cns && !telephone && !address) {
            response.status(400).send({ message: 'Preencha pelo menos um campo para envio!' })
        }

        const id = request.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ message: 'Ususário inválido!' })
        }

        const user = await userService.findById(id)

        if (!user) {
            return response.status(400).send({ message: 'Ususário não encontrado!' })
        }

        await userService.upDate(id, name, age, cns, telephone, address)

        response.send({ message: 'Usuário atualizado com sucesso!' })

    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// Cadastra agendamento
const registerScheduling = async (request, response) => {
    try {
        const { title, date, description, patientId } = request.body

        if (!title && !date && !description && !patientId) {
            response.status(400).send({ message: 'Preencha todos os campos para envio!' })
        }

        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return response.status(400).send({ message: 'Ususário inválido!' })
        }

        const userPatient = await userService.findById(patientId)

        if (!userPatient) {
            return response.status(400).send({ message: 'Ususário não encontrado!' })
        }

        const schedulingId = Math.floor(Date.now() * Math.random()).toString(36)

        await userService.registerScheduling(patientId, schedulingId, title, date, description)

        response.send({ message: 'Usuário atualizado com sucesso!' })

    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// Cadastra medicamentos
const registerMedicine = async (request, response) => {
    try {
        const { commercial_name, generic_name, amount, patientId } = request.body

        if (!commercial_name && !generic_name && !amount && !patientId) {
            response.status(400).send({ message: 'Preencha todos os campos para envio!' })
        }

        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return response.status(400).send({ message: 'Ususário inválido!' })
        }

        const userPatient = await userService.findById(patientId)

        if (!userPatient) {
            return response.status(400).send({ message: 'Ususário não encontrado!' })
        }

        const medicinesId = Math.floor(Date.now() * Math.random()).toString(36)

        await userService.registerMedicine(patientId, medicinesId, commercial_name, generic_name, amount)

        response.send({ message: 'Usuário atualizado com sucesso!' })

    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

export default { createUsers, getUsers, getUserById, updateUser, registerScheduling, registerMedicine }