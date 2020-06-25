# AWS CDK example for ECS service with shared AWS ALB.

This is an example of a CDK stack which creates ECS Service and adds the target group to a shared Application Load Balancer.

## Summary of resources in the stack:
- Pre-Existing Resources:
    - Shared ALB: ALB to be shared by several other services.
    - Shared Listener: Target group of the new service to be added for traffic routing.
    - ECS cluster already created.
    - EC2 based container service. It could work well with fargate service as well.

- New Resources to get created:
    - ECS service.
    - Taskdefinition: as per configs/example.json
    - TargetGroup: To be added to shared listener for traffic routing.
    
## How to use the example?
- Replace dummy values in `configs/example.json` as per requirements. 
- Update task-definition as per your requirements. [Follow docs](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-ecs-readme.html)
- Run `cdk synth`
## Useful commands

 * `npm run test`         perform the jest unit tests
 * `cdk deploy`           deploy this stack to your default AWS account/region
 * `cdk diff`             compare deployed stack with current state
 * `cdk synth`            emits the synthesized CloudFormation template
