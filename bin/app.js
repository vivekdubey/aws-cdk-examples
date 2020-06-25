#!/usr/bin/env node
const cdk = require('@aws-cdk/core');
const { EcsSharedAlbStack } = require('../lib/ecs-shared-alb-stack');
const config = require('../configs/example.json');
try {
    const app = new cdk.App();
    new EcsSharedAlbStack(app, 'EcsSharedAlbStack', config); 
} catch (error) {
   console.log(error);
   process.exit(1);
}