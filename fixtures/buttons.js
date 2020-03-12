module.exports = {
    buttons: {
        fallback: [
            {title: "About us", payload: "about_us"},
            {title: "Enrollment", payload: "enrollment"},
            {title: "Certificates", payload: "certificates"},
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
    }
};