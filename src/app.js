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
  
  //https://incognito.us.qlikcloud.com/single/?appid=bc97609f-523b-4fe9-91f6-78aa0bd1b989&obj=Tsmvffe&opt=ctxmenu,currsel" style="border:none;width:100%;height:100%;"
  let iframe = `https://${config.tenantDomain}/single/?appid=${config.appId}&obj=`
  
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
