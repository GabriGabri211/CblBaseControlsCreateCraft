const WEBHOOK_URL = "https://discord.com/api/webhooks/1557427533241131088/_jhjZbHdHVyZ4C3PrUrAIEjus3qJWCkLNWJWPdRenOmK7PsetsVUxUrlCYef5jsotH3V";

const messages = document.getElementById("messages");
const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");
const status = document.getElementById("status");

status.textContent = "Connected";
status.style.color = "#4ade80";

function addMessage(text, type) {
  const empty = document.querySelector(".empty");
  if (empty) empty.remove();

  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "outgoing");
  input.value = "";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    addMessage("Message sent ✓", "incoming");

  } catch (error) {
    console.error(error);
    addMessage("Failed to send message.", "incoming");
  }
});