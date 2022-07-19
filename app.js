
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
import fetch from "node-fetch";
app.use("/", async (req, res) => {
  const { url } = req.query

  const data = await fetch(url)
  res.send(data)
});

export default app;
