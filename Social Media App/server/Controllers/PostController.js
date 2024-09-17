import Post from "../Components/Post.js";

class PostController {
  constructor() {
    this.posts = [];
  }

  createPost(postData) {
    const { content, timestamp, user } = postData;
    const id = this.posts.length + 1;
    const newPost = new Post(id, content, timestamp, user);
    this.posts.push(newPost);
    return newPost;
  }

  getPosts() {
    return this.posts;
  }
}

export default PostController;
