let postId = 0;
const posts = [];

class Post {
  constructor(title, body) {
    this.id = ++postId;
    this.title = title;
    this.body = body;
    this.comments = [];
  }

  static getAll() {
    return posts;
  }

  static getById(id) {
    return posts.find(post => post.id === id);
  }

  static create(title, body) {
    const newPost = new Post(title, body);
    posts.push(newPost);
    return newPost;
  }

  static deleteById(id) {
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
      posts.splice(index, 1);
      return true;
    }
    return false;
  }

  static updateById(id, newTitle, newBody) {
    const post = posts.find(post => post.id === id);
    if (post) {
      post.title = newTitle;
      post.body = newBody;
      return post;
    }
    return null;
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}

Post.prototype.addComment = function (commentBody) {
    this.comments.push(commentBody);
};

module.exports = Post;