/**
 * Sets up popup 
 */
const setUpPopup = () => {
    const actionIcon = document.querySelector('.action-icon');
    const changeOptions = document.querySelector('.manageOptions');
    let currTab;
    let baseUrl;
    let paused;

    chrome.storage.local.get('paused', (data) => {
        paused = data.paused;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            currTab = tabs[0];
            if (currTab) { 
                baseUrl = Utils.extractBaseUrl(currTab.url);
                actionIcon.setAttribute('src', paused[baseUrl] ? 'images/unpause.png' : 'images/pause.png');
            }
        });
    });

    actionIcon.onclick = (el) => {
        const duration = document.querySelector('#duration').value || 30;
        if (paused) {        
            if (paused[baseUrl]) {
                delete paused[baseUrl];
            } else {
                paused[baseUrl] = { duration: duration * 60 };
            }

            chrome.tabs.update(currTab.id, {url: currTab.url});

            chrome.storage.local.set({ paused: paused }, ()  => {
                actionIcon.setAttribute('src', paused[baseUrl] ? 'images/unpause.png' : 'images/pause.png')
            });
        }
    };

    changeOptions.onclick = (el) => {
        chrome.runtime.openOptionsPage();
    }
}

setUpPopup();


