const fs = require("fs");
const express = require("express");
const path = require("path");
const readline = require('node:readline');
const app = express();

app.get("/", async (req, res) => {
  const index_start = fs.readFileSync(`index_start.html`, "utf-8");
  const script = fs.readFileSync(`script.js`, "utf-8");
  const index_finish = fs.readFileSync(`index_finish.html`, "utf-8");
  const teliko_html =
    index_start + "<script>" + "\n"  + script + "\n" + "\t" + "</script>" + "\n" + index_finish;

  const last_write = fs.writeFileSync("teliko.html", teliko_html, "utf-8");

  console.log(index_start);
  console.log(script);
  console.log(index_finish);
  console.log("------------------>le puts");
  console.log(teliko_html);
  
  res.sendFile(path.join(__dirname, "/teliko.html"));
});


app.get("/home", async (req, res) => {
    text_from_javascript =""
    processLineByLine().then((response) => {
      text_from_javascript = response
      const index_start = fs.readFileSync(`index_start.html`, "utf-8");
      const index_finish = fs.readFileSync(`index_finish.html`, "utf-8");
      const teliko_html =
      index_start +"<script>" +"\t" + text_from_javascript + "\n" + "</script>" + "\n" + index_finish;
      const last_write = fs.writeFileSync("teliko.html", teliko_html, "utf-8");
      console.log(teliko_html);
      res.sendFile(path.join(__dirname, "/teliko.html"));
    });
  });
  
  async function processLineByLine() {
    const fileStream = fs.createReadStream("script.js");
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      text_from_javascript = text_from_javascript + "\n" + "\t" + line;
    }
    return text_from_javascript;
  }


app.listen(3500, () => console.log("server listening in port 3500"));
