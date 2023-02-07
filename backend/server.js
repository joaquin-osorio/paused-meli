const express = require("express");
const cors = require("cors");
const fire = require("./fire.js");
const axios = require("axios");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

let ACCESS_TOKEN = "";

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const renewHeaders = {
  accept: "application/json",
  "content-type": "application/x-www-form-urlencoded",
};

const renewToken = () => {
  return new Promise((resolve, reject) => {
    fire.getAuth().then((res) => {
      axios
        .post(
          "https://api.mercadolibre.com/oauth/token",
          {
            grant_type: "refresh_token",
            client_id: res.APP_ID,
            client_secret: res.CLIENT_SECRET,
            refresh_token: res.REFRESH_TOKEN,
          },
          {
            headers: renewHeaders,
          }
        )
        .then((res) => {
          fire.pushAuth({
            ACCESS_TOKEN: res.data.access_token,
            REFRESH_TOKEN: res.data.refresh_token,
          });
          resolve(res.data.access_token);
        })
        .catch((error) => reject(error));
    });
  });
};

renewToken().then((res) => {
  console.log(res);
  ACCESS_TOKEN = res;
});

app.get("/getPublications", async (req, res) => {
  const { nickname, save } = req.query;
  let offset = 0;
  let publicationResults = [];
  while (true) {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?nickname=${nickname}&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      }
    );
    publicationResults = publicationResults.concat(response.data.results);
    offset += 50;
    if (response.data.results.length < 50) {
      break;
    }
  }

  publicationResults = publicationResults.map((item) => {
    return {
      id: item.id,
      title: item.title,
    };
  });

  const today = new Date();

  res.send({
    nickname: nickname,
    date: today,
    items: publicationResults,
  });
});
