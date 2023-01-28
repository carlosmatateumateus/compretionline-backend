import { z } from "zod";

export const zodProductTypes = z.object({
  userUid: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  state: z.string(),
  views: z.number().default(0),
  images_url: z.string(),
  most_view: z.boolean().default(false),
  location: z.string().default("Angola, Benguela"),
})

export const searchQueryTypes = z.object({
  category: z.string().optional(),
  state: z.string().optional(),
  location: z.string().optional(),
  priceMoreThan: z.string().optional(),
  priceLessThan: z.string().optional(),
})
