// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({'paused': {}}, () => {
        console.log("Successfully installed");
    });
});

const timer = setInterval(() => { 
    chrome.storage.local.get('paused', (data) => {
        let paused = data.paused;

        for (const key in paused) {
            const duration = paused[key].duration;
            if (duration <= 1) {
                delete paused[key];
            } else {
                paused[key].duration = duration - 1;
            }
        }

        chrome.storage.local.set({'paused': paused});
    });
}, 1000)