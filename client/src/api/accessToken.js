import { ENDPOINT } from "constants";

export const destroyAccessToken = async ({ accessToken }) =>
  await fetch(`${ENDPOINT}/api/accessToken/destroy`, {
    method: "DELETE",
    headers: { authorization: `OAT ${accessToken}` },
  });
