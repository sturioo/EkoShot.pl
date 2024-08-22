// Obsługa menu mobilnego
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Zamykanie menu po kliknięciu w link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Przycisk "Powrót do góry"
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animacja liczb w sekcji "Nasz wpływ na środowisko"
function animateCountUp(element) {
    const target = parseInt(element.innerText);
    let count = 0;
    const duration = 2000; // 2 sekundy
    const interval = 50; // 50ms między każdą aktualizacją
    const steps = duration / interval;
    const increment = target / steps;

    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            clearInterval(timer);
            count = target;
        }
        element.innerText = Math.floor(count);
    }, interval);
}

// Uruchom animację, gdy sekcja jest widoczna
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-count-up').forEach(el => {
                animateCountUp(el);
            });
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

observer.observe(document.querySelector('#eco-impact'));

// Mapa partnerów (przykładowa implementacja)
function initMap() {
    const mapOptions = {
        center: {
            lat: 52.2297,
            lng: 21.0122
        },
        zoom: 6,
        styles: [{
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e0f2e9"
                        }]
                    },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                        }]
                    },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#a3d7d2"
                        }]
                    }
                ]
    };
    const map = new google.Maps.Map(document.getElementById('partnerMap'), mapOptions);

    // Tu można dodać markery partnerów
    const partners = [{
            lat: 52.2297,
            lng: 21.0122,
            name: "EkoShot Warszawa"
                },
        {
            lat: 50.0647,
            lng: 19.9450,
            name: "EkoShot Kraków"
                },
        {
            lat: 53.1235,
            lng: 18.0084,
            name: "EkoShot Bydgoszcz"
                }
            ];

    const customIcon = {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        fillColor: '#2ECC71',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 2
    };

    partners.forEach(partner => {
        const marker = new google.maps.Marker({
            position: {
                lat: partner.lat,
                lng: partner.lng
            },
            map: map,
            title: partner.name,
            icon: customIcon
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<div style="color: #333; padding: 5px;"><strong>${partner.name}</strong></div>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Załaduj Google Maps API
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
script.defer = true;
script.async = true;
document.head.appendChild(script);





function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const headerHeight = document.querySelector('header').offsetHeight;

    let currentSectionId = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 10; // Dodajemy mały offset
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Używamy debounce, aby ograniczyć częstotliwość wywoływania funkcji
window.addEventListener('scroll', debounce(updateActiveNavLink));
window.addEventListener('load', updateActiveNavLink);

// Walidacja formularza
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (isValid) {
        // Tutaj możesz dodać kod do wysłania formularza
        alert('Formularz został wysłany! Dziękujemy za kontakt.');
        contactForm.reset();
    } else {
        alert('Proszę wypełnić wszystkie wymagane pola.');
    }
});

// Animacje przy przewijaniu
const animatedElements = document.querySelectorAll('.benefit, .step, .partner-step, .eco-stat');

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

animatedElements.forEach(element => {
    animateOnScroll.observe(element);
});

const botBubble = document.getElementById('bot-bubble');
const botBubbleText = document.getElementById('bot-bubble-text');
const botContainer = document.getElementById('bot-container');
const botMessages = document.getElementById('bot-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const closeButton = document.querySelector('.bot-close');

botBubble.addEventListener('click', toggleBot);
closeButton.addEventListener('click', toggleBot);
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

// Pokazywanie dymka po załadowaniu strony
window.addEventListener('load', () => {
    setTimeout(() => {
        botBubbleText.classList.add('show');
    }, 2000);
});

function toggleBot() {
    botContainer.classList.toggle('show');
    botBubbleText.classList.remove('show');
    if (botContainer.classList.contains('show') && botMessages.children.length === 0) {
        setTimeout(() => {
            displayBotMessage("Witaj! Jestem asystentem EkoShot. W czym mogę Ci pomóc?");
            displayPredefinedQuestions();
        }, 300);
    }
}

function displayPredefinedQuestions() {
    const questions = [
                "Czym jest EkoShot?",
                "Jak działają biodegradowalne powerbanki?",
                "Jakie są zalety korzystania z EkoShot?",
                "Jak zostać partnerem EkoShot?",
                "Gdzie można znaleźć EkoShot?",
                "Jaki jest wpływ EkoShot na środowisko?"
            ];
    questions.forEach((q, index) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'bot-question';
            div.textContent = q;
            div.addEventListener('click', () => handleUserInput(q));
            botMessages.appendChild(div);
            botMessages.scrollTop = botMessages.scrollHeight;
        }, index * 200);
    });
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        handleUserInput(message);
        userInput.value = '';
    }
}

