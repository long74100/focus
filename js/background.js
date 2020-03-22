// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({'paused': {}}, () => {
        console.log("Successfully installed");
    });
});

// background clock for updating durations
const timer = setInterval(() => { 
    chrome.storage.local.get('paused', (data) => {
        let pausedData = data.paused;

        for (const key in pausedData) {
            const duration = pausedData[key].duration;
            if (duration <= 1) {
                delete pausedData[key];
            } else {
                pausedData[key].duration = duration - 1;
            }
        }

        chrome.storage.local.set({'paused': pausedData});
    });
}, 1000)