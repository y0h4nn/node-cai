const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.send('hello world');
})
var messages = [];

app.get('/messages', (req, res) => {
    res.status(200);
    res.send(JSON.stringify(messages));
})

app.post('/messages', (req, res) => {
    console.log(req.body);
    let msg = req.body;
    if(msg && msg.id){
        let existing = findById(msg.id);
        console.log("existing",existing)
        if(!existing){
            messages.push(msg)
            console.log(messages)
            res.status(201);
            res.send();
        }
        else{
            res.status(400);
            res.send('message with id ' + msg.id + " already exists");
        }
    }
    else{
        res.status(400);
        res.send("invalid message");
    }
})

app.get('/messages/:id', (req, res) => {
    let id = req.params.id;
    console.log(id)
    let existing = findById(id)

    if(existing){
        res.status(200);
        res.send(JSON.stringify(existing));
    }
    else{
        res.status(400);
        res.send("no message with id : " + id);
    }

})

app.delete('/messages/:id', (req, res) => {
    let id = req.params.id;
    let indexToRemove = messages.map((msg) => {
        return msg.id
    }).indexOf(id);

    if(indexToRemove){
        messages.splice(indexToRemove, 1);
        res.status(200);
        res.send();
    }
    else {
        res.status(400);
        res.send();
    }
})

app.put('/messages/:id', (req, res) => {
    let id = req.params.id;
    let msg = req.body;
    let existing = findById(id);

    Object.keys(msg).forEach((key)=>{
        if(!existing[key]){
            existing[key] = msg[key]
        }
    })
    res.status(200);
    res.send(existing);
})

app.patch('/messages/:id', (req, res) => {
    let id = req.params.id;
    let msg = req.body;
    let existing = findById(id);

    Object.keys(msg).forEach((key)=>{
        if(existing[key]){
            existing[key] = msg[key]
        }
    })
    res.status(200);
    res.send(existing);
})


app.listen(8080, ()=>{
    console.log("Server listening on port 8080")
})

function findById(id){
    let existing = messages.filter((msg) => {
        return msg.id == id;
    })

    if(existing && existing.length && existing[0].id){
        return existing[0];
    }
    return null;
}