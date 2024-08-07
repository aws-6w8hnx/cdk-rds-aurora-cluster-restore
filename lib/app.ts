#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { rdsAuroraClusterRestore } from './cdk-rds-aurora-cluster-restore-stack';

const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }

const app = new cdk.App();

const rds_aurora_stack = new rdsAuroraClusterRestore (app, 'cdk-rds-aurora-cluster-restore-stack', {
  env,
});
cdk.Tags.of(rds_aurora_stack).add('auto-delete', 'no');
cdk.Tags.of(rds_aurora_stack).add('managedBy', 'cdk');
cdk.Tags.of(rds_aurora_stack).add('environment', 'dev');
