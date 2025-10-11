document.addEventListener('DOMContentLoaded',() => {
// Mobile nav toggle
    const navToggle =document.querySelector('.nav-togglee');
    const nav= document.getElementById('primary-nav');
    if(navToggle && nav){
        navToggle.addEventListener ('click', () => {
            const expanded = navToggle.getAttribute ('aria-expanded')=== 'true';
            navToggle.setAttribute ('aria-expanded', String (!expanded));
            nav.classList.toggle('open');

        });
    } 

    // Booking modal
    const modal = document.getElementById('booking-modal');
    const modalClose = document.getElementById('modal-close');
    const bookingForm = document.getElementById('booking-form');

    document.body.addEventListener('click', (e) => {
    const b = e.target.closest('.book-btn');
    if(b){
      const room = b.dataset.room || 'Room';
      openModal(room);
    }
     });
   if(modalClose){ modalClose.addEventListener('click', closeModal); }
   if(modal){ modal.addEventListener('click', (e)=>{if(e.target===modal) closeModal();}); }

   function openModal(room){
    modal.classList.add('show');
    const roomInput = document.getElementById('booking-room');
    if(roomInput) roomInput.value = room;
  }
   function closeModal(){
    modal.classList.remove('show');
    if(bookingForm) bookingForm.reset();
  }
   // Booking form submit
  if(bookingForm){
    bookingForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const name = bookingForm.querySelector('[name="name"]').value.trim();
      const email = bookingForm.querySelector('[name="email"]').value.trim();
      if(!name || !email){
        showMessage(bookingForm,'Please provide name and email.','error');return;
      }
      showMessage(bookingForm,'Your booking request has been sent!','success');
      bookingForm.reset();
      setTimeout(closeModal,1500);
    });
  }
  // Footer forms
  const footerContact=document.getElementById('footer-contact-form');
  const subscribeForm=document.getElementById('subscribe-form');
  if(footerContact){
    footerContact.addEventListener('submit',e=>{
      e.preventDefault();
      showMessage(footerContact,'Thanks! We will reply soon.','success');
      footerContact.reset();
    });
  }
  if(subscribeForm){
    subscribeForm.addEventListener('submit',e=>{
      e.preventDefault();
      const email=subscribeForm.querySelector('input[name="newsletter-email"]').value.trim();
      if(!validateEmail(email)){
        showMessage(subscribeForm,'Please enter a valid email.','error');return;
      }
      showMessage(subscribeForm,'Subscribed successfully!','success');
      subscribeForm.reset();
    });
  }

  // Contact page form
  const contactForm=document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit',e=>{
      e.preventDefault();
      const name=contactForm.querySelector('[name="name"]').value.trim();
      const email=contactForm.querySelector('[name="email"]').value.trim();
      const msg=contactForm.querySelector('[name="message"]').value.trim();
      if(!name||!email||!msg){
        showMessage(contactForm,'Fill all required fields.','error');return;
      }
      showMessage(contactForm,'Inquiry sent. We will get back soon.','success');
      contactForm.reset();
    });
  }

  // Helpers
  function showMessage(form,text,type='success'){
    let el=form.querySelector('.form-msg');
    if(!el){
      el=document.createElement('div');
      el.className='form-msg';
      el.style.marginTop='0.6rem';
      form.appendChild(el);
    }
    el.textContent=text;
    el.style.color=(type==='success'?'#4caf50':'#f44336');
    setTimeout(()=>{el.textContent='';},4000);
  }
  function validateEmail(email){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);}
});