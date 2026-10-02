// Dastarkhwan Assistant chat widget (mock replies, no API yet)
const MOCK_REPLY = "Hi! I’m Dastarkhwan Assistant. My AI brain isn’t connected yet.";
const REPLY_DELAY_MS = 600;

const fab = document.getElementById('chat-fab');
const panel = document.getElementById('chat-panel');
const closeBtn = document.getElementById('chat-close');
const messages = document.getElementById('chat-messages');
const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');

function setOpen(open) {
  panel.classList.toggle('open', open);
  fab.classList.toggle('open', open);
  document.body.classList.toggle('chat-open', open);
  fab.setAttribute('aria-expanded', String(open));
  if (open) {
    setTimeout(() => input.focus(), 200);
  } else {
    fab.focus();
  }
}

function addMessage(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = `msg msg-${sender}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
  return bubble;
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'msg msg-bot msg-typing';
  typing.setAttribute('aria-label', 'Assistant is typing');
  typing.innerHTML = '<span></span><span></span><span></span>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
  return typing;
}

fab.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
closeBtn.addEventListener('click', () => setOpen(false));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && panel.classList.contains('open')) setOpen(false);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  const typing = showTyping();
  setTimeout(() => {
    typing.remove();
    addMessage(MOCK_REPLY, 'bot');
  }, REPLY_DELAY_MS);
});
