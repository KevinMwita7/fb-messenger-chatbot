const { getRandomResponse } = require("../utils/functions");

module.exports = {
    get_started: {
        greetings: "Hello {{user_first_name}}. I am Julia, your Remote University Digital Assistant.", 
        start: "How may I help you?",
        randomGreeting: () => {
            let greetings = ["Hello there!", "Hi there!", "Hi, pleasure to meet you!", "Hello, nice to meet you"];
            return getRandomResponse(greetings);
        }
    },
    general: {
        choose_option: () => {
            let prompts = [
                "Please write your question or choose one of the options below.",
                "How may I help you?",
                "How may I be of assistance?",
                "Please select an option.",
                "Feel free to ask me any question."
            ];
            return getRandomResponse(prompts);
        },
        talk_to_agent: "One of our representatives will get back to you with recommendations about studying at our university."
    },
    programs : {
        all: "At the moment we offer the courses below with much more coming soon. Please choose one to learn more.",
        artificial_intelligence: "In this course you will learn what Artificial Intelligence (AI) is, explore use cases and applications of AI, understand AI concepts and terms like machine learning, deep learning and neural networks. You will be exposed to various issues and concerns surrounding AI such as ethics and bias, & jobs, and get advice from experts about learning and starting a career in AI.",
        data_science: "This program consists of 9 courses providing you with latest job-ready skills and techniques covering a wide array of data science topics including: open source tools and libraries, methodologies, Python, databases, SQL, data visualization, data analysis, and machine learning. You will practice hands-on in the IBM Cloud using real data science tools and real-world data sets.",
        cloud_computing: "The Course will start with basic introduction to cloud concepts like SAAS, PAAS and IAAS. You will also learn how Linux systems is changing the Infrastructure landscape worldwide. You will then learn to use popular cloud technologies like Google Compute Engine , Amazon AWS and Redhat open shift.",
        programming: "Open the door to sought-after technology careers with a world-class online degree in Computer Science. You’ll master in-demand computing skills, solve complex problems, and hone your innovation and creativity. The hands-on project-based approach will help develop the technical and transferable skills needed for a fulfilling career in your field.",
        web_development: "Learn how to use HTML and CSS to make webpages. HTML is the markup language that you surround content with, to tell browsers about headings, lists, tables, etc. CSS is the stylesheet language that you style the page with, to tell browsers to change the color, font, layout, and more!"
    },
    faq: {
        about_us: "Remote University is an online platform that aims to enable individuals learn the skills they need, to land the jobs they want so as to build the lives they deserve. Founded in 2020, our mission is to power careers through tech education. We partner with leading technology companies to learn how technology is transforming industries, and teach the critical tech skills that companies are looking for in their workforce. To learn more, visit us at https://remote-university-website-2.now.sh/about",
        certificates_lead: "Remote University Certificates of Completion are certifications you earn for the courses you have completely watched on our platform.",
        certificates_follow_up: "Upon completion of a course, a certificate is automatically generated that can be viewed online and shared."
    },
    application: {
        lead: "I understand how hard the application process can be. I will try and make it easier.",
        eligibility: "Remote University has no eligibility criteria. Anyone willing can join our platform and begin learning.",
        requirements: "The only requirements needed to start learning on our platform are:\n- An internet enabled device\n- An internet connection\n- A curious mind",
        admissions: "There is no admissions process for Remote University, but students can take skill assessments to identify where to start in a path based on their background. Students have access to video lessons and complete learning checks, skill assessments and certification practice exams throughout Paths."
    },
    cost_to_attend: {
        plans: "There are three plans to pick from: monthly, annual and premium.",
        monthly: "For the monthly plan, you will pay a monthly fee of $29 and gain access to all courses and assessments.",
        annualy: "For the annual plan, you will pay a yealy fee of $299 and gain access to all courses and assessments.",
        premium: "For the premium plan, you will pay a monthly fee of $499 and in addition to all courses and assessments, gain access to certification practice exams, interactive courses and projects",
        financial_aid: "I understand it may be a challenge for you to have the funds listed above. Unfortunately, we do not offer any form of financial aid. However, you can get a trial period of 30 days before paying for the full course. To learn more visit https://remote-university-website-2.now.sh/"
    },
    transfer_credits: {
        possibility: "Unfortunately, Remote University does not offer credits for any course work covered."
    },
    location: "Remote university has no physical campuses. All courses are accessed through the internet from wherever you feel comfortable."
};