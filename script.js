document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PAGE LOADER ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Start typewriter effect after loader hides
            startTyping();
        }, 1000);
    }, 2500); // Loader displays for 2.5 seconds




    // --- 3. TYPING EFFECT (HERO) ---
    const typingText = document.getElementById('typing-text');
    const phrase = "We invite you to celebrate our love and marriage.";
    let charIndex = 0;

    function startTyping() {
        if (charIndex < phrase.length) {
            typingText.innerHTML += phrase.charAt(charIndex);
            charIndex++;
            setTimeout(startTyping, 100);
        }
    }


    // --- 4. SCROLL REVEAL (INTERSECTION OBSERVER) ---
    const reveals = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });



    // --- 5. FALLING PETALS EFFECT ---
    const petalsContainer = document.getElementById('petals-container');
    const petalCount = 20;

    for (let i = 0; i < petalCount; i++) {
        createPetal();
    }

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize size, position, and animation duration
        const size = Math.random() * 15 + 10; // 10px to 25px
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5s to 10s
        petal.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random opacity for depth
        petal.style.opacity = Math.random() * 0.5 + 0.2;

        petalsContainer.appendChild(petal);
    }


    // --- 6. COUNTDOWN TIMER ---
    // Target date: Sunday, 17 May 2026, 12:00 PM
    const countdownDate = new Date("May 17, 2026 12:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "<h3>Happily Ever After!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("mins").innerText = mins < 10 ? '0' + mins : mins;
        document.getElementById("secs").innerText = secs < 10 ? '0' + secs : secs;
    }, 1000);


    // --- 7. LIGHTBOX FOR GALLERY ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const highResSrc = item.getAttribute('data-src');
            lightboxImg.src = highResSrc;
            lightbox.classList.add('active');
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });


    // --- 8. RSVP FORM SUBMISSION (WHATSAPP INTEGRATION) ---
    const rsvpForm = document.getElementById('rsvp-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    const formMsg = document.getElementById('form-msg');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;
        formMsg.classList.remove('hidden');

        // Gather form data
        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;
        const attend = document.querySelector('input[name="attend"]:checked').value;

        // WhatsApp Phone Number: +91 89219 79752
        const phoneNumber = "918921979752";
        
        // Set conditional message based on attendance
        const responseEmoji = attend.includes("Accepted") ? "💖" : "😕";
        const footerNote = attend.includes("Accepted") 
            ? "*See you at the engagement! 😻🤍*" 
            : "*Wishing you love and happiness on your special day 🤍*";

        // Format the message
        const message = `*✨ Engagement RSVP ✨*%0A────────────────────%0A%0A*Name*      : *${encodeURIComponent(name)}*%0A*Guests*    : *${encodeURIComponent(guests)}*%0A*Response*  : *${encodeURIComponent(attend)} ${responseEmoji}*%0A%0A${encodeURIComponent(footerNote)}`;

        // Create WhatsApp URL
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

        // Redirect after a short delay for better UX
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            
            // Reset UI
            btnLoader.classList.add('hidden');
            btnText.classList.remove('hidden');
            submitBtn.disabled = false;
            formMsg.classList.add('hidden');
            rsvpForm.reset();
        }, 1000);
    });

});
