document.getElementById('readBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => localStorage.getItem('admin_token')
  });
  const token = result[0].result;
  document.getElementById('tokenInput').value = token || '';
  document.getElementById('result').textContent = token ? `Read: ${token}` : 'No admin_token found';
});

document.getElementById('copyBtn').addEventListener('click', async () => {
  const token = document.getElementById('tokenInput').value;
  if (token) {
    await navigator.clipboard.writeText(token);
    document.getElementById('result').textContent = `Copied: ${token}`;
  } else {
    document.getElementById('result').textContent = 'No token to copy';
  }
});

document.getElementById('writeBtn').addEventListener('click', async () => {
  const token = document.getElementById('tokenInput').value;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (value) => localStorage.setItem('admin_token', value),
    args: [token]
  });
  document.getElementById('result').textContent = token ? `Written: ${token}` : 'Token cleared';
});