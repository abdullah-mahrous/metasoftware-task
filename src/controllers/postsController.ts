import { Request, Response, NextFunction } from "express"
import mongoose from "mongoose";
import Post from "../models/Post";
import { appError } from "../utilities/appError";

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const posts = await Post.find().populate("author", "name emial").sort({createdAt: -1});

        return res.status(200).json({
            success: true,
            message: 'Posts fetched successfully',
            data: posts
        });

    } catch (err) {
        return next(err);
    }
}

// get single post by id
export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // validating id to handle wrong id errors
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id))
            return next(new appError("Post not found", 404));

        const post = await Post.findById(req.params.id).populate("author", "name email");

        if (!post)
            return next(new appError("Post not found", 404));

        return res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            data: post
        });

    } catch (err) {
        return next(err);
    }
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { title, content } = req.body;

        const post = await Post.create({
            title: title,
            content: content,
            author: req.user.id
        });

        await post.populate("author", "name email");

        return res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post
        });

    } catch (err) {
        return next(err);
    }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // validating id to handle wrong id errors
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id))
            return next(new appError("Post not found", 404));

        // check if req body is empty
        if(!req.body.title && !req.body.content)
            return next(new appError("At least one field must be provided", 400));

        // partial update is enabled
        const post = await Post.findById(req.params.id);
        
        if (!post)
            return next(new appError("Post not found", 404));

        if (post.author.toString() !== req.user.id.toString())
            return next(new appError("Unauthorized action", 403));
        
        post.title = req.body.title ?? post.title;
        post.content = req.body.content ?? post.content;

        await post.save();
        
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post,
        });
    } catch (err) {
        return next(err);
    }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // validating id to handle wrong id errors
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id))
            return next(new appError("Post not found", 404));

        const post = await Post.findById(req.params.id);

        if (!post)
            return next(new appError("Post not found", 404));

        if (post.author.toString() !== req.user.id.toString())
            return next(new appError("Unauthorized action", 403));

        await post.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (err) {
        return next(err);
    }
};
