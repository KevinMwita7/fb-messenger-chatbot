// interface class
module.exports = class ResponseGenerator {
    // all functions are static to enable usage without instantiating the class
    static generateText(text) {
      return {
        text: text
      };  
    }

    static generateQuickReply() {

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

    static generateButtonTemplate() {

    }

    static generateTextWithPersona() {

    }

    static generatePostBackButton() {

    }
    static generateWebUrlButton() {

    }
}