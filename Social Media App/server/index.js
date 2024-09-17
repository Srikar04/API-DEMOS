import express from "express";
import bodyParser from "body-parser";
import UserController from "./Controllers/UserController.js";
import PostController from "./Controllers/PostController.js";

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userController = new UserController();
const postController = new PostController();

app.post("/users", (req, res) => {
  const newUser = userController.createUser(req.body);
  res.status(201).json(newUser);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userController.getUser(userId);
  if (user === undefined) {
    res.status(404).send("User not found");
    return;
  }
  res.status(200).json(user);
});

app.post("/posts", (req, res) => {
  const newPost = postController.createPost(req.body);
  res.status(201).json(newPost);
});

app.get("/posts", (req, res) => {
  const posts = postController.getPosts();
  if (!posts || posts.length === 0) {
    res.status(404).send("No posts found");
    return;
  }
  res.status(200).json(posts);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
