const axios = require("axios").default;
const ResponseGenerator = require("../utils/response-generator"); 
const botResponses = require("../fixtures/bot-responses.js");
const senderAction = require("./sender-actions");
const templateButtons =  require("../fixtures/buttons");
const sendMessages = require("../utils/send-messages");

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
              responses = this.handleQuickReply(received_message);
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
        // Sends the response messages
        sendMessages(user.id, responses);
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
                    let text = botResponses.get_started.greetings.replace("{{user_first_name}}", user.first_name);
                    response = ResponseGenerator.generateText(text);
                    responses.push(response);                 
                    response =  ResponseGenerator.generateQuickReply(botResponses.get_started.start, undefined, templateButtons.buttons.fallback);
                    responses.push(response);
                    break;
            }
            sendMessages(user.id, responses);
        } catch(e) {
            console.log(e);
        }
    }

    handleQuickReply(received_message) {
        let response, 
        responses = [],
        quickReplyPayload = received_message.quick_reply.payload;
        // Create the payload for a basic text message
        switch(quickReplyPayload) {
            case "about_us":
                response = ResponseGenerator.generateQuickReply(botResponses.faq.about_us, undefined, templateButtons.buttons.fallback);
                responses.push(response);
                break;
            case "enrollment":
                response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option, undefined, templateButtons.buttons.enrollment);
                responses.push(response);
                break;
            case "application":
                responses.push(ResponseGenerator.generateText(botResponses.application.lead));
                response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option, undefined, templateButtons.buttons.application);
                responses.push(response);
                break;
            case "talk_to_agent":
                responses.push(ResponseGenerator.generateText(botResponses.general.talk_to_agent));
                break;
            case "certificates":
                responses.push(ResponseGenerator.generateText(botResponses.faq.certificates_lead));
                response = ResponseGenerator.generateQuickReply(botResponses.faq.certificates_follow_up, undefined, templateButtons.buttons.fallback);
                responses.push(response);
                break;
            case "cost_to_attend":
                responses.push(ResponseGenerator.generateText(botResponses.cost_to_attend.plans));
                responses.push(ResponseGenerator.generateText(botResponses.cost_to_attend.monthly));
                responses.push(ResponseGenerator.generateText(botResponses.cost_to_attend.annualy));
                responses.push(ResponseGenerator.generateText(botResponses.cost_to_attend.premium));
                responses.push(ResponseGenerator.generateText(botResponses.cost_to_attend.financial_aid));
                response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option, undefined, templateButtons.buttons.enrollment);
                responses.push(response);
                break;
            case "transfer_credit":
                responses.push(ResponseGenerator.generateText(botResponses.transfer_credits.possibility));
                response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option, undefined, templateButtons.buttons.enrollment);
                responses.push(response);
                break;
            case "location":
                responses.push(ResponseGenerator.generateText(botResponses.location));
                response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option, undefined, templateButtons.buttons.enrollment);
                responses.push(response);
                break;
        }
        return responses;
    }
};