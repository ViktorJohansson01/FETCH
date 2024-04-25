/**
 * @author Viktor Johansson
 * @description Helper functions for the API
 * @module data-access/routes
 */

import APIRoutes from './routes.js';

let accountId;
let bearerToken;
let basicToken;

function base64Encode(input) {
  return Buffer.from(input, 'utf-8').toString('base64');
}

const setBasicToken = ({ username, password }) => basicToken = `Basic ${base64Encode(username + ":" + password)}`;

const setBearerToken = (token) => bearerToken = "Bearer " + token;
const setAccountId = (id) => accountId = id;

const headers = {};

/**
 * @description Object with all Login routes
 */
const loginRoutes = {
  authorize: async ({ username, password }) => {
    setBasicToken({ username, password });

    headers.Authorization = basicToken;
    const signinResponse = await APIRoutes.signIn({ headers });
    if (!signinResponse.error) {
      const { id, customerRoleDto } = signinResponse[0];
      if (!id || !customerRoleDto) {
        throw new Error("No account ID found");
      }
      console.log(bearerToken);
      setAccountId(id);

      const advancedResponse = await APIRoutes.advancedSignIn({ headers, accountId });
      if (!advancedResponse.error) {
        setBearerToken(advancedResponse);
        console.log(bearerToken);
        return "Logged in successfully";
      }
    }

    throw new Error("Authorization failed");
  },
  signUp: async ({ body }) => {
    const signUpResponse = await APIRoutes.signUp({ body });
    if (!signUpResponse.error) {
      console.log(signUpResponse);
      return "Signed up successfully";
    }
    throw new Error("Sign Up failed");
  },
  resetPassword: async ({ body }) => { //Need username in body
    headers.Authorization = bearerToken;
    const resetPasswordResponse = await APIRoutes.resetPassword({ body });
    if (!resetPasswordResponse.error) {
      console.log(resetPasswordResponse);
      return "Reset password successfully";
    }
    throw new Error("Reset password failed");
  },
}

/**
 * @description Object with Drug routes
 */
const drugRoutes = {
  drugList: async ({ date, startTime, endTime }) => {
    headers.Authorization = bearerToken;
    const query = `date=${date}&startTime=${startTime}&endTime=${endTime}`;
    const drugListResponse = await APIRoutes.drugList({ headers, query, accountId });
    if (!drugListResponse.error) {
      console.log(drugListResponse);
      return drugListResponse;
    }
    throw new Error("Failed to get drug list");
  },
  drugListNeeded: async ({ offset, limit, date, startTime, endTime }) => {
    headers.Authorization = bearerToken;
    const query = `offset=${offset}&limit=${limit}&date=${date}&startTime=${startTime}&endTime=${endTime}`;
    const drugListNeededResponse = await APIRoutes.drugListNeeded({ headers, query });
    if (!drugListNeededResponse.error) {
      return drugListNeededResponse;
    }
    throw new Error("Failed to get drug list needed");
  },
  setActivityStatus: async ({ activityStatus, activityType }) => {
    headers.Authorization = bearerToken;
    const query = `status=${activityStatus}&type=${activityType}`;
    const setActivityStatusResponse = await APIRoutes.setActivityStatus({ headers, query });
    if (!setActivityStatusResponse.error) {
      return setActivityStatusResponse;
    }
    throw new Error("Failed to set activity status");
  },
  drugInteraction: async ({ medicationIds }) => {
    headers.Authorization = bearerToken;
    const query = `medicationIds=${medicationIds}&jsonFormat=true`;
    const drugInteractionResponse = await APIRoutes.drugInteraction({ headers, query });
    if (!drugInteractionResponse.error) {
      return drugInteractionResponse;
    }
    throw new Error("Failed to get drug interaction");
  },
  getMyProfile: async () => {
    headers.Authorization = bearerToken;
    const myProfileResponse = await APIRoutes.getMyProfile({ headers });
    if (!myProfileResponse.error) {
      return myProfileResponse;
    }
    throw new Error("Failed to get my profile");
  },
  setMyProfile: async ({ body }) => {
    headers.Authorization = bearerToken;
    console.log(bearerToken);
    const setProfileResponse = await APIRoutes.setMyProfile({ headers, body });
    if (!setProfileResponse.error) {
      return setProfileResponse;
    }
    throw new Error("Failed to update my profile");
  },
}

const API = Object.freeze({
  ...loginRoutes,
  ...drugRoutes,
});

export default API;