const setUpOptions = () => {
    chrome.storage.local.get('paused', (data) => {
        const page = document.querySelector('.paused-sites');
        const list = document.createElement('ul');
        let paused = data.paused;

        for (const key in data.paused) {
            const listItem = document.createElement('li');
            const span = document.createElement('span');
            const removeBtn = document.createElement('btn');

            span.textContent = key;
            removeBtn.textContent = 'Unpause';
            removeBtn.className = 'unpause-btn';

            removeBtn.onclick = (el) => {
                delete paused[key];
                chrome.storage.local.set({'paused': paused});
                listItem.style.display = 'none';
            }

            listItem.appendChild(span);
            listItem.appendChild(removeBtn);
            list.appendChild(listItem);
        }
        page.appendChild(list);
    });
}

setUpOptions();

