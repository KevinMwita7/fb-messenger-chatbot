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
                {title: "Artificial Intelligence", payload: "artificial_intelligence", image_url: "https://cdn.pixabay.com/photo/2017/04/13/20/26/artificial-intelligence-2228610_1280.jpg", web_url: "https://remote-university-website-2.now.sh/programs/artificial-intelligence"},
                {title: "Data Science", payload: "data_science", image_url: "https://cdn.pixabay.com/photo/2017/01/05/11/57/database-1954920_1280.jpg", web_url: "https://remote-university-website-2.now.sh/programs/data-science"},
                {title: "Cloud Computing", payload: "cloud_computing", image_url: "https://cdn.pixabay.com/photo/2017/01/22/22/11/cloud-computing-2001090_1280.jpg", web_url: "https://remote-university-website-2.now.sh/programs/cloud-computing"},
                {title: "Programming", payload: "programming", image_url: "https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png", web_url: "https://remote-university-website-2.now.sh/programs/programming"},
            ]
        }
    }
};