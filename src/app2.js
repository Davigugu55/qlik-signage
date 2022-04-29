var config = {
  host: 'incognito.us.qlikcloud.com',
  prefix: '/',
  webIntegrationId: 'NjFhqVVmulrrkb30ksf6C-WE4Pl3xxVP',
};
require.config({
  baseUrl: `https://${config.host}/resources`,
  webIntegrationId: config.webIntegrationId,
});

function loadQlik() {
  return new Promise((resolve, reject) => {
    require(['js/qlik'], (qlik) => resolve(qlik));
  });
}

async function init(){
  await loadQlik();
}

init();