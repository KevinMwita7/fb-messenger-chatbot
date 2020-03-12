// interface class
module.exports = class ResponseGenerator {
    // all functions are static to enable usage without instantiating the class
    static generateText(text) {
      return {
        text: text
      };  
    }

    static generateQuickReply(text, attachment, quick_replies) {
      let quickReply = {
        text: text,
        quick_replies: []
      };
      
      if(attachment) quickReply.attachment = attachment;

      for(let quick_reply of quick_replies) {
        quickReply.quick_replies.push(
          // using json.stringify so that keys with undefined values are removed
          JSON.stringify({
            content_type: "text",
            title: quick_reply.title,
            payload: quick_reply.payload,
            image_url: quick_reply.image_url
          })
        );
      }
      return quickReply;
    }

    static generateGenericTemplate({image_url, title, subtitle , buttons}) {
        return {
            attachment: {
              type: "template",
              payload: {
                template_type: "generic",
                elements: [
                  // using json.stringify so that keys with undefined values are removed
                  JSON.stringify({
                    title: title,
                    subtitle: subtitle,
                    image_url: image_url,
                    buttons: buttons
                  })
                ]
              }
            }
          };
    }

    static generateImageTemplate() {
        
    }

    static generateTextWithPersona() {

    }

    static generatePostbackButton(type, title, payload) {
      return {
        type, title, payload
      };
    }
    static generateUrlButton(type, title, url) {
      return {
        type: "web_url",
        url,
        title
      };
    }
};