async function scaleUpCluster() {
  // Get scaling information
  const {
    username,
    password,
    projectId,
    clusterName,
    clusterProvider,
    scaleUpInstanceSize,
  } = context.functions.execute("getClusterScalingInfo");

  // Execute Atlas Function scaleCluster with the scaling up information
  const res = await context.functions.execute(
    "scaleCluster",
    username,
    password,
    projectId,
    clusterName,
    clusterProvider,
    scaleUpInstanceSize
  );
  console.log(JSON.stringify(res));
}

exports = scaleUpCluster;
