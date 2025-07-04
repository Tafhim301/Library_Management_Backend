import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowsRoutes } from "./app/controllers/borrows.controller";
import cors from "cors";
const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-frontend-alpha.vercel.app",
    ],
  })
);

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to library management server");
});

export default app;
