const ResponseGenerator = require("../utils/response-generator"),
botResponses = require("../fixtures/bot-responses.js"),
HandlerHelpers = require("../utils/handler-helpers"),
senderAction = require("./sender-actions"),
buttons =  require("../fixtures/buttons"),
sendMessages = require("../utils/send-messages"),
nlp = require("./nlp");

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
          if(received_message.quick_reply && received_message.nlp) {
              responses = this.handleQuickReply(received_message);
          } else {
              // handle the messages enterer in the input box
              if(nlp(received_message.nlp, "greetings")) {
                responses = HandlerHelpers.handleAboutUs();
              } else if(nlp(received_message.nlp, "about_us")) {
                responses = HandlerHelpers.handleAboutUs();
              } else if(nlp(received_message.nlp, "enroll")) {
                responses = HandlerHelpers.handleEnrollment();
              } else if(nlp(received_message.nlp, "application")) {
                responses = HandlerHelpers.handleApplication(); 
              } else if(nlp(received_message.nlp, "talk_to_agent")) {
                responses = HandlerHelpers.handleTalkToAgent();
              } else if(nlp(received_message.nlp, "certificates")) {
                responses = HandlerHelpers.handleCertificates();
              } else if(nlp(received_message.nlp, "cost_to_attend")) {
                  responses = HandlerHelpers.handleCostToAttend();
              } else if(nlp(received_message.nlp, "transfer_credit")) {
                  responses = HandlerHelpers.handleTransferCredit();    
              } else if(nlp(received_message.nlp, "location")) {
                  responses = HandlerHelpers.handleLocation();
              } else if(nlp(received_message.nlp, "programs")) {
                  responses = HandlerHelpers.handlePrograms();    
              } else if(nlp(received_message.nlp, "eligibility")) {
                 responses = HandlerHelpers.handleEligibility();
              } else if(nlp(received_message.nlp, "admissions")) {
                responses = HandlerHelpers.handleAdmissions();
              } else if(nlp(received_message.nlp, "requirements")) {
                responses = HandlerHelpers.handleRequirements();
              } else {
                  responses = HandlerHelpers.fallback();
             }
          }
        }  else if(received_message.attachments) {
            response = ResponseGenerator.generateText("Sorry, I cannot accept attachments at the moment");
            responses.push(response);
            /*for(let attachment of received_message.attachments) {
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
            }*/
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
                    response =  ResponseGenerator.generateQuickReply(botResponses.get_started.start, undefined, buttons.quick_reply_buttons.fallback);
                    responses.push(response);
                    console.log(response);
                    break;
            }
            sendMessages(user.id, responses);
        } catch(e) {
            console.log(e);
        }
    }

    handleQuickReply(received_message) {
        let quickReplyPayload = received_message.quick_reply.payload;
        // Create the payload for a basic text message
        switch(quickReplyPayload) {
            case "about_us":
                return HandlerHelpers.handleAboutUs();
            case "enrollment":
                return HandlerHelpers.handleEnrollment();
            case "application":
                return HandlerHelpers.handleApplication();
            case "talk_to_agent":
                return HandlerHelpers.handleTalkToAgent();
            case "certificates":
                return HandlerHelpers.handleCertificates();
            case "cost_to_attend":
                return HandlerHelpers.handleCostToAttend();
            case "transfer_credit":
                return HandlerHelpers.handleTransferCredit();
            case "location":
                return HandlerHelpers.handleLocation();
            case "programs":
                return HandlerHelpers.handlePrograms();
            case "eligibility":
                return HandlerHelpers.handleEligibility();
            case "admissions":
                return HandlerHelpers.handleAdmissions();
            case "requirements":
                return HandlerHelpers.handleRequirements();
            default:
                return HandlerHelpers.fallback();
        }
    }
};