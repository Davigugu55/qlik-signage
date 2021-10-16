import { auth } from './auth.js'
import { configuration } from './configuration.js'

(async () => {

  const { app } =  await auth()
  
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
  
})();
