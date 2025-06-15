document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const isInPages = currentPath.includes("/pages/");
  const prefix = isInPages ? "../" : "";

  let header = document.querySelector('.chatbot');
  if (!header) return;

  header.innerHTML = `
     <div class="section-phone">
    <div class="contact-wrapper">
      <div id="chatbotButton" class="contact-button">
        <div class="pulse-ring"></div>
        <i class="fas fa-comments"></i>
      </div>

      <div class="radial-menu" id="contactIcons">
        <a href="tel:0123456789" target="_blank" class="contact-icon phone">
          <img src="${prefix}assets/images/icons8-call-48.png" style="width: 28px; height: 28px;" alt="">
        </a>
        <a href="https://zalo.me/0787540572" target="_blank" class="contact-icon zalo">
          <img src="${prefix}assets/images/icons8-zalo-48.png" style="width: 28px; height: 28px;" alt="">
        </a>
        <a class="contact-icon insta">
          <img src="${prefix}assets/images/chat.png" style="width: 28px; height: 28px;" alt="">
        </a>
        <a href="https://www.facebook.com/?rdid=KVdEmFszcOsrfVTC" target="_blank" class="contact-icon fb">
          <img src="${prefix}assets/images/icons8-fb-48.png" style="width: 28px; height: 28px;" alt="">
        </a>
      </div>
    </div>
  </div>

  <!-- Chatbot Container -->
  <div id="chatbot-container" class="chatbot-container">
    <div class="chatbot-header">
      <h3>Chatbot hỗ trợ</h3>
      <button id="close-chatbot" class="close-btn"><i class="fas fa-times"></i></button>
    </div>
    
    <div id="chatbot-messages" class="chatbot-messages">
      <div class="bot-message">Xin chào! Tôi có thể giúp gì cho bạn?</div>
    </div>
    
    <div class="chatbot-input">
      <input type="text" id="chatbot-input" placeholder="Nhập tin nhắn...">
      <button id="send-message"><i class="fas fa-paper-plane"></i></button>
    </div>
  </div>
  `;

  // DOM đã có, gắn tất cả event listener:
  const radialMenu = document.getElementById('contactIcons');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotButton = document.getElementById('chatbotButton');
  const instaChatIcon = document.querySelector('.contact-icon.insta');

  function toggleMenu(e) {
    e.stopPropagation();
    if (chatbotContainer.classList.contains('active')) {
      chatbotContainer.classList.remove('active');
      radialMenu.classList.remove('active');
    } else {
      radialMenu.classList.toggle('active');
    }
  }

  chatbotButton.addEventListener('click', toggleMenu);

  instaChatIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    chatbotContainer.classList.toggle('active');
    radialMenu.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (
      !chatbotContainer.contains(e.target) &&
      !radialMenu.contains(e.target) &&
      !chatbotButton.contains(e.target)
    ) {
      chatbotContainer.classList.remove('active');
      radialMenu.classList.remove('active');
    }
  });

  document.getElementById('close-chatbot').addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
  });

  document.getElementById('send-message').addEventListener('click', sendMessage);
  document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  function openChatbot() {
    window.parent.postMessage({ action: 'chatbotVisible', visible: true }, '*');
  }

  function closeChatbot() {
    window.parent.postMessage({ action: 'chatbotVisible', visible: false }, '*');
  }

  function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (!message) return;

    const messagesContainer = document.getElementById('chatbot-messages');

    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = message;
    messagesContainer.appendChild(userMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      const botMessage = document.createElement('div');
      botMessage.className = 'message bot-message';
      botMessage.textContent = 'Cảm ơn bạn đã liên hệ! Tôi sẽ trả lời ngay khi có thể.';
      messagesContainer.appendChild(botMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);

    input.value = '';
  }

  // Lắng nghe từ iframe cha (nếu có)
  window.addEventListener('message', (event) => {
    if (event.data.action === 'closeChatbot') {
      chatbotContainer.classList.remove('active');
    }
  });

  // Map src cho icon
  const iconSrcMap = {
    phone: "assets/images/icons8-call-48.png",
    zalo: "assets/images/icons8-zalo-48.png",
    insta: "assets/images/chat.png",
    fb: "assets/images/icons8-fb-48.png"
  };

  const contactIcons = document.querySelectorAll("#contactIcons a.contact-icon");

  contactIcons.forEach(icon => {
    const classList = icon.classList;
    for (const key in iconSrcMap) {
      if (classList.contains(key)) {
        const img = icon.querySelector("img");
        if (img) {
          img.src = prefix + iconSrcMap[key];
        }
        break;
      }
    }
  });
});
