import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { resourceNotFound } from "./common/middleware";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send(
      'please take a look at the <a href="https://github.com/Graduation-Project-2023/coffee-shop#readme%22%3E"> documentation</a> there are no routes here'
    );
  }
);

app.use(resourceNotFound);

app.use((error: any, req: any, res: any, next: any) => {
  if (error.clientVersion) {
    return res.status(500).send("Invalid arguments");
  }
  return res.status(500).send(`Something went wrong: ${error.message}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
