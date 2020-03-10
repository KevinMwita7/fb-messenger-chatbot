const axios = require("axios").default;
const { GRAPH_API_BASE_URL } = require("../utils/constants");

// interface class to house all functions requesting data from facebook
module.exports = class FacebookApi {
    static callSendAPI(sender_psid, response) {
        // Construct the message body
        let request_body = {
            "recipient": {
            "id": sender_psid
            },
            "message": response
        };
        axios({
            method: "post",
            url: "https://graph.facebook.com/v2.6/me/messages",
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

    static fetchUser(sender_psid) {
        let options = {
            method: "get",
            url: GRAPH_API_BASE_URL + sender_psid,
            params: {
                access_token: process.env.PAGE_ACCESS_TOKEN,
                fields: "first_name, last_name, profile_pic"
            }
        };
        axios(options)
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error);
            return new Error(error);
        });
    }
};