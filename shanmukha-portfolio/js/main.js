document.addEventListener('DOMContentLoaded', () => {
  // Loader
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1000);

  // Typing Effect
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  const textArray = ["Software Developer", "Full Stack Engineer", "Problem Solver"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } 
    else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } 
    else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if(textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  if(textArray.length) setTimeout(type, newTextDelay + 250);

  // Navbar Scroll & Progress Bar
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progress-bar');

  window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Progress bar
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });

  // Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Reveal Animations
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  // Active Nav Link
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinksItems.forEach(li => {
      li.classList.remove('active');
      if (li.getAttribute('href').includes(current) && current !== '') {
        li.classList.add('active');
      }
    });
  });

  // Back to Top
  const backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Contact Form Submission (EmailJS)
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  // EmailJS configuration
  const SERVICE_ID = "service_psr9uf4";
  const TEMPLATE_ID = "template_m6msppf";

  const PUBLIC_KEY = "T63nYj8AlpCx_ivmJ";


  function setFormLoading(isLoading) {
    if (!contactForm) return;

    const btn = contactForm.querySelector('button[type="submit"]');
    if (!btn) return;

    if (isLoading) {
      btn.disabled = true;
      if (!btn.dataset.originalText) {
        btn.dataset.originalText = btn.innerHTML;
      }
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
      btn.disabled = false;
      if (btn.dataset.originalText) {
        btn.innerHTML = btn.dataset.originalText;
        btn.dataset.originalText = '';
      }
    }
  }

  function showMessage(text, type) {
    if (!formMessage) return;

    formMessage.textContent = text;
    formMessage.className =
      'form-message' +
      (type === 'success' ? ' success' : type === 'error' ? ' error' : '');
  }

  async function initEmailJS() {
    // emailjs is loaded from CDN in index.html
    if (!window.emailjs) {
      console.error('[EmailJS] window.emailjs not found');
      return false;
    }

    try {
      console.log('[EmailJS] init with PUBLIC_KEY:', PUBLIC_KEY);
      window.emailjs.init(PUBLIC_KEY);
      return true;
    } catch (err) {
      console.error('[EmailJS] init error:', err);
      return false;
    }
  }


  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value?.trim() || '';
      const email = document.getElementById('email')?.value?.trim() || '';
      const subject = document.getElementById('subject')?.value?.trim() || '';
      const message = document.getElementById('message')?.value?.trim() || '';

      if (!name || !email || !subject || !message) {
        showMessage('Please fill out all fields.', 'error');
        return;
      }



      const ready = await initEmailJS();
      if (!ready) {
        showMessage('Failed to send message. Please try again.', 'error');
        return;
      }

      setFormLoading(true);
      showMessage('', '');

      try {
        console.log('[EmailJS] send args:', {
          serviceId: SERVICE_ID,
          templateId: TEMPLATE_ID,
          params: {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
          }
        });

        // Confirm exact templateId being sent (helps debug 'template ID not found')
        console.log('[EmailJS] using TEMPLATE_ID:', TEMPLATE_ID);


        const sendResult = await window.emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
          }
        );

        console.log('[EmailJS] sendResult:', sendResult);


        contactForm.reset();
        showMessage('Message sent successfully. I will get back to you soon.', 'success');


        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.className = 'form-message';
        }, 5000);

      } catch (err) {
        console.error('[EmailJS] send error:', err);
        // Surface exact error message in UI too (still keeps recruiter-friendly text)
          const details = err && err.text ? err.text : err && err.message ? err.message : '';
          console.error('[EmailJS] error details:', details);

          // If EmailJS returns field errors / validation, surface them in console
          try {
            console.error('[EmailJS] error raw object:', JSON.stringify(err, null, 2));
          } catch {
            console.error('[EmailJS] error raw object (non-serializable):', err);
          }

          showMessage('Failed to send message. Please try again.', 'error');

      } finally {

        setFormLoading(false);
      }
    });
  }
});
