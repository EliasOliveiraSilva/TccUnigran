describe("Test de Rota GET", () => {
    test("Testa a Rota de busca de usuários", async() =>{
        const response = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        }

        await UserController.getUsers(response)

        expect(response.status).toHaveBeenCalledWith(201)
    })
})