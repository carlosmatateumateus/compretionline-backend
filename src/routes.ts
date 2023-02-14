import { Router } from "express";
import prisma from "./lib/prisma"
import { z } from "zod";
import { multerConfig } from "./lib/multer";
import { uploadImage } from "./utils/uploadImage";
import { removeImage } from "./utils/removeImage";
import multer from "multer";

const router = Router()

// Get by category

router.get('/products/:category', async (request, response) => {
  const products = await prisma.product.findMany({
    take: 20,
    where: {
      category: request.params.category
    }
  })

  response.json(products)
})

// Search products

router.get('/search/:title/:page', async (request, response) => {
  const pageSkip = (Number(request.params.page) * 20) - 20

  const productFilteredCount = await prisma.product.count({
    where: {
      title: {
        contains: request.params.title
      },
    }
  })

  const productFiltered = await prisma.product.findMany({
    where: {
      title: {
        contains: request.params.title
      },
    },
    skip: pageSkip,
    take: 20,
  })

  response.json({ "products": productFiltered, "results": productFilteredCount})
})

// Create products

router.post('/product', async (request, response) => {
  const product_types = z.object({
    userId: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    views: z.number().default(0),
    location: z.string().default("Angola, Benguela")
  })

  const productData = product_types.parse(request.body)

  const product = await prisma.product.create({
    data: productData
  })

  response.json(product)
})

// Upload Product Photos

router.post('/image/:id', multer(multerConfig).single('image'), async (request, response) => {
  let photoUrl = "";

  await uploadImage(request.file)
  .then((value: any) => {
    photoUrl = value
  })
  .catch((error) => {
    throw new Error(error)
  })

  const url = await prisma.productImage.create({
    data: {
      productId: request.params.id,
      photoUrl: photoUrl
    }
  })

  response.json(url)
})

// Delete Product Images

router.delete('/image/:id',async (request, response) => {
  const imageProps = z.object({
    id: z.string().uuid(),
    photoUrl: z.string(),
  })

  const { id, photoUrl } = imageProps.parse(request.body)

  prisma.productImage.deleteMany({
    where: { id }
  })

  await removeImage(photoUrl)
})

router.get('/images/',async (request, response) => {
  const images = await prisma.productImage.findMany()

  response.json(images)
})

// Get product

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
      views: true,
      userId: true, 
      Question: true,
      Answer: true,
      ProductImage: true
    }
  })

  response.json(product)
})

// Edit product

router.patch('/product/:id', async (request, response) => {
  const productType = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    location: z.string().default("Angola, Benguela")
  })

  const productData = productType.parse(request.body)

  const product = await prisma.product.update({
    where: {
      id: request.params.id
    },
    data: productData
  })

  response.json(product)
})

// Delete

router.delete('/product/:id', async(request, response) => {
  await prisma.answer.deleteMany({
    where: {
      productId: request.params.id
    }
  })
  
  await prisma.question.deleteMany({
    where: {
      productId: request.params.id
    }
  })

  await prisma.productImage.deleteMany({
    where: {
      productId: request.params.id
    }
  })

  await prisma.product.delete({
    where: {
      id: request.params.id
    }
  })

  response.json({ msg: "The product Was deleted" })
})

// Make Question

router.post('/question/', async (request, response) => {
  const question_types = z.object({
    userId: z.string().uuid(),
    productId: z.string().uuid(),
    title: z.string()
  })

  const { userId, productId, title } = question_types.parse(request.body)

  const question = await prisma.question.create({
    data: {
      userId,
      productId,
      title
    }
  })

  response.json(question)
})

// Answer

router.post('/answer/', async (request, response) => {
  const answer_types = z.object({
    questionId: z.string().uuid(),
    productId: z.string().uuid(),
    title: z.string()
  })

  const { questionId, productId, title } = answer_types.parse(request.body)

  const answer = await prisma.answer.create({
    data: {
      productId,
      questionId,
      title
    }
  })

  response.json(answer)
})

router.post('/favorite/',async (request, response) => {
  const favoriteProps = z.object({
    productId: z.string().uuid(),
    userId: z.string().uuid()
  })

  const { productId, userId } = favoriteProps.parse(request.body)

  const isFavorite = await prisma.favorite.count({
    where: { productId }
  })

  if (isFavorite === 0) {
    await prisma.favorite.create({
      data: {
        productId,
        userId
      }
    })
  } else {
    await prisma.favorite.deleteMany({
      where: {
        productId,
        userId
      }
    })
  }

  response.json({ msg: "The favorite status was chaged!" })
})


export default router;