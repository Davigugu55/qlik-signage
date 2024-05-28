import { auth } from './auth.js'

(async () => {

  const { config, csrfTokenInfo } =  await auth()
  
  //embed chart using single API iframe
  let iframeSrc = `https://${config.tenantDomain}/single/?appid=${config.appId}&sheet=${config.sheetId}&theme=${config.theme}&opt=ctxmenu,currsel
  &qlik-web-integration-id=${config.qlikWebIntegrationId}
  &qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}`;
  
  let iframe = document.createElement("iframe");
  iframe.src = iframeSrc;
  iframe.classList.add("iframeStyle");
  document.querySelector("#iframe").appendChild(iframe);
  
//   embed response from a REST API
  let rest = await fetch(`https://${config.tenantDomain}/api/v1/users/me`,
  {
    credentials: "include",
      headers: {
        "Qlik-Web-Integration-ID": config.qlikWebIntegrationId
      }
  }).then(response => response.json());
  
  rest = JSON.stringify(rest, null, 4);
  
  document.querySelector("#rest").innerHTML = rest;
  
  
})();
