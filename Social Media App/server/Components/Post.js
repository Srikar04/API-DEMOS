class Post {
  constructor(id, content, timestamp, user) {
    this.id = id;
    this.content = content;
    this.timestamp = timestamp;
    this.user = user;
  }

  getId() {
    return this.id;
  } 

  getContent() {
    return this.content;
  }

  getTimestamp() {
    return this.timestamp;
  }

  getUser() {
    return this.user;
  }

  setContent(content) {
    this.content = content;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

  setUser(user) {
    this.user = user;
  }
}

export default Post;
