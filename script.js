// Make sure script is loaded
console.log("script.js loaded");

// Select form and response message
const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("response");

// Safety check (prevents silent errors)
if (!form || !responseMsg) {
  console.error("Form or response element not found in HTML");
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("Form submitted");

  // Get input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validation
  if (!name || !email || !message) {
    responseMsg.textContent = "Please fill in all fields!";
    responseMsg.style.color = "#ff4d4d";
    return;
  }

  responseMsg.textContent = "Sending message...";
  responseMsg.style.color = "#333";

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    // If backend is unreachable
    if (!res.ok) {
      throw new Error("Server responded with error");
    }

    const data = await res.json();

    responseMsg.textContent = data.message || "Message sent successfully!";
    responseMsg.style.color = "#4CAF50";
    form.reset();

  } catch (error) {
    console.error("Fetch error:", error);
    responseMsg.textContent =
      "Unable to send message. Please check backend or try again later.";
    responseMsg.style.color = "#ff4d4d";
  }
});
