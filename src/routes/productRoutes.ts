import { Router } from "express";
import prisma from "../lib/prisma"
import { z } from "zod";
import getDate from "../utils/getDate";

const router = Router()

router.post('/product', async (request, response) => {
  let product = {};
  let httpStatus = 201;

  const productType = z.object({
    userId: z.string(),
    title: z.string()
    .min(10, { message: "Must be 5 or more characters long" })
    .max(20, { message: "Must be 20 or fewer characters long" }),

    description: z.string()
    .min(30, { message: "Must be 30 or more characters long" })
    .max(350, { message: "Must be 350 or more characters long" }),

    price: z.number()
    .gte(1)
    .lte(1000000000000),

    location: z.string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(30, { message: "Must be 30 or more characters long" }),

    photo: z.string()
    .startsWith("https://", { message: "Must provide secure URL" })
  })

  const { userId, title, description, price, location, photo } = productType.parse(request.body)
  
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

    httpStatus = 201
  })
  .catch((e) => {
    product = e
    httpStatus = 501
  })

  response.status(httpStatus).json(product)
})

router.patch('/product/:id', async (request, response) => {
  const productType = z.object({
    title: z.string()
    .min(10, { message: "Must be 5 or more characters long" })
    .max(30, { message: "Must be 5 or fewer characters long" }),

    description: z.string()
    .min(30, { message: "Must be 5 or more characters long" })
    .max(350, { message: "Must be 5 or more characters long" }),

    price: z.number()
    .gte(0.1)
    .lte(1000000000),

    location: z.string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(15, { message: "Must be 5 or more characters long" }),

    photo: z.string()
    .startsWith("https://", { message: "Must provide secure URL" })
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