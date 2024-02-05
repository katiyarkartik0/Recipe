const HOSTED_SERVER_ENDPOINT = "https://recipe-13ct.onrender.com"

let ENDPOINT = "";
if (process.env.NODE_ENV === "production") {
  ENDPOINT = HOSTED_SERVER_ENDPOINT;
} else if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://localhost:3001";
}

export default ENDPOINT;