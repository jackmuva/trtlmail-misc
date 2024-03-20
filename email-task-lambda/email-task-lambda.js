import * as AWS from "@aws-sdk/client-ecs";

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
    var ecs = new AWS.ECS({region: ecsRegion});
    ecs.updateService(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            context.succeed();
        }
    });
};