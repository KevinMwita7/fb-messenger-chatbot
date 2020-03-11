const FacebookApi = require("../services/api");
const senderActions = require("../services/sender-actions");

module.exports = function sendMessages(sender_psid, responses) {
    let delay = 0;
    if(Array.isArray(responses)) {
        setTimeout(() => {
            responses.forEach((response, index) => {
                FacebookApi.callSendAPI(sender_psid, response);
                // hide the typing indicator
                if(index === responses.length - 1) senderActions(sender_psid, "typing_off");
                delay += 1;
            });
        }, delay * 2000)
    }
};