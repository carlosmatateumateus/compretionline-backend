import { Router } from "express";
import prisma from "../lib/prisma"
import { z } from "zod";
import getDate from "../utils/getDate";

const router = Router()

router.post('/product', async (request, response) => {
  let product = {};

  const product_types = z.object({
    userId: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    location: z.string(),
    photo: z.string(),
  })

  const { userId, title, description, price, location, photo } = product_types.parse(request.body)
  console.log(userId, title, description, price, location, photo)
  
  await getDate()
  .then(async (createdAt:any) => {
    product = await prisma.product.create({
      data: {
        userId,
        title,
        description,
        price,
        location,
        photo,
        createdAt
      }
    })
  })

  response.status(201).json(product)
})

router.patch('/product/:id', async (request, response) => {
  const productType = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    location: z.string().default("Angola, Benguela"),
    photo: z.string()
  })

  const { title, description, price, location, photo } = productType.parse(request.body)

  const product = await prisma.product.update({
    where: { id: request.params.id },
    data: { title, description, price, location, photo }
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
      price: true,
      location: true,
      createdAt: true,
      userId: true, 
      photo: true,
    }
  })

  response.json(product)
})

router.delete('/product/:id', async(request, response) => {
  await prisma.product.delete({
    where: {
      id: request.params.id
    }
  })

  response.json({ msg: "The product Was deleted" })
})

router.get('/product/search/:title/', async (request, response) => {
  const products = await prisma.product.findMany({
    where: {
      title: {
        search: request.params.title
      },
    },
  })

  const productsCount = await prisma.product.count({
    where: {
      title: {
        search: request.params.title
      },
    },
  })

  response.json({ products, results: productsCount})
})

router.get('/product/my/:id', async (request, response) => {
  const products = await prisma.product.findMany({
    where: {
      userId: request.params.id
    }
  })

  const productsCount = await prisma.product.count({
    where: {
      userId: {
        contains: request.params.id
      },
    },
  })

  response.json({ products, results: productsCount})
})

export default router