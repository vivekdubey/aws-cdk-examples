const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const { EcsSharedAlbStack } = require('../lib/ecs-shared-alb-stack');;
const config = require('./data/example-config.json');
const testStack = require('./data/test-stack.json'); 

test('Sample Resources in Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new EcsSharedAlbStack(app, 'MyTestStack', config);
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": testStack.Resources
    }, MatchStyle.EXACT))
});
