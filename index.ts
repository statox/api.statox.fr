import express from "express";
import { checkChordsUrl } from "./src/chordsUrlsChecker";

const PORT = process.env.PORT || 3000;

const app = express();

const testRoute = (req: express.Request, res: express.Response) => {
  const o = { time: Date.now() };
  res.send(o);
};

const chordsCheckRoute = async (req: express.Request, res: express.Response) => {
    const checkResults = await checkChordsUrl();
    res.send(checkResults);
};

app
    .get("/", testRoute)
    .get("/checkChordsUrl", chordsCheckRoute)
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
