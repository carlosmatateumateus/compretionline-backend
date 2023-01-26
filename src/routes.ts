import { Router } from "express";
import prisma from "./lib/prisma"

const router = Router()

router.get('/products', async (request, response) => {
  const products = await prisma.product.findMany()
  response.json(products)
})


router.get('/product/:id', async(request, response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: request.params.id
    }
  })

  response.json(product)
})

export default router;