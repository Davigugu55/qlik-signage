const loginTypes = {
  INTERACTIVE_LOGIN: 'interactive-login',
  JWT_LOGIN: 'jwt-login'
}

module.exports = {
  loginTypes,
  currentLoginType: loginTypes.JWT_LOGIN,
  
  // app config 
  qlikWebIntegrationId: process.env.QLIKWEBINTEGRATIONID,
  tenantDomain: process.env.TENANTDOMAIN,
  appId: process.env.APPID,
  
  // token config
  issuer: process.env.ISSUER,
  keyid: process.env.KEYID
};
