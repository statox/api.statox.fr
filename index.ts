import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

const testRoute = (req: express.Request, res: express.Response) => {
  const o = { time: Date.now() };
  res.send(o);
};

app.get("/", testRoute).listen(PORT, () => console.log(`Listening on ${PORT}`));
