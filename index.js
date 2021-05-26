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

app.post("/poster", async (req, res) => {
	let template = await fs.promises.readFile("./template.html", "utf8");

	pdf.create(template, options).toStream((error, stream) => {
		if (error) reject(error);
		res.set("Content-type", "application/pdf");
		stream.pipe(res);
	});
});

app.get("/poster", async ({ query: { data } }, res) => {
	let template = await fs.promises.readFile("./template.html", "utf8");

	data.forEach((result, index) => {
		template = template.replace(`{{${index}}}`, decodeURIComponent(result));
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
