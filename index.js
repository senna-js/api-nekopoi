const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const port = 3000;

const url = "https://nekopoi.help/anime/overflow/";
axios(url).then((response) => {
  const html_data = response.data;
  const $ = cheerio.load(html_data);
});
