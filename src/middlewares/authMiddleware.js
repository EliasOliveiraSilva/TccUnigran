import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const authMiddleware = (request, response, next) => {
    try {
        const { authorization } = request.headers
        if (!authorization) {
            return response.sendStatus(401)
        }

        const parts = authorization.split(' ')

        if (parts.length !== 2) {
            return response.sendStatus(401)
        }

        const [schema, token] = parts
        if (schema !== 'Bearer') {
            return response.sendStatus(401)
        }

        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            request.id = decoded.id
            next()
        })

    } catch (error) {
        return response.sendStatus(500).json({ msg: 'Token inválido!' })
    }
}