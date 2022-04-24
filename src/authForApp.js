const { Auth, AuthType } = require("@qlik/sdk");

export const authy = async () => {
  const shouldLoginBox = document.querySelector("#should-login-box");
  const loginLink = shouldLoginBox.querySelector("a");

  // 1) get config
  const {
    tenantDomain,
    qlikWebIntegrationId,
    appId,
    objId,
    currentLoginType,
    loginTypes,
  } = await fetch("config").then((resp) => resp.json());
  const remoteConfig = {
    tenantDomain,
    qlikWebIntegrationId,
    appId,
    objId,
    currentLoginType,
    loginTypes,
  };
  // 2) get logged in
  if (currentLoginType === loginTypes.JWT_LOGIN) await handleAutomaticLogin();
  else if (currentLoginType === loginTypes.INTERACTIVE_LOGIN)
    await handleUserLogin();

  // 2.1) login, in order to save some credentials in browser storage
  //    we are going to need these for next api calls like getting CSRF token

  async function handleAutomaticLogin() {
    const config = {
      host: tenantDomain,
      authType: AuthType.JWTAuth,
      webIntegrationId: qlikWebIntegrationId,
      fetchToken: async () => {
        return await fetch("token").then((resp) => resp.json());
      },
    };
    async function start(auth) {
      await auth.getSessionCookie();
      await auth.rest("/users/me").then((resp) => {
        console.log(resp);
      });
    }
    try {
      const auth = new Auth(config);
      console.log(auth);
      start(auth);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUserLogin() {
    const response = await fetch(`https://${tenantDomain}/api/v1/csrf-token`, {
      credentials: "include",
      headers: { "qlik-web-integration-id": qlikWebIntegrationId },
    });

    if (response.status === 401) {
      shouldLoginBox.style.display = "block";

      const loginUrl = new URL(`https://${tenantDomain}/login`);
      loginUrl.searchParams.append("returnto", window.location.href);
      loginUrl.searchParams.append(
        "qlik-web-integration-id",
        qlikWebIntegrationId
      );

      loginLink.href = loginUrl.href;
    }
  }

  // 3) get CSRF token
  const csrfTokenInfo = await await fetch(
    `https://${tenantDomain}/api/v1/csrf-token?qlik-web-integration-id=${qlikWebIntegrationId}`,
    {
      credentials: "include",
      headers: {
        "Qlik-Web-Integration-ID": qlikWebIntegrationId,
      },
    }
  );

  // 8) if we reached in this step with out any error, try to remove the helper box
  shouldLoginBox.style.display = "none";

  return { remoteConfig, csrfTokenInfo };
};

/*



const config = {
  host: 'your-tenant',
  authType: AuthType.JWTAuth,
  webIntegrationId: 'webIntegration...',
  fetchToken: () => {
    return fetch('your_backend/serverless/token')
      .then((resp) => resp.json())
      .then((res) => res.token);
    },
  };
  async function start(auth) {
    await auth.getSessionCookie();
    await auth.rest('/users/me').then((resp) => {
      console.log(resp);
    });
  }
  try {
    const auth = new Auth(config);
    console.log(auth);
    start(auth);
  } catch (err) {
    console.log(err);
  }




*/
