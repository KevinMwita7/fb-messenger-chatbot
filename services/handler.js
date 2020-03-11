const axios = require("axios").default;
const ResponseGenerator = require("./response-generator"); 
const responses = require("../fixtures/responses.js");
const FacebookApi = require("./api");
const senderAction = require("./sender-actions");
const templateButtons =  require("../fixtures/buttons");

module.exports = class Handler {
    handleMessage(user, received_message) {
        // an array to hold all the response to send via the sendApi
        let responses = [];
        let response;

        // mark the last message as read
        senderAction(user.id, "mark_seen");
        // show typing indicator
        senderAction(user.id, "typing_on");

        if (received_message.text) {
          // handle quick replies separately
          if(received_message.quick_reply) {
              response = this.handleQuickReply(received_message);
              responses.push(response);
          } else {
              // handle the messages entered into the input box
          }
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
                responses.push(response);
            }
        }
        // Sends the response message
        FacebookApi.callSendAPI(user.id, responses);
    }

    handlePostback(user, received_postback) {
        // mark the last message as read
        senderAction(user.id, "mark_seen");
        // show a typing indicator to show the bot is generating a reply
        senderAction(user.id, "typing_on");
        let response;
        // Get the payload for the postback
        let payload = received_postback.payload;
        let responses = [];

        try {
            // Set the response based on the postback payload
            switch(payload) {
                case "get_started":
                    let text = responses.get_started.greetings.text.replace("{{user_first_name}}", user.first_name);
                    response = ResponseGenerator.generateText(text);
                    responses.push(response);                    
                    response =  ResponseGenerator.generateQuickReply(responses.get_started.start.text, undefined, [
                        {title: "Application", payload: "application"},
                        {title: "Programs", payload: "programs"},
                        {title: "Costs", payload:"cost"},
                        {title: "Frequently Asked Questions", payload:"faq"}
                    ]);
                    responses.push(response);
                    break;
            }
            FacebookApi.callSendAPI(user.id, responses, 0);
        } catch(e) {
            console.log(e);
        }
    }

    handleQuickReply(received_message) {
        let response;
        // Create the payload for a basic text message
        switch(received_message.quick_reply.payload) {
            case "faq":
                // generate the frequently asked questions template
                let payload = {
                    title: responses.faq.title.text,
                    subtitle: responses.faq.subtitle.text,
                    buttons: templateButtons.buttons.faq
                };
                response = ResponseGenerator.generateGenericTemplate(payload);
                console.log(response);
                break;
        }
        return response;
    }
};