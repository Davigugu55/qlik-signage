export const nebConnect = async (config, csrfToken) => {
  // 4) setup socket connection to Qlik Application
  const url = `wss://${tenantDomain}/app/${appId}?qlik-web-integration-id=${qlikWebIntegrationId}&qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}`;
  
  
  // 5) fetch schema for communicating with Qlik's engine API
  const schema = await (
    await fetch("https://unpkg.com/enigma.js/schemas/12.936.0.json")
  ).json();
  
  // 6) create qlik engine session
  const session = window.enigma.create({ schema, url });
  
  // 7) open the app
  const app = await (await session.open()).openDoc(appId);
}