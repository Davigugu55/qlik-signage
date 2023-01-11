# "Authorize Users with JWTs for Qlik Embedded" - Authorization and Embedding Examples


> :sparkles: Updated: October 2021<br>
:sparkles: Published: October 2021

This is code used in the tutorial [Implement JWT Authorization](https://qlik.dev//tutorials/implement-jwt-authorization) on [qlik.dev](https://qlik.dev).

---


By authorizing users with JWTs, you can embed analytics from Qlik into your own web applications using your host application's access control model.

## Adding authorization to Qlik tenants and web applications using JWTs and JavaScript

| ![JWT icon](https://cdn.glitch.me/221a8c3a-1294-4afa-8416-98d7a157298e%2Fjwt_64px.png?1634489478634) | ![JavaScript icon](https://cdn.glitch.me/221a8c3a-1294-4afa-8416-98d7a157298e%2F64px-JavaScript-logo.png?1634489478633) | ![Qlik logo](https://cdn.glitch.me/221a8c3a-1294-4afa-8416-98d7a157298e%2Fthumbnails%2FQlik-Logo_CMYK_64.png?1634489478670) |
| --- | --- | --- |

### Developer Use-Cases

If you are developing apps that integrate analytics, this sample is going to accelerate rendering analytics content based on your use case.

Upon implementing JWT authorization to Qlik, there are a number of ways to add embedded content:

* JavaScript embedded visualization using nebula.js
* iframe embedded visualization using the single API
* Connect to REST endpoints when you need to in your web application front-end

### User Work Flow

When you add authorization to Qlik using JWTs the goal is to abstract away the login experience to a Qlik Cloud tenant.
As a developer the last thing you want is to have an end user redirected to an interactive login
when the solution is embedded. JWT authorization enables users to have a seamless experience with embedded Qlik content.

## Setup

### Qlik Cloud tenant

1. Obtain access to a Qlik Cloud Enterprise tenant with JWT authorization capabilities.
2. Complete the tutorial for [creating signing keys and configuring JWT authorization](https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization) on the tenant.

#### Remix this project

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/qlik-cloud-jwt)