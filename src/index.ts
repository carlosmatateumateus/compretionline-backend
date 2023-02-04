import express from "express"
import router from "./routes"
import dotenv from "dotenv"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

dotenv.config()

app.listen(8080, () => {
  console.log('Server is running! 🚀')
})