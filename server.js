require("dotenv").config();
const express = require("express");
const { env } = require("process");
const slackbot = require("./functions/slackbot/slackbot");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) =>
  res.send(`
	<html>
		<head>
			<style>
				* {
					font-family:Trebuchet MS, sans-serif
				}
			</style>
			<title>Success!</title>
		</head>
		<body>
		<h1>App is running! post to /slackbot 🌊</h1>
		<img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
		</body>
	</html>
`)
);

app.post("/slackbot", (req, res) => {
  console.log(req.query.id);
  slackbot.handler(req);
});

app.use((error, req, res, next) => {
  res.status(500);
  res.send({ error: error });
  console.error(error.stack);
  next(error);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
