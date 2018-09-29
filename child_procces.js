const c_p = require('child_process');
for(let i = 0; i < process.argv[2]; i ++)
{
    c_p.exec("node client.js", 3000, (err, stdout, stderr)=>
    {
        console.log(stdout);
        console.log(stderr);
        if(err)console.error(err)
    })
}
