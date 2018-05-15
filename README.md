# Small node initiation project for CAI module
It's a small API that allows you to manages messages (in fact it works with any object with an id)
## Start :
```
npm start
```

## API endpoints :

GET /messages
returns all the messages

GET /messages/:id
returns the message with this id

DELETE /messages/:id
Deletes the message with this id

POST /messages
With the message you want to create in the BODY

PUT /messages/:id
With the data you want to add in the BODY
returns the new message

PATCH /messages/:id
With the data you want to change in the BODY
returns the new message

