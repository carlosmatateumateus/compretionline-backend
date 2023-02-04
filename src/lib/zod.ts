import { z } from "zod";

export const zodProductTypes = z.object({
  userUid: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  category: z.string(),
  state: z.string(),
  views: z.string().default("0"),
  mostView: z.boolean().default(false),
  location: z.string().default("Angola, Benguela"),
  questionId: z.string().uuid().optional()
})

export const searchQueryTypes = z.object({
  category: z.string().optional(),
  state: z.string().optional(),
  location: z.string().optional(),
  priceMoreThan: z.string().optional(),
  priceLessThan: z.string().optional(),
})
