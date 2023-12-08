const http = require('http');

// const server = http.createServer((req,res)=>{
//     console.log(req.url, req.method, req.headers);
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<h1>Satyasai Kaisarla</h1>');
// });

// server.listen(4000);

const serverTwo = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write('<h1>Hello!</h1>')
    }
    if(req.url === '/home'){
        res.write('<h1>Welcome Home</h1>')
    }
    if(req.url === '/about'){
        res.write('<h1>Welcome to About Us Page</h1>')
    }
    if(req.url === '/node'){
        res.write('<h1>Welcome to my Node.js Project</h1>')
    }
    res.end()
})

serverTwo.listen(3000)