import { Router } from "express";
import prisma from "./lib/prisma"
import { zodProductTypes, searchQueryTypes, zodProductEdited } from "./lib/zod";

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
     price,
    }
  })

  response.json(productFiltered)
})

router.get('/product/:id', async(request, response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: request.params.id
    },
    select: {
      title: true,
      description: true,
      imagesUrl: true,
      price: true,
      category: true,
      state: true,
      location: true,
      createdAt: true,
      mostView: true,
      views: true,
      userUid: true, 
      Question: true,
      Answer: true
    }
  })

  response.json(product)
})

router.post('/product/new', async(request, response) => {
  const { 
    title, state, price, description, 
    category, imagesUrl, location, views, 
    userUid
  } = zodProductTypes.parse(request.body)

  const newProduct = await prisma.product.create({
    data: {
      title, state, price, description, 
      category, imagesUrl, location, views, userUid
    }
  })

  response.json(newProduct)
})

router.patch('/product/:id', async(request, response) => {
  const editProduct = await prisma.product.update({
    where: {
      id: request.params.id
    },
    data: zodProductEdited.parse(request.body)
  })

  response.json(editProduct)
})

export default router;