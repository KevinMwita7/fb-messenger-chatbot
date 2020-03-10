// interface class
module.exports = class ResponseGenerator {
    // all functions are static to enable usage without instantiating the class
    static generateText(text) {
      return {
        text: text
      };  
    }

    static generateQuickReply(text, attachment, quick_replies) {
      let quickReply = {};
      if(text) quickReply.text = text;
      if(attachment) quickReply.attachment = attachment;
    }

    static generateGenericTemplate({image_url, title, subtitle , buttons}) {
        return {
            attachment: {
              type: "template",
              payload: {
                template_type: "generic",
                elements: [
                  {
                    title: title,
                    subtitle: subtitle,
                    image_url: image_url,
                    buttons: buttons
                  }
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
    static generateWebUrlButton(type, title, url) {
      return {
        type, title, url
      };
    }
};