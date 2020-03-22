
const hidePage = () => {
    chrome.storage.local.get('paused', (data) => {
        const pausedData = data.paused;
        const baseUrl = Utils.extractBaseUrl(location.href);
        
        if (pausedData[baseUrl]) {

            // scroll to top 
            window.onload=() => {
                setTimeout(function(){

                    scrollTo(0,-1);
                
                    Utils.pauseAllMedia();
                    
                    const body = document.querySelector('body');
                    const overlay = document.createElement('div');
                    const countDown = document.createElement('h1');
                    const originalBodyHeight = body.style.height;
                    const originalOverflowStyle = body.style.overflow;
                    const duration = pausedData[baseUrl].duration;
                    
                    body.style.height = '100vh';
                    body.style.overflow = 'hidden';
                    overlay.className = 'focus-overlay';    
                    countDown.className = 'count-down';
                    countDown.textContent = Utils.secondsToHHMMSS(duration);
                    overlay.appendChild(countDown);
                    body.appendChild(overlay);

                    const timer = setInterval(() => { 
                        chrome.storage.local.get('paused', (data) => {
                            const newPausedData = data.paused;
                            
                            if (newPausedData[baseUrl]) {
                                const newDuration = newPausedData[baseUrl].duration;
                                countDown.textContent = Utils.secondsToHHMMSS(newDuration);

                                if (window.scrollY !== 0) {
                                    body.style.overflow = 'hidden';
                                    scrollTo(0,-1);
                                }
                            } else {
                                clearInterval(timer);
                                body.style.height = originalBodyHeight;
                                body.style.overflow = originalOverflowStyle;
                                overlay.style.display = 'none';
                            }
                        });
                    }, 1000)
                },0);
            }
        }
    });
}

hidePage();

