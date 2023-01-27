import { z } from "zod";

export const zodProductTypes = z.object({
  userUid: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  categoryId: z.number(),
  state: z.string(),
  views: z.number().default(0),
  images_url: z.string(),
  most_view: z.boolean().default(false),
  location: z.string().default("Angola, Benguela"),
})

export const zodProductFilter = z.object({
  categoryId: z.number(), 
  state: z.string(), 
  dateStart: z.date(), 
  datEnd: z.date(),
  location: z.string(), 
  priceStart: z.number(), 
  priceEnd: z.number()
})