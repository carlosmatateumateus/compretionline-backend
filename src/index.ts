import express, { response } from "express"
import dotenv from "dotenv"
import cors from "cors"

// Routes

import productRoutes from "./routes/productRoutes"
import userRoutes from "./routes/userRoutes"

const app = express()

dotenv.config()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Use routes

app.get('/', (request, response) => {
  response.json({ msg: "Welcome back to compretionline-api! 👋" })
})

app.use(productRoutes)
app.use(userRoutes)



app.listen(8080, () => {
  console.log('Server is running! 🚀')
})