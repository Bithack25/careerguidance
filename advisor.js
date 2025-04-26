function sendMessage(text = null) {
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");
  const message = text || input.value.trim();
  if (!message) return;

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = message;
  messages.appendChild(userMsg);
  input.value = "";

  const botMsg = document.createElement("div");
  botMsg.className = "message bot";
  botMsg.innerText = "Thinking...";
  messages.appendChild(botMsg);

  messages.scrollTop = messages.scrollHeight;

  fetch("http://127.0.0.1:5000/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
  .then(res => res.json())
  .then(data => {
    botMsg.innerText = data.reply || "No response received.";
  })
  .catch(() => {
    botMsg.innerText = "Error connecting to server.";
  });
}

document.getElementById("input").addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});