import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Post title is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Post content is required"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true
    }
)

// Index for querying comments by note
PostSchema.index({ noteId: 1, creationDate: -1 });
PostSchema.index({ commentId: 1 });

export default mongoose.model("Post", PostSchema);
