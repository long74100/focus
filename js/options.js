const setUpOptions = () => {
    chrome.storage.sync.get('paused', (data) => {
        const page = document.querySelector('.paused-sites');
        const list = document.createElement('ul');
        for (const key in data.paused) {
            const listItem = document.createElement('li');
            listItem.textContent = key;
            list.appendChild(listItem);
        }
        page.appendChild(list);
    });
}

setUpOptions();

