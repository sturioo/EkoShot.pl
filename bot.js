document.addEventListener('DOMContentLoaded', (event) => {
    const botBubble = document.getElementById('bot-bubble');
    const botBubbleText = document.getElementById('bot-bubble-text');
    const botContainer = document.getElementById('bot-container');
    const botMessages = document.getElementById('bot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const closeButton = document.querySelector('.bot-close');

    if (botBubble) {
        botBubble.addEventListener('click', toggleBot);
    } else {
        console.error('Bot bubble element not found');
    }

    if (closeButton) {
        closeButton.addEventListener('click', toggleBot);
    } else {
        console.error('Close button element not found');
    }

    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    } else {
        console.error('Send button element not found');
    }

    if (userInput) {
        userInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') sendMessage();
        });
    } else {
        console.error('User input element not found');
    }

    // Showing bubble after page load with smooth animation
    setTimeout(() => {
        if (botBubbleText) {
            botBubbleText.style.opacity = '0';
            botBubbleText.style.transform = 'translateY(10px)';
            botBubbleText.classList.add('show');
            setTimeout(() => {
                botBubbleText.style.opacity = '1';
                botBubbleText.style.transform = 'translateY(0)';
            }, 50);
        } else {
            console.error('Bot bubble text element not found');
        }
    }, 2000);

    function toggleBot() {
        if (botContainer && botBubbleText) {
            botContainer.classList.toggle('show');
            botBubbleText.classList.remove('show');
            if (botContainer.classList.contains('show') && botMessages && botMessages.children.length === 0) {
                setTimeout(() => {
                    displayBotMessage("Witaj! Jestem asystentem EkoShot. W czym mogę Ci pomóc?");
                    displayPredefinedQuestions();
                }, 300);
            }
        } else {
            console.error('Bot container or bubble text element not found');
        }
    }

    function displayPredefinedQuestions() {
        if (!botMessages) {
            console.error('Bot messages element not found');
            return;
        }

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
        if (!userInput) {
            console.error('User input element not found');
            return;
        }

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
        if (!botMessages) {
            console.error('Bot messages element not found');
            return;
        }

        const div = document.createElement('div');
        div.className = 'user-message';
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

    function displayBotMessage(message) {
        if (!botMessages) {
            console.error('Bot messages element not found');
            return;
        }

        const div = document.createElement('div');
        div.className = 'bot-message';
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
        if (!botMessages) {
            console.error('Bot messages element not found');
            return;
        }

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
        if (!botMessages) {
            console.error('Bot messages element not found');
            return;
        }

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
        return answers[question] || "Przepraszam, nie mam odpowiedzi na to pytanie. Czy mogę pomóc w czymś innym?";
    }
});
