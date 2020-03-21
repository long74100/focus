
const hidePage = () => {
    chrome.storage.sync.get('paused', (data) => {
        paused = data.paused;
        baseUrl = Utils.extractBaseUrl(location.href);
        if (paused[baseUrl]) {
            alert("hello")
            const body = document.querySelector('body');
            body.style.overflow = 'hidden';
            const overlay = document.createElement('div');
            const countDown = document.createElement('h1');
            overlay.className = 'focus-overlay';    
            countDown.textContent = '11:30';
            overlay.appendChild(countDown);
            body.appendChild(overlay);
        }
    });
}

hidePage();

