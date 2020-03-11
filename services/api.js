const axios = require("axios").default;
const { GRAPH_API_BASE_URL, GRAPH_API_MESSAGES_URL } = require("../utils/constants");
const senderAction = require("./sender-actions");

// interface class to house all functions requesting data from facebook
module.exports = class FacebookApi {
    static callSendAPI(sender_psid, response) {
        // given an array of messages build a request for each of them and send them two seconds apart
        let request_body = {"recipient": {"id": sender_psid}, "message": response};
        axios({
            method: "post",
            url: GRAPH_API_MESSAGES_URL,
            params: {
                access_token: process.env.PAGE_ACCESS_TOKEN
            },
            data: request_body
        }).then(res => {
            console.log("Message successfully sent");
        }).catch(error => {
           // console.log("Message not sent", error);
        });
    }

    static fetchUser(sender_psid) {
        return new Promise((resolve, reject) => {
            let options = {
                method: "get",
                url: GRAPH_API_BASE_URL + sender_psid,
                params: {
                    access_token: process.env.PAGE_ACCESS_TOKEN,
                    fields: "id, first_name, last_name, profile_pic"
                }
            };
            axios(options)
            .then(response => {
                if(response.status === 200 && response.data) {
                    resolve(response.data);
                }
            })
            .catch(error => {
                 reject(new Error(error));
            });
        });
    }
};