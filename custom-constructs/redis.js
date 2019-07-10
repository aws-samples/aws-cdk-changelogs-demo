const cdk = require('@aws-cdk/core');
const elasticache = require('@aws-cdk/aws-elasticache');
const ec2 = require('@aws-cdk/aws-ec2');

class RedisCluster extends cdk.Construct {
  constructor(scope, id, props) {
    super(scope, id);

    const targetVpc = props.vpc;

    // Define a group for telling Elasticache which subnets to put cache nodes in.
    this.subnetGroup = new elasticache.CfnSubnetGroup(this, `${id}-subnet-group`, {
      cacheSubnetGroupName: `${id}-subnet-group`,
      description: `List of subnets used for redis cache ${id}`,
      subnetIds: targetVpc.privateSubnets.map(function(subnet) {
        return subnet.subnetId;
      })
    });

    // The security group that defines network level access to the cluster
    this.securityGroup = new ec2.SecurityGroup(this, `${id}-security-group`, { vpc: targetVpc });

    this.connections = new ec2.Connections({
      securityGroups: [this.securityGroup],
      defaultPort: ec2.Port.tcp(6379)
    });

    // The cluster resource itself.
    this.cluster = new elasticache.CfnCacheCluster(this, `${id}-cluster`, {
      cacheNodeType: 'cache.t2.micro',
      engine: 'redis',
      numCacheNodes: 1,
      autoMinorVersionUpgrade: true,
      cacheSubnetGroupName: this.subnetGroup.cacheSubnetGroupName,
      vpcSecurityGroupIds: [
        this.securityGroup.securityGroupId
      ]
    });

    this.cluster.addDependsOn(this.subnetGroup);
  }
}

module.exports = {
  Cluster: RedisCluster
};
