
// -----------------Init App----------------- //
import express from "express";
const app = express();

// environment vairables
import env from "dotenv";
env.config();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`bounce live on port ${PORT}`);
});


// ----------------Middleware---------------- //
import cors from "cors";
app.use(cors({ origin: "*" }));

import logger from "morgan";
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ------------------Routes------------------ //
import { e, s, tryCatch } from "./utils.js";
import fetch from "node-fetch";

app.use("/", async (req, res) => { // url?http://example.com/
  const { url } = req.query

  if (!url) return e(400, "no url provided", res)

  tryCatch(async () => {
    let data = await fetch(url)
    if (!data) e(400, `${url} returned no response`, res)

    data = await data.json()
    s("data retrieved!", data, res)
  }, res)
});

export default app;
