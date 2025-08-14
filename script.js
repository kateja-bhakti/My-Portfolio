// Typing animation effect
document.addEventListener("DOMContentLoaded", () => {
  const text = "Aspiring Web Developer | BCA Student | Future Full Stack Developer";
  const typingElement = document.querySelector(".typing-text");
  let index = 0;

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50);
    }
  }

  if (typingElement) {
    typingElement.textContent = "";
    type();
  }
});

// Simple form validation
function validateForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (!name.value || !email.value || !message.value) {
    alert("Please fill in all fields.");
    return false;
  }

  if (!email.value.includes("@")) {
    alert("Please enter a valid email.");
    return false;
  }

  alert("Message sent successfully (simulation).");
  return true;
}
