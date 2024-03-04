document.addEventListener('DOMContentLoaded', fetchPrice);

function fetchPrice() {
    chrome.runtime.sendMessage({command: "fetchPrice"}, function(response) {
        if (response.price) {
            document.getElementById('price').textContent = response.price;
        } else if (response.error) {
            document.getElementById('price').textContent = response.error;
        } else {
            document.getElementById('price').textContent = 'Error: Price could not be fetched';
        }
    });
}

document.getElementById('refresh').addEventListener('click', fetchPrice);

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.price) {
        document.getElementById('price').textContent = message.price;
    } else if (message.error) {
        document.getElementById('price').textContent = message.error;
    }
});