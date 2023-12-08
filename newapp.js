const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    fs.readFile('messages.txt', 'utf8', (err,data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<html>');
      res.write('<head><title>Enter Message</title></head>');
      res.write('<body>');
      res.write(`<div>${data}</div>`);
      res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
      res.write('</body>');
      res.write('</html>');
      res.end();
    });
  } else if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('messages.txt', message, (err) => {
        if (err) {
          console.error(`Error writing to file: ${err.message}`);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(302, { 'Location': '/' });
        res.end();
      });
    });
  } 
});

server.listen(3000);