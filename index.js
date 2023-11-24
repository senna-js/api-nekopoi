const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.type("json");

  const keluaran = {
    success: true,
    author: "Wibumoe",
    sumber: "https://nekopoi.help",
    data: {
      //Ambil_anime_terbaru: "/terbaru",
      Ambil_detail_anime: "/detail/:endpoint",
      //Ambil_stream_anime: "/stream/:endpoint",
      //Ambil_search_anime: "/search/:namaanime",
      //Ambil_all_kategori_list: "/genrelist",
      //Ambil_data_genre: "/genres/:endpoint",
    },
  };
  res.send(keluaran);
});

app.get("/detail/:nama", (req, res) => {
  const url = req.params.nama;

  getDetailAnime(url).then((result) => {
    res.send(result);
  });
});

async function getDetailAnime(url) {
  let { data } = await axios.get("https://nekopoi.help/anime/" + url);

  const $ = cheerio.load(data);

  let arr = [];
  let arr2 = [];

  const fotonime = $("div.bg-white.shadow").find(".postprocover img").attr("src");
  const judul = $("div.bg-white.shadow").find("div.colinfo h2").first().text();
  const jepang = $("div.bg-white.shadow").find("div.colinfo span").first().text();
  const status = $("div.post-body").find("ul.infolist a").first().text();
  const type = $("div.post-body").find("ul.infolist a(2)").text();
  const score = $("div.post-body").find("ul.infolist span(3)").text();
  const duration = $("div.post-body").find("ul.infolist span(4)").text();
  const released = $("div.post-body").find("ul.infolist span(5)").text();
  const producers = $("div.post-body").find("ul.infolist span(6)").text();
  const genres = $("div.colinfo").find("div.genres a").text();
  const sinopsis = $("div.jcontent.jayapanel").find(".sinops").text();

  $("ul.ulinklist div.scrcnt ul li").each((index, element) => {
    const episod = $(element).find("a").text();
    let endpoint = $(element).find("a").attr("href");

    endpoint = endpoint.split("/")[4];

    arr2.push({
      id: index + 1,
      title: episod,
      endpoint: endpoint,
    });
  });

  arr.push({
    fotonime: fotonime,
    judul: judul,
    jepang: jepang,
    status: status,
    type: type,
    score: score,
    duration: duration,
    released: released,
    producers: producers,
    genres: genres,
    sinopsis: sinopsis,
  });

  let objek = {
    success: true,
    author: "Wibumoe",
    sumber: "https://nekopoi.help/",
    data: {
      arr,
    },
  };

  return objek;
};

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
