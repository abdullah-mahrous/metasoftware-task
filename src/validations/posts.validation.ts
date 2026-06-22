import { z } from "zod";

export const postSchema = z.object({
    title: z.string().trim().min(1, 'title is required'),
    content: z.string().trim().min(1, 'conten is required'),
})

export const updatePostSchema = z.object({
    title: z.string().trim().min(1, 'title is required').optional(),
    content: z.string().trim().min(1, 'conten is required').optional(),
})
