const axios = require("axios").default;
const ResponseGenerator = require("./response-generator"); 
const responses = require("../fixtures/responses.js");
const FacebookApi = require("./api");
const senderAction = require("./sender-actions");
const templateButtons =  require("../fixtures/buttons");

module.exports = class Handler {
    handleMessage(user, received_message) {
        let response;
        if (received_message.text) {
          // handle quick replies separately
          if(received_message.quick_reply) {
              this.handleQuickReply(user.id, received_message);
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
                    // mark the last message as read to show that the bot has received the message
                    senderAction(user.id, "mark_seen");
                    // show a typing indeicator to show the bot is generating a reply
                    senderAction(user.id, "typing_on");
                    // send a response
                    FacebookApi.callSendAPI(user.id, response);
                    setTimeout(() => {
                        // send a follow up message telling the user to select an option from list
                        senderAction(user.id, "typing_on");
                        response =  ResponseGenerator.generateQuickReply(responses.get_started.start.text, undefined, [
                            {title: "Application", payload: "application"},
                            {title: "Programs", payload: "programs"},
                            {title: "Costs", payload:"cost"},
                            {title: "Frequently Asked Questions", payload:"faq"}
                        ]);
                        FacebookApi.callSendAPI(user.id, response);
                    }, 2000);
                    break;
            }
        } catch(e) {
            console.log(e);
        }
    }

    handleQuickReply(sender_psid, received_message) {
        let response;
        // Create the payload for a basic text message
        switch(received_message.quick_reply.payload) {
            case "faq":
                // mark the last message as read
                senderAction(user.id, "mark_seen");
                // show typing indicator
                senderAction(user.id, "typing_on");
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
        FacebookApi.callSendAPI(sender_psid, response);
    }
};