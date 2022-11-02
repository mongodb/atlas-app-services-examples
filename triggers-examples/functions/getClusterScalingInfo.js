function getClusterScalingInfo() {
  // Get stored API credentials
  const username = context.environment.values["ATLAS_PUBLIC_KEY"];
  const password = context.values.get("APP_SECRET_PRIVATE_API_KEY");

  // Get cluster information
  const projectId = context.environment.values["CLUSTER_PROJECT_ID"];
  const clusterName = context.environment.values["CLUSTER_NAME"];
  const clusterProvider = context.environment.values["CLUSTER_PROVIDER"];
  const scaleUpInstanceSize =
    context.environment.values["CLUSTER_SCALE_UP_INSTANCE_SIZE"];
  const scaleDownInstanceSize =
    context.environment.values["CLUSTER_SCALE_UP_INSTANCE_SIZE"];
  return {
    username,
    password,
    projectId,
    clusterName,
    clusterProvider,
    scaleUpInstanceSize,
    scaleDownInstanceSize,
  };
}

exports = getClusterScalingInfo;
