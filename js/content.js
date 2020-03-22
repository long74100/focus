
const hidePage = () => {
    chrome.storage.local.get('paused', (data) => {
        const paused = data.paused;
        const baseUrl = Utils.extractBaseUrl(location.href);
        
        if (paused[baseUrl]) {
            const body = document.querySelector('body');
            const overlay = document.createElement('div');
            const countDown = document.createElement('h1');
            const originalBodyHeight = body.style.height;
            const originalOverflowStyle = body.style.overflow;
            const duration = paused[baseUrl].duration;
            
            body.style.height = '100vh';
            body.style.overflow = 'hidden';
            overlay.className = 'focus-overlay';    
            countDown.className = 'count-down';
            countDown.textContent = Utils.secondsToHHMMSS(duration);
            overlay.appendChild(countDown);
            body.appendChild(overlay);

            const timer = setInterval(() => { 
                chrome.storage.local.get('paused', (data) => {
                    const newPaused = data.paused;
                    
                    if (newPaused[baseUrl]) {
                        const newDuration = newPaused[baseUrl].duration;
                        countDown.textContent = Utils.secondsToHHMMSS(newDuration);
                    } else {
                        clearInterval(timer);
                        body.style.height = originalBodyHeight;
                        body.style.overflow = originalOverflowStyle;
                        overlay.style.display = 'none';
                    }
                });
            }, 1000)
        }
    });
}

hidePage();

