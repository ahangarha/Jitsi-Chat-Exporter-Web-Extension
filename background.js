/* global browser */

browser.browserAction.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(
    tab.id,
    {
      action: 'Add export button',
    },
  );
});
