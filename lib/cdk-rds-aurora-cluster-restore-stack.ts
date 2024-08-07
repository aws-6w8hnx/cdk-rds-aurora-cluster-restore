import * as cdk from 'aws-cdk-lib';
import { InstanceClass, InstanceSize, InstanceType, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { AuroraEngineVersion, AuroraPostgresEngineVersion, ClusterInstance, DatabaseClusterEngine, DatabaseClusterFromSnapshot, DatabaseInstanceEngine, DatabaseInstanceFromSnapshot, PostgresEngineVersion } from 'aws-cdk-lib/aws-rds';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';



export class rdsAuroraClusterRestore extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'vpc', {
      subnetConfiguration: [
        {
          cidrMask: 28,
          name: 'db',
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ]
    })

    new DatabaseClusterFromSnapshot(this, 'cluster', {
      snapshotIdentifier: 'aurora-posgress-test-snapshot',
      engine: DatabaseClusterEngine.auroraPostgres({ version: AuroraPostgresEngineVersion.VER_15_5 }),
      // optional, defaults to m5.large
      writer: ClusterInstance.provisioned('writer', {
        instanceType: new InstanceType("t3.medium"),
      }),
      readers: [
        ClusterInstance.provisioned('reader', {
          instanceType: new InstanceType("t3.medium"),
        }),
      ],
      vpc,
      vpcSubnets: { subnetType: SubnetType.PRIVATE_ISOLATED },
      storageEncrypted: true,
      cloudwatchLogsExports: ["postgresql"],
      cloudwatchLogsRetention: RetentionDays.ONE_DAY,
    });
  }
}
