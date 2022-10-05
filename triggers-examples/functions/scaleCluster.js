// Note: You must use an HTTP client that supports HTTP digest authentication,
// the authentication method used by the Atlas Admin API.
// Certain JavaScript HTTP clients, like Axios, do not support digest authentication.
async function scaleCluster(
  username,
  password,
  projectId,
  clusterName,
  clusterProvider,
  scaleInstanceSize
) {
  const headers = {
    "Content-Type": ["application/json"],
    "Accept-Encoding": ["bzip, deflate"],
  };

  // Set the request body
  const body = {
    providerSettings: {
      providerName: clusterProvider,
      instanceSizeName: scaleInstanceSize,
    },
  };

  const arg = {
    scheme: "https",
    host: "cloud.mongodb.com",
    path: "api/atlas/v1.0/groups/" + projectId + "/clusters/" + clusterName,
    username: username,
    password: password,
    headers,
    // Must set `digestAuth: true` as the Atlas API uses HTTP digest authentication
    digestAuth: true,
    body: JSON.stringify(body),
  };
  const response = await context.http.patch(arg);
  return EJSON.parse(response.body.text());
}

exports = scaleCluster;
