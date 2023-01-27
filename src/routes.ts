import { Router } from "express";
import prisma from "./lib/prisma"
import { zodProductTypes, zodProductBody } from "./lib/zod";

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

router.post('/product/new', async(request, response) => {
  const newProduct = await prisma.product.create({
    data: zodProductTypes.parse(request.body)
  })

  response.json(newProduct)
})

export default router;