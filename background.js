let price;

self.addEventListener('install', (event) => {
    function fetchPrice() {
        fetch('https://www.bitstamp.net/api/v2/ticker/xlmeur/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                price = data.last;
                chrome.action.setBadgeText({text: price.toString()});
                // Send a message to the popup script with the new price
                chrome.runtime.sendMessage({price: price});
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Send a message to the popup script to notify about the error
                chrome.runtime.sendMessage({error: error.message});
            });
    }

    fetchPrice();
    setInterval(fetchPrice, 10000);
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activating...');
});

self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "fetchPrice") {
        sendResponse({price: price});
    }
});