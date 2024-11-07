document.addEventListener('DOMContentLoaded', function () {
    const hasOnLoadRedirect = redirect();
    if (!hasOnLoadRedirect) {
        window.addEventListener('hashchange', redirect);
    }
});

function redirect() {
    const message = document.getElementById('redirect-message');
    if (!message) {
        console.log("No redirect-message element found, skipping redirect function.");
        return false;
    }

    // Dictionary mapping paths to destination URLs and titles
    const redirects = {
        'ncsc': {
            url: 'https://ncsc.gov.uk',
            title: 'National Cyber Security Centre (NCSC)'
        },
        'ncsc-cyber-aware': {
            url: 'https://www.ncsc.gov.uk/cyberaware/home',
            title: 'National Cyber Security Centre (NCSC) Cyber Aware advice'
        },
        'uksic': {
            url: 'https://saferinternet.org.uk/',
            title: 'UK Safer Internet Centre (UKSIC)'
        },
        'moz-mon': {
            url: 'https://monitor.mozilla.org/',
            title: 'Mozilla Monitor'
        },
        'ico': {
            url: 'https://ico.org.uk/for-the-public/online/',
            title: 'Information Commissioner\'s Office (ICO)'
        },
        'hibp': {
            url: 'https://haveibeenpwned.com/',
            title: 'Have I Been Pwned'
        },
        'ageuk': {
            url: 'https://www.ageuk.org.uk/information-advice/work-learning/technology-internet/internet-security/',
            title: 'Age UK'
        }
    };

    // Get the current path, remove leading/trailing slashes, and convert to lowercase
    const path =
        window.location.hash.replace(/^#\/?|\/+$/g, '').toLowerCase() ||
        window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();

    // Check if path exists in the redirects dictionary
    if (redirects.hasOwnProperty(path)) {
        message.classList.remove('hidden');

        const destination = redirects[path];
        let countdown = 10; // seconds

        document.getElementById('redirect-dest').textContent = destination.title;
        document.getElementById('redirect-url').setAttribute("href", destination.url);

        // Update countdown every second
        let interval = setInterval(function () {
            countdown--;
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.textContent = countdown;
            }
            if (countdown <= 0) {
                clearInterval(interval);
                window.location.href = destination.url;
            }
        }, 1000);

        return true;
    } else {
        message.classList.add('hidden');
    }
    return false;
};
