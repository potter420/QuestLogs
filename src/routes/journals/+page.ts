import { checkAuthenticated, userManager } from "$lib/stores/userStore";
import { assumeRoleCommand, client, DEFAULT_REGION } from "$lib/aws/client";
import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";

export async function load() {
    const user = await userManager.getUser();
    if (!(user && !user.expired)) {
        return {
            list:[]
        }
    }
    const role = await client.send(assumeRoleCommand(user))
    const s3Client = new S3Client({
        region: DEFAULT_REGION,
        credentials: {
            accessKeyId: role.Credentials?.AccessKeyId || '',
            secretAccessKey: role.Credentials?.SecretAccessKey || '',
            sessionToken: role.Credentials?.SessionToken || ''
        }
    });
    const list = await s3Client.send(new ListObjectsCommand({
        Bucket: 'journal-content',
        Prefix: `${user.profile.sub}`
    }))
    return {
        list: list.Contents?.map(item => item.Key?.substring(user.profile.sub.length + 1)) || []
    }
}