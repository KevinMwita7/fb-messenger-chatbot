const axios = require("axios").default;
const { GRAPH_API_MESSAGES_URL } = require('../utils/constants');
const { PAGE_ACCESS_TOKEN } = require("../config");

// sender action relays the bot is taking to the user e.g typing indicator while generating response
module.exports  = function senderAction(sender_psid, type) {
    let options = {
        method: "post",
        url: GRAPH_API_MESSAGES_URL,
        params: {
            access_token: PAGE_ACCESS_TOKEN
        },
        data: {
            "recipient": {
                "id": sender_psid
            },
            "sender_action": type
        }
    };
    axios(options)
    .then(response => {
        console.log(response.data);
    }).catch(error => {
        console.log("Error while sending sender_action", error);
    });
};