const FacebookApi = require("../services/api");
const senderActions = require("../services/sender-actions");

module.exports = function sendMessages(sender_psid, responses) {
    let delay = 0;
    if(Array.isArray(responses)) {
        responses.forEach((response, index) => {
            setTimeout(() => {
                FacebookApi.callSendAPI(sender_psid, response);
                // hide the typing indicator
                if(index === responses.length - 1) senderActions(sender_psid, "typing_off");
            }, delay * 2000);
            delay += 1;
        });
    } else {
        FacebookApi.callSendAPI(sender_psid, responses);
        senderActions(sender_psid, "typing_off");
    }
};