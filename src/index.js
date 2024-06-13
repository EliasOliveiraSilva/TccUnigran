import express from 'express'
import cors from 'cors'
import connectDatabase from './database/db.js'
import userRoute from '../src/routes/user.route.js'
import medicineRoute from '../src/routes/medicine.route.js'

// import swaggerUi from 'swagger-ui-express'
// import swaggerDocument from '../swagger.json' assert { type: 'json' } //assert { type: 'json' } - corrige erro de import swagger.json

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/user', userRoute)
app.use('/medicine', medicineRoute)

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

connectDatabase().then(() => {
    app.listen(port, () => console.log(`Servidor rodando na porta ${port} e Banco de dados mongoAtlas conectado!`))
}).catch((error) => console.log('Erro ao conectar com o banco de dados!', error))
