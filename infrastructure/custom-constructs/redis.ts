import { Construct } from 'constructs';              // core constructs
import { aws_elasticache as elasticache } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';

export interface RedisClusterProps {
  vpc: ec2.Vpc;
}

// This is a custom construct that creates a Redis cache in a
// VPC's public subnet. It also sets up a security group for
// allowing or blocking access to the cluster.
export class RedisCluster extends Construct {
  public securityGroup: ec2.SecurityGroup;
  public connections: ec2.Connections;
  public cluster: elasticache.CfnCacheCluster;

  constructor(scope: Construct, id: string, props: RedisClusterProps) {
    super(scope, id);

    const targetVpc = props.vpc;

    // Define a group for telling Elasticache which subnets to put cache nodes in.
    const subnetGroup = new elasticache.CfnSubnetGroup(this, `${id}-subnet-group`, {
      description: `List of subnets used for redis cache ${id}`,
      subnetIds: targetVpc.publicSubnets.map(function (subnet) {
        return subnet.subnetId;
      })
    });

    // The security group that defines network level access to the cluster
    this.securityGroup = new ec2.SecurityGroup(this, `${id}-security-group`, { vpc: targetVpc });

    this.connections = new ec2.Connections({
      securityGroups: [this.securityGroup],
      defaultPort: ec2.Port.tcp(6379),
    });

    // The cluster resource itself.
    this.cluster = new elasticache.CfnCacheCluster(this, `${id}-cluster`, {
      cacheNodeType: 'cache.t2.micro',
      engine: 'redis',
      numCacheNodes: 1,
      autoMinorVersionUpgrade: true,
      cacheSubnetGroupName: subnetGroup.ref,
      vpcSecurityGroupIds: [
        this.securityGroup.securityGroupId
      ]
    });
  }
}
