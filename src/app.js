import { auth } from './auth.js'
import { configuration } from './configuration.js'
import { connectQlikApp } from './connectQlikApp.js'
import { connectIframe } from './connectIframe.js'

(async () => {

  const { config, csrfTokenInfo } =  await auth()
  
  //Embed chart using Nebula.js
  const { app } = await connectQlikApp(config, csrfTokenInfo)
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
  const iframeSrc = connectIframe(config, csrfTokenInfo);
  let iframe = document.createElement("iframe");
  iframe.src = iframeSrc
  document.querySelector("#iframe").appendChild(iframe)
  
  let rest = await (await fetch(`https://${config.tenantDomain}/api/v1/users/me`,
  {
    credentials: "include",
      headers: {
        "Qlik-Web-Integration-ID": config.qlikWebIntegrationId
      }
  })).json();
  
  rest = JSON.stringify(rest, null, 4);
  
  document.querySelector("#rest").innerHTML = rest;
  
  
})();
