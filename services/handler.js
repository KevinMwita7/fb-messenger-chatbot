const axios = require("axios").default;
const ResponseGenerator = require("./response-generator"); 
const responses = require("../fixtures/responses.js");
const FacebookApi = require("./api");
const senderAction = require("./sender-actions");

module.exports = class Handler {
    handleMessage(user, received_message) {
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
        FacebookApi.callSendAPI(user.id, response);  
    }

    handlePostback(user, received_postback) {
        let response;
        // Get the payload for the postback
        let payload = received_postback.payload;
        try {
            // Set the response based on the postback payload
            switch(payload) {
                case "get_started":
                    let text = responses.get_started.greetings.text.replace("{{user_first_name}}", user.first_name);
                    response = ResponseGenerator.generateText(text);
                    FacebookApi.callSendAPI(user.id, response);
                    senderAction(user.id, "typing_on");
                    setTimeout(() => {
                        // send a follow up message telling the user to select an option from list
                        response =  ResponseGenerator.generateText(responses.get_started.start.text);
                        FacebookApi.callSendAPI(user.id, response);
                        senderAction(user.id, "typing_on");
                    }, 2000);
                    break;
            }
        } catch(e) {
            console.log(e);
        }
    }
};