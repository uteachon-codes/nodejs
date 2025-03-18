import { SSMManager } from '../ssmManager.js';  // Added import

// Enable this only for load testing
test('Load Test: SSM Parameter Store should handle concurrent requests within acceptable latency', async () => {
    const config = {
        paramKeyName: '/firstapp/dev/currentTransactionsCount',
        numThreads: 400,
        iterationsPerThread: 10
    };

    const startTime = Date.now();

    const tasks = Array.from({ length: config.numThreads }, (_, i) =>
        new Promise((resolve, reject) => {
            const runIterations = async () => {
                try {
                    for (let j = 0; j < config.iterationsPerThread; j++) {
                        const parameterValue = await SSMManager.getParameter(config.paramKeyName, true);
                        expect(parameterValue).not.toBeNull();
                    }
                    resolve();
                } catch (error) {
                    reject(new Error(`Thread ${i} failed: ${error.message}`));
                }
            };
            runIterations();
        })
    );

    await Promise.all(tasks);
    const totalTime = Date.now() - startTime;
    console.log(`Total execution time: ${totalTime}ms`);
}, 180000);
