import { mockUsers } from "./mock-user";
import { User } from "./user.model";

export class DataBase {
  data: { [id: string]: User };
  constructor(data: User[]) {
    this.data = data.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
  }
  getUser(id: string) {
    const user = this.data[id];
    if (user && !user.isDeleted) {
      return this.data[id];
    }
  }
  updateUser(id: string, user: User) {
    if (this.data[id] && !this.data[id].isDeleted) {
      this.data[id] = user;
      return user;
    }
  }
  createUser(user: Partial<User>) {
    user.id = Object.keys(this.data).length.toString();
    this.data[user.id] = user as User;
  }
  getAutoSuggestUsers(loginSubString: string, limit: number): User[] {
    const users = Object.keys(this.data)
      .filter((id) => {
        return (
          this.data[id].login.includes(loginSubString) &&
          this.data[id].isDeleted === false
        );
      })
      .map((id) => this.data[id]);
    if (limit) {
      return users.slice(0, limit);
    }
    return users;
  }

  deleteUser(user): User {
    const id = user.id;
    this.data[id].isDeleted = true;
    return this.data[id];
  }
}

export const dataBase = new DataBase(mockUsers);
