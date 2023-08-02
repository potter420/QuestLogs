import { userManager } from '$lib/stores/userStore';
import { S3Client } from '@aws-sdk/client-s3';
import { AssumeRoleWithWebIdentityCommand, STSClient } from '@aws-sdk/client-sts';
import type { User } from 'oidc-client-ts';
// Set the AWS Region.
export const DEFAULT_REGION = 'ap-southeast-1';
// Create an AWS STS service client object.
export const client = new STSClient({ region: DEFAULT_REGION });

export const assumeRoleCommand = (user: User) => new AssumeRoleWithWebIdentityCommand({
    // The Amazon Resource Name (ARN) of the role to assume.
    RoleArn: 'arn:aws:iam::346695688583:role/AllowS3Access',
    // An identifier for the assumed role session.
    RoleSessionName: user.profile.email,
    // The duration, in seconds, of the role session. The value specified
    // can range from 900 seconds (15 minutes) up to the maximum session
    // duration set for the role.
    DurationSeconds: user.expires_in,
    WebIdentityToken: user.id_token
});

export async function getS3Client() {
    const user = await userManager.getUser();
    if (!(user && !user.expired)) {
        return null;
    }
    return await client.send(assumeRoleCommand(user)).then(role => {
        return {
                s3Client: new S3Client({
                region: DEFAULT_REGION,
                credentials: {
                    accessKeyId: role.Credentials?.AccessKeyId || '',
                    secretAccessKey: role.Credentials?.SecretAccessKey || '',
                    sessionToken: role.Credentials?.SessionToken || ''
                }
            }), user: user 
        };
    }).catch(err => {
        console.log(err)
        return null;
    });

}