import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import validation from "../middlewares/validation";
import { postSchema, updatePostSchema } from "../validations/posts.validation";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/postsController";

const router = express.Router();

/**
 * @swagger
 * /api/posts/:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       createdAt:
 *                         type: date
 *                       updatedAt:
 *                         type: date
 *                       author:
 *                         type: object
 *                         properties:
 *                           email:
 *                             type: string
 *                           name:
 *                             type: string
 */
router.get("/", getAllPosts)

// bonus endpoint
/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post fetched successfully
 *       404:
 *         description: Post not found
 *       400:
 *         description: invalid title or content
 */
router.get("/:id", getPost)

/**
 * @swagger
 * /api/posts/:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: invalid title or content
 */
router.post("/", authMiddleware, validation(postSchema), createPost)

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       403:
 *         description: Unauthorized action
 *       404:
 *         description: Post not found
 *       400:
 *         description: invalid title or content
 */
router.put("/:id", authMiddleware, validation(updatePostSchema), updatePost)

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       403:
 *         description: Unauthorized action
 *       404:
 *         description: Post not found
 */
router.delete("/:id", authMiddleware, deletePost)

export default router;