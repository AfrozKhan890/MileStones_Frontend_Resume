// Get references to the form1 and display areas
var form1 = document.getElementById("resume-form");
var resume_display_element = document.getElementById("resume-display");
var shareable_link_container = document.getElementById("shareable-link-container");
var shareable_link_element = document.getElementById("shareable-link");
var download_Pdf_button = document.getElementById("download-pdf");
// Handle form1 submission
form1.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent page reload
    // Collect input values
    var username = document.getElementById("username")
        .value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills")
        .value;
    // Save form1 data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Generate the resume content dynamically
    var resumeHTML = "\n    <h2><u>Editable Resume</u></h2>\n    <h3>Personal Information</h3>\n    <p><b>Name:</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n    <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n    <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n    <h3>Education</h3>\n    <p contenteditable=\"true\">").concat(education, "</p>\n    <h3>Experience</h3>\n    <p contenteditable=\"true\">").concat(experience, "</p>\n    <h3>Skills</h3>\n    <p contenteditable=\"true\">").concat(skills, "</p>\n  ");
    // Display the generated resume
    resume_display_element.innerHTML = resumeHTML;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareable_link_container.style.display = "block";
    shareable_link_element.href = shareableURL;
    shareable_link_element.textContent = shareableURL;
});
// Prefill the form1 based on the username in the URL
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        // Autofill form1 if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            // Update the form1 fields
            document.getElementById("username").value =
                username;
            document.getElementById("name").value =
                resumeData.name;
            document.getElementById("email").value =
                resumeData.email;
            document.getElementById("phone").value =
                resumeData.phone;
            document.getElementById("education").value =
                resumeData.education;
            document.getElementById("experience").value =
                resumeData.experience;
            document.getElementById("skills").value =
                resumeData.skills;
            // Also dynamically update the resume display section
            var resumeHTML = "\n        <h2><u>Editable Resume</u></h2>\n        <h3>Personal Information</h3>\n        <p><b>Name:</b> <span contenteditable=\"true\">".concat(resumeData.name, "</span></p>\n        <p><b>Email:</b> <span contenteditable=\"true\">").concat(resumeData.email, "</span></p>\n        <p><b>Phone:</b> <span contenteditable=\"true\">").concat(resumeData.phone, "</span></p>\n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(resumeData.education, "</p>\n        <h3>Experience</h3>\n        <p contenteditable=\"true\">").concat(resumeData.experience, "</p>\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(resumeData.skills, "</p>\n      ");
            resume_display_element.innerHTML = resumeHTML;
        }
        else {
            // Handle case where there is no data for the given username
            alert("No data found for the given username.");
        }
    }
});
// Handle PDF download
download_Pdf_button.addEventListener("click", function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
