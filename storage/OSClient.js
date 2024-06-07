// const { fromEnv } = require("@aws-sdk/credential-provider-env"); // V3 SDK.
const { Client } = require("@opensearch-project/opensearch");

const OSClient = async () => {
  return new Client({
    auth: {
      username: "admin",
      password: "admin",
    },
    node: "https://127.0.01:9200", // OpenSearch domain URL
  });
};

module.exports = OSClient;
