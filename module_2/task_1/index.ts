import * as express from "express";
const PORT = 3001;
const app = express();
import { dataBase } from "./DB";
import { User } from "./user.model";
import { createUserSchema, updateUserSchema, validate } from "./validation";
app.use(express.json());

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const user = dataBase.getUser(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: `user with id ${id} not found` });
  }
});
app.put("/user", validate(updateUserSchema), (req, res) => {
  const user: User = req.body;
  const id = user.id;
  const updatedUser = dataBase.updateUser(req.body.id, req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: `user with id ${id} not found` });
  }
});

app.post("/user", validate(createUserSchema), (req, res) => {
  const user = dataBase.createUser(req.body);
  res.json(user);
});

app.get("/users", (req, res) => {
  const limit = Number(req.query.limit);
  const loginSubString = (req.query.loginSubString as string) || "";
  const users = dataBase.getAutoSuggestUsers(loginSubString, limit);
  res.json(users);
});

app.delete("/user", (req, res) => {
  const id = req.query.id;
  const user = dataBase.deleteUser(req.query.id);
  if (id) {
    res.json(user);
  } else {
    res.status(404).json({ error: `user with id ${id} not found` });
  }
});
app.listen(PORT, null, () => console.log(`Server is running on port ${PORT}`));
