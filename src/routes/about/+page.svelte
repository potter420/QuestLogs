<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { userManager } from '$lib/stores/userStore';
	import { DEFAULT_REGION, assumeRoleCommand, client } from '$lib/aws/client';
    import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
    import { Marked } from '@ts-stack/markdown';
    import LayoutGrid, { Cell } from '@smui/layout-grid';

    async function onClick() {
        let user = await userManager.getUser();
        if (user == null) {
            return;
        }
        const assumedRole = await client
        .send(assumeRoleCommand(user))
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
        if (assumedRole == null) {
            return;
        }
        const s3Client = new S3Client({
            region: DEFAULT_REGION,
            credentials: {
                accessKeyId: assumedRole.Credentials?.AccessKeyId || '',
                secretAccessKey: assumedRole.Credentials?.SecretAccessKey || '',
                sessionToken: assumedRole.Credentials?.SessionToken || '',
            },
        });
        const command = new PutObjectCommand({
            Bucket: 'journal-content',
            Key: `${user.profile.sub}/test.txt`,
            Body: content,
        });
        await s3Client.send(command).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        // window.location.assign("/")
    }
    let content = '';
    function setContent(c: string) {
        content = c;
    }
 
</script>


<LayoutGrid class="mainEditor">
    <Cell span={6}>
        <MarkdownEditor setContent={setContent}/>
    </Cell>
    <Cell span={6}>
        <div id="preview">
            {@html Marked.parse(content)}
        </div>
    </Cell>
</LayoutGrid>
<Button on:click={onClick} variant="raised">
	<Label>Submit</Label>
</Button>
<style>
    #preview {
        height: 29vh;
        overflow: auto;
    }
</style>


