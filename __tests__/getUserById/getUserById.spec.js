import UserController from '../../src/controllers/UserController.js'
import userService from '../../src/services/UserServices.js'

jest.mock('../src/services/UserServices.js')

describe("Test de Rota Busca por ID", () => {
    test("Testa a Rota de busca de usuários por ID", async() =>{

        const request = {
            params:{
                _id: "6668ae9e6acd5c4553f46da7",
            }
        }

        const response = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        }

        await UserController.findById(request)

        expect(response.status).toHaveBeenCalledWith(400)
    })
})