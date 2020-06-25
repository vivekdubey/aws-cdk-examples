const cdk = require('@aws-cdk/core');
const { EcsSharedAlbConstruct } = require('./ecs-shared-alb-construct');

class EcsSharedAlbStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    try {
      new EcsSharedAlbConstruct(this, 'MyEcsService', props);
    } catch (error) {
      throw error;
    } 
  }
}

module.exports = { EcsSharedAlbStack }