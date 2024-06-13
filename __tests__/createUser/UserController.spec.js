import UserController from '../../src/controllers/UserController.js'
import userService from '../../src/services/UserServices.js'

jest.mock('../src/services/UserServices.js')

describe("Testando os metodos de rota do controller user", () => {
    test("Testando a Rota de criação de usuário", async () => {
        const request = {
            body: {
                name: "Elias Oliveira",
                age: "06/03/1975",
                cpf: "12345678",
                cns: "147852",
                telephone: "6799999-9999",
                address: "Rua Do TCC, 2024"
            }
        }

        const response = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        }

        await UserController.createUsers(request, response)

        expect(userService.create).toHaveBeenCalledTimes(1)
        expect(userService.create).toHaveBeenCalledWith({
            name: "Elias Oliveira",
            age: "06/03/1975",
            cpf: "12345678",
            cns: "147852",
            telephone: "6799999-9999",
            address: "Rua Do TCC, 2024"
        })
        expect(response.status).toHaveBeenCalledWith(201)
    })
})

