const axios = require("axios").default;
const ResponseGenerator = require("./response-generator"); 
const responses = require("../fixtures/responses.js");

module.exports = class Handler {
    callSendAPI(sender_psid, response) {
        // Construct the message body
        let request_body = {
            "recipient": {
            "id": sender_psid
            },
            "message": response
        };
        axios({
            method: "post",
            url: 'https://graph.facebook.com/v2.6/me/messages',
            params: {
                access_token: process.env.PAGE_ACCESS_TOKEN
            },
            data: request_body
        }).then(res => {
            console.log("Message successfully sent");
        }).catch(error => {
            console.log("Message not sent", error);
        });
    }

    handleMessage(sender_psid, received_message) {
        let response;
        if (received_message.text) {    
          // Create the payload for a basic text message
          response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
          };
        }  else if(received_message.attachments) {
            for(let attachment of received_message.attachments) {
                // Gets the URL of the message attachment
                let attachment_url = attachment.payload.url;
                let payload = {
                    image_url: attachment_url,
                    title: "Is this the right picture?",
                    subtitle: "Tap a button to answer.",
                    buttons: [
                        {
                            "type": "postback",
                            "title": "Yes!",
                            "payload": "yes",
                        },
                        {
                            "type": "postback",
                            "title": "No!",
                            "payload": "no",
                        }]
                };
                response = ResponseGenerator.generateGenericTemplate(payload);
            }
        }
        // Sends the response message
        this.callSendAPI(sender_psid, response);  
    }

    handlePostback(sender_psid, received_postback) {
        let response;
        // Get the payload for the postback
        let payload = received_postback.payload;

        // Set the response based on the postback payload
        switch(payload) {
            /*case "get_started":
                response = ResponseGenerator.generateText(responses.profile.text);
                break;*/
            case "yes":
                response = { "text": "Thanks!" };
                break;
            case "no":
                response = { "text": "Oops, try sending another image." };
                break;
        }
        // Send the message to acknowledge the postback
        this.callSendAPI(sender_psid, response);
    }
};