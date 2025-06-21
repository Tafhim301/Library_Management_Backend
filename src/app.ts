import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowsRoutes } from "./app/controllers/borrows.controller";
const app: Application = express();

app.use(express.json());

app.use('/api/books',booksRoutes)
app.use('/api/borrow',borrowsRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to library management server");
});

export default app;