import User from "../Components/User.js";

class UserController {
  constructor() {
    this.users = [];
  }

  createUser(userData) {
    const { name, email, password } = userData;
    const id = this.users.length + 1;
    const newUser = new User(id, name, email, password);
    this.users.push(newUser);
    return newUser;
  }

  getUser(userId) {
    return this.users.find((user) => user.getId() === userId);
  }
}

export default UserController;