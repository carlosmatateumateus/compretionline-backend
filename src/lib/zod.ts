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