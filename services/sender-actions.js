const axios = require("axios").default;
const { GRAPH_API_BASE_URL } = require('../utils/constants');

module.exports  = function senderAction(sender_psid, type) {
    let options = {
        method: "post",
        baseURL: GRAPH_API_BASE_URL,
        params: {
            access_token: process.env.PAGE_ACCESS_TOKEN
        },
        data: {
            recipient: {
                id: sender_psid
            },
            sender_action: type
        }
    };
    axios(options)
    .then(response => {
        console.log(response);
    }).catch(error => {
        console.log("Error while sending sender_action", error);
    });
};