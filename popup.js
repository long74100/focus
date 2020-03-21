const extractBaseUrl = (url) => {
    const pathArray = url.split( '/' );
    const protocol = pathArray[0];
    const host = pathArray[2];
    return protocol + '//' + host;
}

const actionIcon = document.querySelector('.action-icon');
let baseUrl;
let paused;

chrome.storage.sync.get('paused', (data) => {
    paused = data.paused;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currTab = tabs[0];
        if (currTab) { 
            baseUrl = extractBaseUrl(currTab.url);
            actionIcon.setAttribute('src', paused[baseUrl] ? 'images/unpause.png' : 'images/pause.png');
        }
    });
});

actionIcon.onclick = (element) => {
    if (paused) {        
        if (paused[baseUrl]) {
            delete paused[baseUrl];
        } else {
            paused[baseUrl] = { duration: 30 };
        }

        chrome.storage.sync.set({'paused': paused}, ()  => {
            actionIcon.setAttribute('src', paused[baseUrl] ? 'images/unpause.png' : 'images/pause.png')
        });
    }
};

const changeOptions = document.querySelector('.manageOptions');
changeOptions.onclick = (element) => {
    chrome.runtime.openOptionsPage(() => console.log("opened options"))
}