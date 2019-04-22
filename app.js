const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 4000;

dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
  console.log(process.env.BREWERY_API_KEY);
  res.send("Hello World");
});

app.get("/beers", async (req, res) => {
  if (req.query) {
    page = req.query.page;
    console.log(page);
  }
  let beers;
  let processed;
  try {
    beers = await axios.get(
      `http://api.brewerydb.com/v2/beers/?key=${
        process.env.BREWERY_API_KEY
      }&p=${page}`
    );
    processed = beers.data.data;
  } catch (e) {
    console.log(e);
    return "ERROR";
  }
  const finalData = {
    info: {
      currentPage: beers.data.currentPage,
      numberOfPages: beers.data.numberOfPages,
      totalResults: beers.data.totalResults
    },
    data: processed
  };
  console.log("OK...");
  res.send(finalData);
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening on port ${port}...`);
});
