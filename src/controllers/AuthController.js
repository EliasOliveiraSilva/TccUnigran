import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Função de verificação de autenticidade do token
function authenticToken(request, response, next) {

    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return response.status(401).json({ msg: 'Usuário não autorizado!' })
    }
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)

        next()
    } catch (error) {
        return response.status(400).json({ msg: 'Token inválido!' })
    }
    // 
}

// Busca o usuário //Área pública
async function getUsersSystem(request, response) {
    try {
        const id = request.params.id
        // Busca o usuário
        const user = await User.findById(id, '-password')
        if (!user) {
            return response.status(404).json({ msg: 'Usuário não encontrado!' })
        }

        response.status(200).json({user, msg: 'Bem vindo a área restrita!!' })

    } catch (error) {
        response.status(500).json(error)
    }
}

// Registra o usuário no sistema
async function createUsersAuth(request, response) {
    const { name, username, email, password, passwordConfirm } = request.body
    // Validations
    if (!name) {
        return response.status(500).json({ msg: 'O nome é obrigatório' })
    }
    if (!username) {
        return response.status(500).json({ msg: 'O nome de usuário é obrigatório' })
    }
    if (!email) {
        return response.status(500).json({ msg: 'O email é obrigatório' })
    }
    if (!password) {
        return response.status(500).json({ msg: 'A senha é obrigatória' })
    }
    if (password !== passwordConfirm) {
        return response.status(500).json({ msg: 'As senhas não são iguais!' })
    }

    const userExist = await User.findOne({ email: email })
    if (userExist) {
        return response.status(500).json({ msg: 'Por favor, utilize outro email!' })
    }
    // Cria senha criptografada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    // Cria usuário
    const user = { name, username, email, password: passwordHash }
    // Create
    try {
        const newUser = await User.create(user)
        response.status(201).json({ newUser, msg: 'Usuário cadastrado com sucesso!' })

    } catch (error) {
        return response.status(500).json({ msg: 'Erro ao cadastrar usuário!' })
    }
}

// Faz o login do usuário autenticado
async function getUsersAuth(request, response) {
    const { email, password } = request.body

    if (!email) {
        return response.status(500).json({ msg: 'O email é obrigatória' })
    }

    if (!password) {
        return response.status(500).json({ msg: 'A senha é obrigatória' })
    }

    // Verifica se o usuário existe
    const user = await User.findOne({ email: email })
    if (!user) {
        return response.status(404).json({ msg: 'Usuário não encontrado!' })
    }

    // Verifica se a senha esta correta
    const checkUser = await bcrypt.compare(password, user.password)
    if (!checkUser) {
        return response.status(422).json({ msg: 'Senha inválida!' })
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({ id: user._id }, secret, {expiresIn: 43200})
        response.status(200).json({ token, msg: 'Bem vindo a área restrita!!' })

    } catch (error) {
        response.status(500).json(error)
    }
}

export { getUsersAuth, getUsersSystem, createUsersAuth, authenticToken }