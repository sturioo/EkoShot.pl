document.addEventListener('DOMContentLoaded', (event) => {
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

    // Płynne przewijanie
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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

    // Animacja sekcji przy przewijaniu
    const animatedSections = document.querySelectorAll('.section');

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if (entry.target.id === 'eco-impact') {
                    entry.target.querySelectorAll('.animate-count-up').forEach(el => {
                        animateCountUp(el);
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    animatedSections.forEach(section => {
        animateOnScroll.observe(section);
    });

    // Obsługa FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            answer.classList.toggle('active');
        });
    });

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

    // Obsługa chatbota
    const botBubble = document.getElementById('bot-bubble');
    const botBubbleText = document.getElementById('bot-bubble-text');
    const botContainer = document.getElementById('bot-container');
    const botMessages = document.getElementById('bot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const closeButton = document.querySelector('.bot-close');

    // Sprawdzanie, czy wszystkie elementy zostały znalezione
    const elements = {
        botBubble,
        botBubbleText,
        botContainer,
        botMessages,
        userInput,
        sendButton,
        closeButton
    };
    for (const [name, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`Element ${name} nie został znaleziony.`);
            return;
        }
    }

    botBubble.addEventListener('click', toggleBot);
    closeButton.addEventListener('click', toggleBot);
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage();
    });

    // Pokazywanie dymku po załadowaniu strony
    setTimeout(() => {
        botBubbleText.style.opacity = '0';
        botBubbleText.style.transform = 'translateY(10px)';
        botBubbleText.classList.add('show');
        setTimeout(() => {
            botBubbleText.style.opacity = '1';
            botBubbleText.style.transform = 'translateY(0)';
        }, 50);
    }, 2000);

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
                div.style.opacity = '0';
                div.style.transform = 'translateY(20px)';
                div.addEventListener('click', () => handleUserInput(q));
                botMessages.appendChild(div);
                setTimeout(() => {
                    div.style.opacity = '1';
                    div.style.transform = 'translateY(0)';
                }, 50);
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
        displayMessage(message, 'user-message');
    }

    function displayBotMessage(message) {
        displayMessage(message, 'bot-message');
    }

    function displayMessage(message, className) {
        const div = document.createElement('div');
        div.className = className;
        div.textContent = message;
        div.style.opacity = '0';
        div.style.transform = 'translateY(20px)';
        botMessages.appendChild(div);
        setTimeout(() => {
            div.style.opacity = '1';
            div.style.transform = 'translateY(0)';
        }, 50);
        botMessages.scrollTop = botMessages.scrollHeight;
    }

    function displayTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'bot-message typing';
        div.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        div.style.opacity = '0';
        div.style.transform = 'translateY(20px)';
        botMessages.appendChild(div);
        setTimeout(() => {
            div.style.opacity = '1';
            div.style.transform = 'translateY(0)';
        }, 50);
        botMessages.scrollTop = botMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = botMessages.querySelector('.typing');
        if (typingIndicator) {
            typingIndicator.style.opacity = '0';
            typingIndicator.style.transform = 'translateY(20px)';
            setTimeout(() => {
                botMessages.removeChild(typingIndicator);
            }, 300);
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

        const lowercaseQuestion = question.toLowerCase();
        for (const [key, value] of Object.entries(answers)) {
            if (lowercaseQuestion.includes(key.toLowerCase())) {
                return value;
            }
        }
        return "Przepraszam, nie mam odpowiedzi na to pytanie. Czy mogę pomóc w czymś innym?";
    }
});
