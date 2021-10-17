export const connectIframe = async (config, csrfTokenInfo) => {
  const iframeSrc = `https://${config.tenantDomain}/single/?appid=${config.appId}
  &obj=Tsmvffe&opt=ctxmenu,currsel
  &qlik-web-integration-id=${config.qlikWebIntegrationId}
  &qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}`
  
  return { iframeSrc }
}