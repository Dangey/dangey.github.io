const fs = require('fs');
const fsp = fs.promises;

const dir = 'posts/';

let posts = "";

async function listDir (dir) {
  try {
    return await fsp.readdir(dir);
  } catch (err) {
    console.log(err);
  }
}

async function readFile (path) {
  console.log("using file: " + path);
  try {
    return await fsp.readFile(path, 'utf8');
  } catch (err) {
    console.log(err);
  }
}

function convertToHTML (data) {
  const p = JSON.parse(data);
  const post = p.post;
  if (!post) return "";
  
  const title = p.title;
  const date = p.date;
  const body = (p.body).replace(/\\n/g, '<br>');

  const post = `<div class="card">` +
    `<h2>${title}</h2>` +
    `<h5>${date}</h5>` +
    `<p>${body}</p>` +
    `</div>`;

  return post;
}

async function writeFile (filename, data, html) {
  const content = data.replace('<!--POSTS-->', html);
  console.log(content);
  
  try {
    return await fsp.writeFile(filename, content, 'utf8')
  } catch (err) {
    console.log(err);
  }
}

async function main () {
  const files = await listDir(dir);
  console.log("\nCurrent directory files (" + dir + "):");
  console.log(files);
  for (const file of files) {
    let fullpath = dir + file;
    const data = await readFile(fullpath);
    posts +=  convertToHTML(data);
  }
  const filename = 'index.html';
  const hdata = await readFile(filename);
  await writeFile(filename, hdata, posts);
}

module.exports = {
  main: main()
}
