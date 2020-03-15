const ResponseGenerator = require("../utils/response-generator"),
botResponses = require("../fixtures/bot-responses.js"),
buttons =  require("../fixtures/buttons");
const { REMOTE_UNIVERSITY_APPLY_URL } = require("../utils/constants");
console.log(botResponses.general.choose_option());
module.exports = class HandlerHelpers {
    static handleGreetings() {
        let responses = [], response;
        responses.push(ResponseGenerator.generateText(botResponses.get_started.randomGreeting()));
        response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option(), undefined, buttons.quick_reply_buttons.application);
        responses.push(response);
        return responses;        
    }
    static handleAboutUs() {
        let response = ResponseGenerator.generateQuickReply(botResponses.faq.about_us, undefined, buttons.quick_reply_buttons.fallback);
        return [response];
    }
    static handleEnrollment() {
        let response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option(), undefined, buttons.quick_reply_buttons.enrollment);
        return [response];
    }
    static handleApplication() {
        let responses = [], response;
        response = ResponseGenerator.generateQuickReply(botResponses.application.lead, undefined, buttons.quick_reply_buttons.application);
        responses.push(response);
        return responses;
    }
    static handleEligibility() {
        let responses = [], response;
        responses.push(ResponseGenerator.generateText(botResponses.application.eligibility));
        response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option(), undefined, buttons.quick_reply_buttons.fallback);
        responses.push(response);
        return responses;
    }
    static handleTalkToAgent() {
        let response = ResponseGenerator.generateText(botResponses.general.talk_to_agent);
        return [response];
    }
    static handleCertificates() {
        let responses = [], response;
        responses.push(ResponseGenerator.generateText(botResponses.faq.certificates_lead));
        response = ResponseGenerator.generateQuickReply(botResponses.faq.certificates_follow_up, undefined, buttons.quick_reply_buttons.fallback);
        responses.push(response);
        return responses;
    }
    static handleCostToAttend() {
        let responses = [], response;
        responses.push(ResponseGenerator.generateText(botResponses.cost_to_attend.plans));
        responses.push(ResponseGenerator.generateText(botResponses.cost_to_attend.monthly));
        responses.push(ResponseGenerator.generateText(botResponses.cost_to_attend.annualy));
        responses.push(ResponseGenerator.generateText(botResponses.cost_to_attend.premium));
        responses.push(ResponseGenerator.generateText(botResponses.cost_to_attend.financial_aid));
        response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option(), undefined, buttons.quick_reply_buttons.enrollment);
        responses.push(response);
        return responses;
    }
    static handleTransferCredit() {
        let responses = [], response;
        responses.push(ResponseGenerator.generateText(botResponses.transfer_credits.possibility));
        response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option(), undefined, buttons.quick_reply_buttons.fallback);
        responses.push(response);
        return responses;
    }
    static handleLocation() {
        let responses = [], response;
        responses.push(ResponseGenerator.generateText(botResponses.location));
        response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option(), undefined, buttons.quick_reply_buttons.fallback);
        responses.push(response);
        return responses;
    }
    static handlePrograms() {
        // a variable to hold the carousel's generic templates 
        let payloadElements = [], responses = [], response;
        // loop through each program generating a template for it for the carousel
        buttons.template_buttons.programs.apply_now.forEach(value => {
            let carouselItem = {
                image_url: value.image_url,
                title: value.title,
                subtitle: undefined,
                buttons: [
                    ResponseGenerator.generateUrlButton({title: "Apply now", url: REMOTE_UNIVERSITY_APPLY_URL, webview_height_ratio :"tall", messenger_extensions: true}),
                    ResponseGenerator.generateUrlButton({title: "Learn more", url: value.web_url})
                ]
            };
            payloadElements.push(carouselItem);
        });
        response = ResponseGenerator.generateCarouselTemplate(payloadElements);
        responses.push(response);
        response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option(), undefined, buttons.quick_reply_buttons.fallback);
        responses.push(response);
        return responses;
    }
    static handleAdmissions() {
        let responses = [], response;
        responses.push(ResponseGenerator.generateText(botResponses.application.admissions));
        response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option(), undefined, buttons.quick_reply_buttons.fallback);
        responses.push(response);
        return responses;
    }
    static handleRequirements() {
        let responses = [], response;
        responses.push(ResponseGenerator.generateText(botResponses.application.requirements));
        response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option(), undefined, buttons.quick_reply_buttons.fallback);
        responses.push(response);
        return responses;
    }
    static fallback() {
        let response = ResponseGenerator.generateQuickReply(botResponses.general.choose_option(), undefined, buttons.quick_reply_buttons.fallback);
        return [response];
    }
};