function handleUserInput(message) {
    displayUserMessage(message);
    displayTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        const answer = getAnswer(message);
        displayBotMessage(answer);
    }, 1500);
}

function displayUserMessage(message) {
    const div = document.createElement('div');
    div.className = 'user-message';
    div.textContent = message;
    botMessages.appendChild(div);
    botMessages.scrollTop = botMessages.scrollHeight;
}

function displayBotMessage(message) {
    const div = document.createElement('div');
    div.className = 'bot-message';
    div.textContent = message;
    botMessages.appendChild(div);
    botMessages.scrollTop = botMessages.scrollHeight;
}

function displayTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'bot-message typing';
    div.textContent = "Już odpowiadam...";
    botMessages.appendChild(div);
    botMessages.scrollTop = botMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = botMessages.querySelector('.typing');
    if (typingIndicator) {
        botMessages.removeChild(typingIndicator);
    }
}

function getAnswer(question) {
    const answers = {
        "Czym jest EkoShot?": "EkoShot to innowacyjne, biodegradowalne powerbanki dla klubów, barów i restauracji. Nasze rozwiązanie łączy troskę o środowisko z nowoczesną technologią, zapewniając wygodny dostęp do energii dla urządzeń mobilnych.",
        "Jak działają biodegradowalne powerbanki?": "Nasze powerbanki są jednorazowego użytku i wykonane z biodegradowalnych materiałów. Po wykorzystaniu energii, powerbank należy wyrzucić do specjalnego kontenera. EkoShot zajmuje się ich odbiorem i prawidłową utylizacją w zakładzie mechaniczno-biologicznego przetwarzania odpadów.",
        "Jakie są zalety korzystania z EkoShot?": "Główne zalety to: ekologiczność (biodegradowalność), wydajność (możliwość wielokrotnego naładowania urządzenia), wygoda użytkowania (brak potrzeby zwrotu), bezpieczeństwo (certyfikowane urządzenia), higiena (zawsze nowe urządzenie) oraz uniwersalność (kompatybilność z różnymi urządzeniami).",
        "Jak zostać partnerem EkoShot?": "Aby zostać partnerem EkoShot, należy: 1) Skontaktować się z nami przez formularz lub telefon, 2) Ustalić szczegóły współpracy, 3) Podpisać umowę, 4) Otrzymać EkoShoty i zacząć oferować je klientom. Zachęcamy do wypełnienia formularza kontaktowego na naszej stronie.",
        "Gdzie można znaleźć EkoShot?": "EkoShot jest dostępny w wielu klubach, barach i restauracjach w całej Polsce. Aktualnie mamy ponad 50 partnerów biznesowych. Dokładną mapę naszych partnerów można znaleźć na naszej stronie w sekcji 'Mapa partnerów'.",
        "Jaki jest wpływ EkoShot na środowisko?": "EkoShot ma pozytywny wpływ na środowisko. Dzięki naszemu rozwiązaniu zaoszczędziliśmy już 500 kg plastiku, zutylizowaliśmy ekologicznie 1000 powerbanków i współpracujemy z 50 partnerami dbającymi o środowisko. Nasze powerbanki ulegają pełnej biodegradacji, minimalizując obciążenie dla planety."
    };
    return answers[question] || "Przepraszam, nie mam odpowiedzi na to pytanie. Czy mogę pomóc w czymś innym?";
}
