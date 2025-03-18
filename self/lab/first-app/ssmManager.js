import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

export class SSMManager {
    static async getParameter(name, decrypt) {
        const client = new SSMClient({ region: 'us-east-1' });
        try {
            return await this.getParameterFromStore(client, name, decrypt);
        } finally {
            await client.destroy();
        }
    };    
    
    static async getParameterFromStore(client, name, decrypt) {
        const maxRetries = 10;
        let backoffMillis = 1000;
        let retryCount = 0;
       
        while (retryCount < maxRetries) {
            try {
                const response = await client.send(new GetParameterCommand({
                    Name: name,
                    WithDecryption: decrypt
                }));
                return response.Parameter.Value;
            } catch (err) {
                if (err?.__type === "ThrottlingException") {
                    if (retryCount === maxRetries - 1) {
                        throw new Error(`Max retries (${maxRetries}) reached for parameter ${name}`);
                    }
                    retryCount++;
                    backoffMillis *= 2;
                    await new Promise(resolve => setTimeout(resolve, backoffMillis));
                } else {
                    throw err;
                }
            }
        }
    }
}