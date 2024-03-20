import { ECSClient, UpdateServiceCommand } from "@aws-sdk/client-ecs";

export const handler = async (event, context) => {
    // stop all taks
    var ecsRegion = 'us-east-1';
    if(event.status == 'stop'){
        var params = {
            cluster: event.ECS_CLUSTER,
            service: event.ECS_SERVICE_NAME,
            desiredCount: 0
        };
    }
    else{
        // otherwise : start one task
        var params = {
            cluster: event.ECS_CLUSTER,
            service: event.ECS_SERVICE_NAME,
            desiredCount: 1
        };
    }
    const client = new ECSClient(config);
    const command = new UpdateServiceCommand(params);
    const response = await client.send(command).then(() => {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            context.succeed();
        }
    });
};