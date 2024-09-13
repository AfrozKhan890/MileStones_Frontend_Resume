// Get references to the form1 and display areas
const form1 = document.getElementById("resume-form") as HTMLFormElement;
const resume_display_element = document.getElementById(
  "resume-display"
) as HTMLDivElement;
const shareable_link_container = document.getElementById(
  "shareable-link-container"
) as HTMLDivElement;
const shareable_link_element = document.getElementById(
  "shareable-link"
) as HTMLAnchorElement;
const download_Pdf_button = document.getElementById(
  "download-pdf"
) as HTMLButtonElement;

// Handle form1 submission
form1.addEventListener("submit", (event: Event) => {
  event.preventDefault(); // prevent page reload

  // Collect input values
  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const education = (
    document.getElementById("education") as HTMLTextAreaElement
  ).value;
  const experience = (
    document.getElementById("experience") as HTMLTextAreaElement
  ).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement)
    .value;

  // Save form1 data in localStorage with the username as the key
  const resumeData = {
    name,
    email,
    phone,
    education,
    experience,
    skills,
  };
  localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

  // Generate the resume content dynamically
  const resumeHTML = `
    <h2><u>Editable Resume</u></h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
    <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
    <h3>Education</h3>
    <p contenteditable="true">${education}</p>
    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>
    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>
  `;

  // Display the generated resume
  resume_display_element.innerHTML = resumeHTML;

  // Generate a shareable URL with the username only
  const shareableURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(
    username
  )}`;

  // Display the shareable link
  shareable_link_container.style.display = "block";
  shareable_link_element.href = shareableURL;
  shareable_link_element.textContent = shareableURL;
});

// Prefill the form1 based on the username in the URL
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  if (username) {
    // Autofill form1 if data is found in localStorage
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);

      // Update the form1 fields
      (document.getElementById("username") as HTMLInputElement).value =
        username;
      (document.getElementById("name") as HTMLInputElement).value =
        resumeData.name;
      (document.getElementById("email") as HTMLInputElement).value =
        resumeData.email;
      (document.getElementById("phone") as HTMLInputElement).value =
        resumeData.phone;
      (document.getElementById("education") as HTMLTextAreaElement).value =
        resumeData.education;
      (document.getElementById("experience") as HTMLTextAreaElement).value =
        resumeData.experience;
      (document.getElementById("skills") as HTMLTextAreaElement).value =
        resumeData.skills;

      // Also dynamically update the resume display section
      const resumeHTML = `
        <h2><u>Editable Resume</u></h2>
        <h3>Personal Information</h3>
        <p><b>Name:</b> <span contenteditable="true">${resumeData.name}</span></p>
        <p><b>Email:</b> <span contenteditable="true">${resumeData.email}</span></p>
        <p><b>Phone:</b> <span contenteditable="true">${resumeData.phone}</span></p>
        <h3>Education</h3>
        <p contenteditable="true">${resumeData.education}</p>
        <h3>Experience</h3>
        <p contenteditable="true">${resumeData.experience}</p>
        <h3>Skills</h3>
        <p contenteditable="true">${resumeData.skills}</p>
      `;

      resume_display_element.innerHTML = resumeHTML;
    } else {
      // Handle case where there is no data for the given username
      alert("No data found for the given username.");
    }
  }
});

// Handle PDF download
download_Pdf_button.addEventListener("click", () => {
  window.print(); // This will open the print dialog and allow the user to save as PDF
});
