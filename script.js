const WEBHOOK_API = "https://YOUR-BACKEND.example.com";

const messages = document.getElementById("messages");
const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");
const status = document.getElementById("status");

function addMessage(text, type) {
  const empty = document.querySelector(".empty");

  if (empty) {
    empty.remove();
  }

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
    const response = await fetch(`${WEBHOOK_API}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }
  } catch (error) {
    console.error(error);
    addMessage("Could not send message.", "incoming");
  }
});

async function checkConnection() {
  try {
    const response = await fetch(`${WEBHOOK_API}/health`);

    if (response.ok) {
      status.textContent = "Connected";
      status.style.color = "#4ade80";
    }
  } catch {
    status.textContent = "Disconnected";
    status.style.color = "#f87171";
  }
}

checkConnection();