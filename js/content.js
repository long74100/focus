
const hidePage = () => {
    chrome.storage.sync.get('paused', (data) => {
        paused = data.paused;
        baseUrl = Utils.extractBaseUrl(location.href);
        if (paused[baseUrl]) {
            const body = document.querySelector('body');
            const overlay = document.createElement('div');
            const countDown = document.createElement('h1');
            let duration = paused[baseUrl].duration * 60;
            
            body.style.overflow = 'hidden';
            overlay.className = 'focus-overlay';    
            countDown.className = 'count-down';
            countDown.textContent = Utils.secondsToHHMMSS(duration);
            overlay.appendChild(countDown);
            body.appendChild(overlay);

            const timer = setInterval(() => { 
                if (duration == 0) {
                    clearInterval(timer);
                } else {
                    duration--;
                    countDown.textContent = Utils.secondsToHHMMSS(duration);
                }
            }, 1000)
        }
    });
}

hidePage();

