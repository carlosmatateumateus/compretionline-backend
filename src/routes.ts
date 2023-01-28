import { Router } from "express";
import prisma from "./lib/prisma"
import { zodProductTypes, searchQueryTypes } from "./lib/zod";

const router = Router()

router.get('/products', async (request, response) => {
  const products = await prisma.product.findMany()
  response.json(products)
})

router.get('/search/:title', async (request, response) => {
  const { category, location, state, priceMoreThan, priceLessThan } = searchQueryTypes.parse(request.query)

  let price = { } as {
    gte: number,
    lte: number,
  }

  if (priceMoreThan !== undefined) {
    price.gte = parseFloat(String(priceMoreThan))
  } 

  if (priceLessThan !== undefined) {
    price.lte = parseFloat(String(priceLessThan))
    console.log(price.lte)
  }
  
  const productFiltered = await prisma.product.findMany({ 
    where: {
      title: {
        search: String(request.params.title)
      },
     location: {
        equals: location?.toLowerCase().trim()
     },
     state: {
        equals: state?.toLowerCase().trim()
     },
     category: {
        equals: category?.toLowerCase().trim()
     }, 
     price 
    }
  })

  response.json(productFiltered)
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