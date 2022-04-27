//import { auth } from './auth.js'
import { configuration } from './configuration.js'
import *  as config from '../config/config';
//import { connectQlikApp } from './connectQlikApp.js'
import Auth, { AuthType } from '@qlik/sdk';

(async () => {

  //const { config, csrfTokenInfo } =  await auth()
  const auth = new Auth({
    host: 'https://' + config.tenantDomain,
    authType: AuthType.JWTAuth,
    webIntegrationId: config.qlikWebIntegrationId,
    fetchToken: async () => {
      return await fetch("token").then(resp => resp.json()).then((res) => res.token);
    }
  });
  
  //add page content
  let mainTag = document.getElementsByTagName("main");

//Embed chart using Nebula.js
  // connect to a Qlik Sense application
  await auth.getSessionCookie();
  // fetch schema for communicating with Qlik's engine API
  const schema = await fetch("https://unpkg.com/enigma.js/schemas/12.936.0.json").then(response => response.json());
  const wsUrl = await auth.generateWebsocketUrl(config.appId);
  
  const session = window.enigma.create({ schema, url: wsUrl });
  
  // 7) open the app
  const app = await (await session.open()).openDoc(config.appId);
  
  // create renderer
  const renderer = window.stardust.embed(app, configuration);
  // render toolbar
  (await renderer.selections()).mount(document.querySelector(".toolbar"));
  
  // render chart
  renderer.render({
    type: 'bar-chart',
    element: document.querySelector("#bar"),
    fields: ["title", '=Avg(revenue)'],
    properties: {
      title: "Nebula Bar Chart example",
      subtitle: "This example shows data fetched from a Qlik app rendered as a bar chart using Nebula."
    }
  });
  
  //embed chart using single API iframe
  let iframeSrc = `https://${config.tenantDomain}/single/?appid=${config.appId}&obj=${config.objId}&opt=ctxmenu,currsel
  &qlik-web-integration-id=${config.qlikWebIntegrationId}`;
  //&qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}
  
  let iframe = document.createElement("iframe");
  iframe.src = iframeSrc;
  iframe.classList.add("iframeStyle");
  document.querySelector("#iframe").appendChild(iframe);
  
  //embed response from a REST API
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
