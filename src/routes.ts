import { Router } from "express";
import prisma from "./lib/prisma"
import { zodProductTypes, searchQueryTypes } from "./lib/zod";
import { multerConfig } from "./lib/multer";
import { uploadImage } from "./controllers/uploadImage";
import multer from "multer";

const router = Router()

// Get all products
router.get('/products', async (request, response) => {
  const products = await prisma.product.findMany()
  response.json(products)
})

// Search products

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

// Crea

router.post('/product', multer(multerConfig).array('images', 5), async (request, response) => {
  const images = [] as Array<String>

  for (let img of request.files as any) {
    await uploadImage(img)
    .then((url:any) => {
      images.push(url)
    })
    .catch(e => {
      console.log(e)
    })
  }
  
  const imagesUrl = JSON.stringify(images)

  const { 
    title, state, price, description, 
    category, location, views, 
    userUid
  } = zodProductTypes.parse(request.body)

  const product = await prisma.product.create({
    data: {
      title, state, price:Number(price), description, 
      category, imagesUrl, location, views: Number(views), userUid
    }
  })

  response.json(product)
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

router.patch('/product/:id', multer(multerConfig).array('images', 5), async (request, response) => {
  const productId = request.params.id
  const images = [] as Array<String>

  for (let img of request.files as any) {
    await uploadImage(img)
    .then((url:any) => {
      images.push(url)
    })
    .catch(e => {
      console.log(e)
    })
  }
  
  const imagesUrl = JSON.stringify(images)

  const { 
    title, state, price, description, 
    category, location, views, 
    userUid
  } = zodProductTypes.parse(request.body)

  const product = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      title, state, price:Number(price), description, 
      category, imagesUrl, location, views: Number(views), userUid
    }
  })

  response.json(product)
})

router.delete('/product/:id', async(request, response) => {
  const product = await prisma.product.delete({
    where: {
      id: request.params.id
    }
  })

  response.json(product)
})

export default router;