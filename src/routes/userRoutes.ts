import { Router } from "express";
import prisma from "../lib/prisma"
import { z } from "zod";

const router = Router()

router.post('/user', async (request, response) => {
  const userType = z.object({
    id: z.string(),
    email: z.string()
  })

  const { id, email } = userType.parse(request.body)

  let user = await prisma.user.findFirst({
    where: { id }
  })

  if (user !== null) {
    await prisma.user.update({
      where: { id },
      data: { email }
    })
  } else {
    user = await prisma.user.create({
      data: { id, email }
    })
  }

  response.json(user)
})

router.get('/user/email/:productId', async (request, response) => {
  const user = await prisma.product.findFirst({
    where: { id: request.params.productId },
    select: {
      user: true
    }
  })

  response.json(user?.user)
})

export default router