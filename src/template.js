import { auth } from './auth.js'

(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const appId = urlParams.get('appId');
  const sheetId = urlParams.get('sheetId');
  const select = urlParams.get('select');
  
  const { config, csrfTokenInfo } =  await auth();
  let iframeSrc = `https://${config.tenantDomain}/single/?appid=${appId}&sheet=${sheetId}&theme=${config.theme}&opt=ctxmenu,currsel&qlik-web-integration-id=${config.qlikWebIntegrationId}&qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}`;
  if (select) {
    iframeSrc += `&select=${select}`;
  }
  let iframe = document.createElement("iframe");
  iframe.src = iframeSrc;
  iframe.classList.add("iframeStyle");
  document.querySelector("#iframe").appendChild(iframe);

})();