import Bulletins from '../models/Bulletins.js'

// Cria um boletim
async function createBulletins(request, response) {
    try {
        const bulletins = await Bulletins.create(request.body)

        return response.status(201).json(bulletins)
    } catch (error) {
        response.status(500).json(error)
    }
}

// Busca pelos boletins
async function getBulletins(request, response) {
    try {
        const bulletins = await Bulletins.find()

        return response.status(200).json(bulletins)
    } catch (error) {
        response.status(500).json(error)
    }
}

// Busca a última postagem de boletim
async function getLastBulletin(request, response) {
    try {
        const bulletin = await Bulletins.findOne().sort({ _id: -1 })

        return response.status(200).json(bulletin)
    } catch (error) {
        response.status(500).json(error)
    }
}

// Busca boletim por ID
async function getBulletinById(request, response) {
    try {
        const id = request.params.id
        const bulletin = await Bulletins.findById(id)

        return response.status(200).json(bulletin)

    } catch (error) {
        response.status(500).json(error)
    }
}

// Atualiza um boletim
async function updateBulletins(request, response) {
    try {
        const id = request.params.id
        const { title, text } = request.body

        await Bulletins.findOneAndUpdate({ _id: id }, { title, text })

        return response.status(200).json({ message: 'Boletim alterado com sucesso!' })

    } catch (error) {
        response.status(500).json(error)
    }
}

// Deleta um boletim por ID
async function deleteBulletins(request, response) {
    try {
        const id = request.params.id

        await Bulletins.findOneAndDelete({ _id: id })

        return response.status(200).json({ message: 'Boletim deletado!' })
    } catch (error) {
        response.status(500).json(error)
    }
}

export { createBulletins, getBulletins, updateBulletins, deleteBulletins, getBulletinById, getLastBulletin }