require("dotenv").config();

var fs = require("fs");
var pdf = require("html-pdf");
var options = { format: "Letter" };

const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
	res.send("Active");
});

app.get("/poster", async ({ query: { data } }, res) => {
	let template = await fs.promises.readFile("./template.html", "utf8");

	const results = decodeURIComponent(data).split(",");

	results.forEach((result, index) => {
		template = template.replace(`{{${index}}}`, result);
	});

	template = template.replace("{{project-root}}", process.env.PROJECT_ROOT);

	const buffer = await new Promise((resolve, reject) => {
		pdf.create(template, options).toBuffer((error, buffer) => {
			if (error) reject(error);
			resolve(buffer);
		});
	}).catch(console.error);

	res.end(buffer, "binary");
});

app.listen(PORT, () => console.log("Server started on port " + PORT));
