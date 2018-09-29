const fs = require('fs');
const net = require('net');
const port = 8124;
const client = new net.Socket();
var qa = [];
var waiting4answer = false;
var connected = false;
var counter4questing = 0;


client.setEncoding('utf8');

client.connect(port, function() {
  fs.readFile('qa.json', 'utf8', (err,data) =>
  {
    if(err)
    {
      console.error(err);
    }
    else
    {
      qa = JSON.parse(data);
      json_b = true;
    }
  });
  console.log('Connected to server');
  client.write('qa');
});

client.on('data', function(data) 
{
  console.log(data);
  if(data == 'ACK')
  {
    connected = true;
    write_question(client);
  }
  else if(data == 'DEC')
  {
    client.destroy();
  }
  else
  {
    let bbb = false;
    let buf;
    qa.forEach(element =>
    {
      if(data == element.a)
      {
        bbb = true;
      }
    })
    console.log(`my question: ${qa[counter4questing].q} \nreceived answer: ${data} \nis answer is right: ${bbb?"yes":"no"}\n`);
    counter4questing+=1;
    write_question(client);
  }
});

client.on('close', function() {
  console.log('Connection closed');
});

function write_question(client)
{
  if(counter4questing < qa.length)
  {
    client.write(qa[counter4questing].q);
    console.log("now i'm asking question: " + qa[counter4questing].q);
  }
  else
  {
    client.write('bye');
    client.destroy();
  }
}

function getRand(min, max)
{
  var rand = min + Math.random()*(max-min+1);
  return Math.floor(rand);
}