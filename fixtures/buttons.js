const {
    REMOTE_UNIVERSITY_AI_URL,
    REMOTE_UNIVERSITY_DATA_SCIENCE_URL,
    REMOTE_UNIVERSITY_CLOUD_COMPUTING_URL,
    REMOTE_UNIVERSITY_PROGRAMMING_URL,
    REMOTE_UNIVERSITY_AI_IMAGE_URL,
    REMOTE_UNIVERSITY_DATA_SCIENCE_IMAGE_URL,
    REMOTE_UNIVERSITY_CLOUD_COMPUTING_IMAGE_URL,
    REMOTE_UNIVERSITY_PROGRAMMING_IMAGE_URL
} = require("../utils/constants")

module.exports = {
    quick_reply_buttons: {
        fallback: [
            {title: "About us", payload: "about_us"},
            {title: "Enrollment", payload: "enrollment"},
            {title: "Certificates", payload: "certificates"},
            {title: "Programs", payload: "programs"},
            {title: "Talk to an agent", payload: "talk_to_agent"}
        ],
        enrollment: [
            {title: "Application", payload: "application"},
            {title: "Financing", payload: "cost_to_attend"},
            {title: "Transferring credit", payload: "transfer_credit"},
            {title: "Location", payload: "location"},
            {title: "Talk to an agent", payload: "talk_to_agent"}
        ],
        application: [
            {title: "Eligibility", payload: "eligibility"},
            {title: "Requirements", payload: "requirements"},
            {title: "Admissions", payload: "admissions"},
            {title: "Talk to an agent", payload: "talk_to_agent"}
        ]
    },
    template_buttons: {
        programs: {
            apply_now: [
                {title: "Artificial Intelligence", payload: "artificial_intelligence", image_url: REMOTE_UNIVERSITY_AI_IMAGE_URL, web_url: REMOTE_UNIVERSITY_AI_URL},
                {title: "Data Science", payload: "data_science", image_url: REMOTE_UNIVERSITY_DATA_SCIENCE_IMAGE_URL, web_url: REMOTE_UNIVERSITY_DATA_SCIENCE_URL},
                {title: "Cloud Computing", payload: "cloud_computing", image_url: REMOTE_UNIVERSITY_CLOUD_COMPUTING_IMAGE_URL, web_url: REMOTE_UNIVERSITY_CLOUD_COMPUTING_URL},
                {title: "Programming", payload: "programming", image_url: REMOTE_UNIVERSITY_PROGRAMMING_IMAGE_URL, web_url: REMOTE_UNIVERSITY_PROGRAMMING_URL},
            ]
        }
    }
};