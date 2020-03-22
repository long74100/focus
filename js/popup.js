/**
 * Sets up the popup screen 
 */
const setUpPopup = () => {
    const actionIcon = document.querySelector('.action-icon');
    const changeOptions = document.querySelector('.manageOptions');
    let currTab;
    let baseUrl;
    let pausedData;

    chrome.storage.local.get('paused', (data) => {
        pausedData = data.paused;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            currTab = tabs[0];
            if (currTab) { 
                baseUrl = Utils.extractBaseUrl(currTab.url);
                actionIcon.setAttribute('src', pausedData[baseUrl] ? 'images/unpause.png' : 'images/pause.png');
            }
        });
    });

    actionIcon.onclick = (el) => {
        const duration = document.querySelector('#duration').value || 30;
        if (pausedData) {        
            if (pausedData[baseUrl]) {
                delete pausedData[baseUrl];
            } else {
                pausedData[baseUrl] = { duration: duration * 60 };
            }
              
            chrome.tabs.update(currTab.id, { url: baseUrl });

            chrome.storage.local.set({ paused: pausedData }, ()  => {
                actionIcon.setAttribute('src', pausedData[baseUrl] ? 'images/unpause.png' : 'images/pause.png')
            });
        }
    };

    changeOptions.onclick = (el) => {
        chrome.runtime.openOptionsPage();
    }
}

setUpPopup();


