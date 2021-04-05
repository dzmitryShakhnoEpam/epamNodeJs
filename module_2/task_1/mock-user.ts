import { userInfo } from "node:os";
import { User } from "./user.model";

export const mockUsers: User[] = [
  {
    id: "1",
    login: "user",
    password: "userPassword",
    age: 18,
    isDeleted: false,
  },
  {
    id: "2",
    login: "admin",
    password: "adminPassword",
    age: 19,
    isDeleted: false,
  },
  {
    id: "3",
    login: "deletedUser",
    password: "deletedUserPassword",
    age: 19,
    isDeleted: true,
  },
];
