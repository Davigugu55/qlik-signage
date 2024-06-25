export function convertUrl() {
  const inputText = document.getElementById('urlConvert').value;
  let outputText = '';

  // Check if input is an iframe
  const iframeMatch = inputText.match(/<iframe.*?src="(.*?)"/);
  if (iframeMatch) {
    const url = new URL(iframeMatch[1]);
    const appId = url.searchParams.get('appid');
    const sheetId = url.searchParams.get('sheet');
    const select = url.searchParams.get('select');
    outputText = `/app?appId=${appId}&sheetId=${sheetId}`;
    if (select) {
      outputText += `&select=${select}`;
    }
  } else {
    // Assume input is a URL
    const url = new URL(inputText);
    const pathParts = url.pathname.split('/');
    const appId = pathParts[3];
    const sheetId = pathParts[5];
    outputText = `/app?appId=${appId}&sheetId=${sheetId}`;
  }

  const outputContainerhidden = document.getElementById('url_response');
  const outputContainer = document.getElementById('outputText');
  outputContainer.innerHTML = ''; // Clear previous output

  const link = document.createElement('a');
  link.href = outputText;
  link.textContent = "Link";
  link.target = "_blank"
  link.rel = "noopener noreferrer"
  outputContainer.appendChild(link);
  outputContainer.value = link;
  outputContainerhidden.hidden = false;
}