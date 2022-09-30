async function scaleDownCluster() {
  // Get scaling information
  const {
    username,
    password,
    projectId,
    clusterName,
    clusterProvider,
    scaleDownInstanceSize,
  } = context.functions.execute("getClusterScalingInfo");

  // Execute Atlas Function scaleCluster with the scaling up information
  const res = await context.functions.execute(
    "scaleCluster",
    username,
    password,
    projectId,
    clusterName,
    clusterProvider,
    scaleDownInstanceSize
  );
  console.log(JSON.stringify(res));
}

exports = scaleDownCluster;
