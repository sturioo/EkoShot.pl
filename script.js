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
