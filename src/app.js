import { auth } from './auth.js'
import { configuration } from './configuration.js'

(async () => {

  const { app, config, csrfTokenInfo } =  await auth()
  
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
  
  let iframeSrc = `https://${config.tenantDomain}/single/?appid=${config.appId}&obj=Tsmvffe&opt=ctxmenu,currsel&qlik-web-integration-id=${config.qlikWebIntegrationId}&qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}`
  let iframe = document.createElement("iframe");
  iframe.src = iframeSrc
  let rest = await (await fetch(`https://${config.tenantDomain}/api/v1/users/me`,
  {
    credentials: "include",
      headers: {
        "Qlik-Web-Integration-ID": config.qlikWebIntegrationId
      }
  })).json();
  
  rest = JSON.stringify(rest, null, 4);
  
  document.querySelector("#rest").innerHTML = rest;
  document.querySelector("#iframe").appendChild(iframe)
  
})();
