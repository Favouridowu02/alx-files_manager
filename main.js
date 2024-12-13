import { redisClient } from "./utils/redis";
import { RedisClient } from "./utils/redis";

console.log(RedisClient, '\n\n');
(async () => {
    console.log('I am here\n\n');
    console.log(redisClient);
    console.log(redisClient.isAlive());
    console.log(await redisClient.get('myKey'));
    await redisClient.set('myKey', 12, 5);
    console.log(await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log(await redisClient.get('myKey'));
    }, 1000*10);
})();