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
                {title: "Artificial Intelligence", payload: "artificial_intelligence"},
                {title: "Data Science", payload: "data_science"},
                {title: "Cloud Computing", payload: "cloud_computing"},
                {title: "Web Development", payload: "web_development"},
                {title: "Programming", payload: "programming"},
            ]
        }
    }
};