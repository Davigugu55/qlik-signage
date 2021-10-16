const loginTypes = {
  PROVIDE_CREDENTIALS: 'provide-credentials',
  AUTOMATIC_LOGIN: 'automatic-login'
}

module.exports = {
  loginTypes,
  currentLoginType: loginTypes.AUTOMATIC_LOGIN,
  
  // app config 
  qlikWebIntegrationId: "NjFhqVVmulrrkb30ksf6C-WE4Pl3xxVP",
  tenantDomain: "incognito.us.qlikcloud.com",
  appId: "bc97609f-523b-4fe9-91f6-78aa0bd1b989",
  
  // token config
  issuer: "incognito.us.qlikcloud.com",
  keyid: "08c9752e-ba12-482c-85fb-d760c576b6a0"
};
