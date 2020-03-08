const axios = require('axios').default;

module.exports = class Handler {
    constructor(psid) {
        this.sender_psid = psid;
    }
    callSendAPI(response) {
        // Construct the message body
        let request_body = {
            "recipient": {
            "id": this.sender_psid
            },
            "message": response
        };
        axios({
            method: "post",
            url: 'https://graph.facebook.com/v2.6/me/messages',
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
    handleMessage(received_message) {
        let response;
        if (received_message.text) {    
          // Create the payload for a basic text message
          response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
          };
        }  
        // Sends the response message
        this.callSendAPI(response);  
    }
}