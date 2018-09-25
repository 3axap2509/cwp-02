const net = require('net');
const port = 8124;
var counter = 0;
var qa = [];
var fs = require('fs');

const server = net.createServer((client) =>
{
  console.log('Client connected');

  client.setEncoding('utf8');

  client.on('data', (data) =>
  {
    console.log(data);
    if(data === "qa")
    {
        client.id = Date.now + counter++;
        client.write('ACK');
        read_json();
        resume_messaging(client);
    }
    else
    {
        client.write('DEC');
    }
  });

  client.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () =>
{
  console.log(`Server listening on localhost:${port}`);
});

function resume_messaging(client)
{
  
}

function read_json()
{
  fs.readFile('qa.json', 'utf8', (err, data) =>
  {
    if (err) throw err;
    qa = JSON.parse(data);
  });
}