
//CHUYỂN FORM
const container = document.getElementById('container');
 const registerBtn = document.getElementById('register');
 const loginBtn = document.getElementById('login');
 
 registerBtn.addEventListener('click', () => {
     container.classList.add("active");
     resetPasswordVisibility("signin");
 });
 
 loginBtn.addEventListener('click', () => {
     container.classList.remove("active");
     resetPasswordVisibility("signup"); 
 });
 function togglePasswordVisibility(type) {
    const passwordField = document.getElementById(type === 'signup' ? 'signup-password' : 'signin-password');
    const eyeToggle = document.getElementById(type === 'signup' ? 'signup-eye-toggle' : 'signin-eye-toggle');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeToggle.classList.remove('fa-eye-slash');
        eyeToggle.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        eyeToggle.classList.remove('fa-eye');
        eyeToggle.classList.add('fa-eye-slash');
    }
}

function resetPasswordVisibility(type) {
    const passwordField = document.getElementById(type === 'signup' ? 'signup-password' : 'signin-password');
    const eyeToggle = document.getElementById(type === 'signup' ? 'signup-eye-toggle' : 'signin-eye-toggle');

    passwordField.type = 'password';
    eyeToggle.classList.remove('fa-eye');
    eyeToggle.classList.add('fa-eye-slash');
}   







//kéo form
const initialTop = container.offsetTop;
  const initialLeft = container.offsetLeft;

  dragElement(container);

  function dragElement(elm) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      elm.onmousedown = function (e) {
          if (["INPUT", "TEXTAREA", "BUTTON", "I", "A", "SPAN"].includes(e.target.tagName)) return;

          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;

          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
      };

      function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;

          elm.style.top = (elm.offsetTop - pos2) + "px";
          elm.style.left = (elm.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
      }
  }




function openForm() {
    const form = document.querySelector('.form');
    const registerBtn = document.getElementById('header-register');
    const loginBtn = document.getElementById('header-login');
      registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });


    // Căn giữa thủ công trước khi hiện
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const formWidth = form.offsetWidth;
    const formHeight = form.offsetHeight;

    form.style.left = (windowWidth - formWidth) / 2 + 'px';
    form.style.top = (windowHeight - formHeight) / 2 + 'px';

    form.style.display = "block";
    form.classList.add('show');

    document.addEventListener('click', handleOutsideClick);
}


function closeForm() {
    const form = document.querySelector('.form');
    form.classList.remove('show');

    setTimeout(() => {
        form.style.top = initialTop + 'px';
        form.style.left = initialLeft + 'px';
    }, 310);

    // Gỡ bỏ listener để tránh memory leak
    document.removeEventListener('click', handleOutsideClick);
}

function handleOutsideClick(event) {
    const form = document.querySelector('.form');
    if (form && !form.contains(event.target) && !event.target.matches('#header-register, #header-login')) {
        closeForm();
    }
}

  