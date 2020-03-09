const event = require("events").EventEmitter;
const express = require("express");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const compression = require("compression");
const cors = require("cors");
const Handler = require("./services/handler");
// const { PORT, VERIFICATION_TOKEN } = require("./config");
const app = express();

// set the port app will listen on
app.set("port", process.env.PORT);

// register middlewares
app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(errorHandler());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// handle GET requests for the webhook
app.get('/webhook', (req, res) => {      
    // get the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === process.env.VERIFICATION_TOKEN) {
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
});

// handle POST requests to the webhook
app.post('/webhook', (req, res) => {  
    let body = req.body;
    let handleWebhook = new Handler();
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        // get the sender's PSID
        let sender_psid = webhook_event.sender.id;
        // handle the webhook event appropriately depending on its type
        if(webhook_event.message) {
          handleWebhook.handleMessage(sender_psid, webhook_event.message);
        } else if(webhook_event.postback) {
          handleWebhook.handlePostback(sender_psid, webhook_event.postback);
        }
      });
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED\n');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
});

app.listen(app.get("port"), () => console.log("App listening on port " + app.get("port")));