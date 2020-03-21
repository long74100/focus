// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({'paused': {}}, function() {
      console.log('set paused');
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("tab updated");
});

chrome.tabs.onCreated.addListener(function(tab) {         
    console.log("tab opened");
});