const cdk = require('@aws-cdk/core');
const ecs = require('@aws-cdk/aws-ecs');
const elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');
const ec2 = require('@aws-cdk/aws-ec2');
const Joi = require('joi');

const propsSchema = Joi.object({
  env: Joi.object().optional(),
  listenerArn: Joi.string().required(),
  vpcId: Joi.string().required(),
  securityGroupId: Joi.string().required(),
  containerPort: Joi.number().integer().required().strict(),
  containerMemoryMB: Joi.number().integer().required().strict(),
  hostName: Joi.string().required(),
  clusterName: Joi.string().required()
});

class EcsSharedAlbConstruct extends cdk.Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    const { error, value } = propsSchema.validate(props);
    if(error) {throw error.details }
    const { listenerArn, vpcId, securityGroupId, containerPort, containerMemoryMB, hostName, clusterName} = props;
    const vpc = ec2.Vpc.fromLookup(this, 'MyExistingVPC', { vpcId: vpcId });
    const cluster = ecs.Cluster.fromClusterAttributes(this, 'ClusterToDeploy', { clusterName: clusterName } );
    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef');
    const defaultContainer = taskDefinition.addContainer('DefaultContainer', {
        image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
        memoryLimitMiB: containerMemoryMB,
      });
    defaultContainer.addPortMappings({containerPort: containerPort });
    const ecsService = new ecs.Ec2Service(this, 'Service', {
        cluster,
        taskDefinition,
    });
    const targetGroup = new elbv2.ApplicationTargetGroup(this, "myServiceTargetGroup", {
      vpc: vpc,
      port: containerPort,
      targets: [ecsService]
    });
    
    const securityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, 'sharedListnerSG', securityGroupId); 
    const sharedListerner = elbv2.ApplicationListener.fromApplicationListenerAttributes(this, 'sharedListener', {listenerArn, securityGroup});
    sharedListerner.addTargetGroups('myService', {
      hostHeader: hostName,
      priority: 1,
      targetGroups: [targetGroup]
    });
  }
}

module.exports = { EcsSharedAlbConstruct }