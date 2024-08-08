# AWS RDS Aurora Cluster restore from Snapshot in AWS CDK

- [`DatabaseClusterFromSnapshot`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds.DatabaseClusterFromSnapshot.html)
```typescript
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
```
