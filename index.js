/* global browser */

/* eslint-disable no-console */
// The console logs should be replaced with a proper notifier

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text successfully copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

function getChatText() {
  const texts = [];
  const elements = document.querySelectorAll('.usermessage');

  elements.forEach((el) => {
    if (el.children.length) {
      el.children[0].remove();
    }
    texts.push(el.innerText);
  });

  return texts.join('\n');
}

async function copyChatTextToClipboard() {
  await copyTextToClipboard(getChatText());
}

function exportButtenExists() {
  const theButton = document.querySelector('#chat-export-button');

  return theButton !== null;
}

function createButtonForExportingChat() {
  if (exportButtenExists()) {
    console.log('The export button already created!');
    return;
  }

  const container = document.getElementById('chat-tab-panel');
  const newDiv = document.createElement('div');
  newDiv.id = 'chat-export-button';
  newDiv.classList.add('chat-input-container');
  newDiv.innerHTML = `
    <button style="padding: .5rem 1rem; background-color: #C00; margin: 0 auto; width: 100%; font-weight: bold">
      Export chat to clipboard
    </button>`;
  newDiv.addEventListener('click', copyChatTextToClipboard);
  container.appendChild(newDiv);
}

browser.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (request.action === 'Add export button') {
    createButtonForExportingChat();
  }
});
