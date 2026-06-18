# TODO: EmailJS Contact Form Integration

- Remove current Formspree placeholder code in `js/main.js`.
- Add EmailJS script loader in `index.html` (or call `emailjs.send` using `window.emailjs`).
- Configure EmailJS:
  - SERVICE_ID = "service_psr9uf4"
  - TEMPLATE_ID = "PASTE_TEMPLATE_ID"
  - PUBLIC_KEY = "PASTE_PUBLIC_KEY"
- Implement send on `#contact-form submit`:
  - Map fields to template vars:
    - from_name
    - from_email
    - subject
    - message
- Add UI states:
  - loading text: "Sending..."
  - success: "Message sent successfully."
  - error: "Failed to send message. Please try again."
  - clear form after success
- Keep current UI/styling; only adjust button loading state + message text.

