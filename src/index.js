(async () => {
  // Get the configuration information from the config.js file
  const config = await await fetch("config").then((response) =>
    response.json()
  );

  // Create a JWT token for authenticating the user to a QCS session
  const token = await await fetch("token").then((response) => response.json());

  const login = await await fetch(
    `https://${config.tenantDomain}/login/jwt-session?qlik-web-integration-id=${config.qlikWebIntegrationId}`,
    {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token.token}`,
        "qlik-web-integration-id": config.qlikWebIntegrationId
      },
      rejectunAuthorized: false
    }
  );

  //Get the cross-site scripting token to allow requests to QCS from the web app
  const csrfTokenInfo = await await fetch(
    `https://${config.tenantDomain}/api/v1/csrf-token?qlik-web-integration-id=${config.qlikWebIntegrationId}`,
    {
      credentials: "include",
      headers: {
        "Qlik-Web-Integration-ID": config.qlikWebIntegrationId
      }
    }
  );

  // Build the websocket URL to connect to the Qlik Sense applicaiton
  const url = `wss://${config.tenantDomain}/app/${
    config.appId
  }?qlik-web-integration-id=${
    config.qlikWebIntegrationId
  }&qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}`;

  // Fetch the schema for communicating with Qlik's engine API
  const schema = await (
    await fetch("https://unpkg.com/enigma.js/schemas/3.2.json")
  ).json();

  // Create Qlik engine session
  const session = window.enigma.create({ schema, url });

  // Open the application
  const app = await (await session.open()).openDoc(config.appId);

  const themeFile = await await fetch("theme/horizon").then((response) =>
    response.json()
  );
  console.log(themeFile);

  // Create embed configuration
  const nuked = window.stardust.embed(app, {
    themes: [
      {
        id: "horizon",
        load: () =>
          Promise.resolve({
            //fontFamily: "Arial, sans-serif",
            palettes: {
              data: [
                {
                  scale: themeFile.theme.palettes.data[1].scale
                }
              ]
            }
          })
      }
    ],
    context: { theme: "horizon" },
    types: [
      {
        name: "mekko",
        load: () => Promise.resolve(window["sn-mekko-chart"])
      },
      {
        name: "barchart",
        load: () => Promise.resolve(window["sn-bar-chart"])
      }
    ]
  });

  // render viz
  nuked.render({
    element: document.querySelector("#mekko"),
    type: "mekko",
    fields: ["Country", "CategoryName", "=Sum([Sales])"]
  });

  nuked.render({
    element: document.querySelector("#bar"),
    id: "19194cab-989b-49d4-822a-106b1b9d597a"
  });

  (await nuked.selections()).mount(document.querySelector(".curr-selections"));
})();
