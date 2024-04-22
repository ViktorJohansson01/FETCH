/**
 * @author Viktor Johansson
 * @description Routes for the API
 * @module data-access/routes
 */

import createFetch from './fetch.js';

const MIC_CHECK_API = "https://api-test.tech4care.eu/mic-check";

const makeFetch = createFetch().makeFetch;

/**
 * @description Object with all Login routes
 */
const loginRoutes = {
  signIn: async ({ headers, body }) => await makeFetch({
      path: MIC_CHECK_API + `/login/api/v1/auth/sign-in`,
      body,
      headers,
      method: "GET",
    }),
  advancedSignIn: async ({ headers, body, accountId }) => await makeFetch({
    path: MIC_CHECK_API + `/login/api/v1/auth/sign-in/${accountId}`,
    body,
    headers,
    method: "GET",
  }),
  signUp: async ({ headers, body }) => await makeFetch({
    path: MIC_CHECK_API + `/login/api/v1/auth/sign-up`,
    body,
    headers,
    method: "POST",
  }),
  resetPassword: async ({ headers, body }) => await makeFetch({
    path: MIC_CHECK_API + `/login/api/v1/credential/forgotPassword`,
    body,
    headers: { Authorization: bearerToken, ...headers },
    method: "POST",
  }),
}

/**
 * @description Object with Drug routes
 */
const drugRoutes = {
  drugList: async ({ headers, body, query, accountId }) => await makeFetch({
    path: MIC_CHECK_API + `/residenzeaperte/api/v1/drug/general/search/goal/${accountId}${query && `?${query}`}`,
    body,
    headers,
    method: "GET",
  }),
  drugListNeeded: async ({ headers, body, query, accountId }) => await makeFetch({
    path: MIC_CHECK_API + `/residenzeaperte/api/v1/drug/general/needed/${accountId}${query && `?${query}`}`,
    body,
    headers,
    method: "GET",
  }),
  setActivityStatus: async ({ headers, body }) => await makeFetch({
    path: MIC_CHECK_API + `/residenzeaperte/api/v1/goal/general${query && `?${query}`}`,
    body,
    headers,
    method: "PUT",
  }),
  drugInteraction: async ({ headers, body, accountId, query }) => await makeFetch({
    path: MIC_CHECK_API + `/residenzeaperte/api/v1/drug/general/checkInteraction/${accountId}${query && `?${query}`}`,
    body,
    headers,
    method: "GET",
  }),
  getMyProfile: async ({ headers, body }) => await makeFetch({
    path: MIC_CHECK_API + `/login/api/v1/personal/myInfo`,
    body,
    headers,
    method: "GET",
  }),
  setMyProfile: async ({ headers, body }) => await makeFetch({
    path: MIC_CHECK_API + `/login/api/v1/personal/myInfo`,
    body,
    headers,
    method: "PUT",
  }),
}

const APIRoutes = Object.freeze({
  ...loginRoutes,
  ...drugRoutes,
});

export default APIRoutes;