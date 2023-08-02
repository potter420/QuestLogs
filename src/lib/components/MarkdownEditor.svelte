<script lang="ts">
    import type monaco from 'monaco-editor';
    import { onMount } from 'svelte';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    // @ts-ignore
    let divEl: HTMLDivElement = null;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco;
    export let setContent: (content: string) => void;

    // @ts-ignore
    onMount(async () => {
        // @ts-ignore
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                return new editorWorker();
            }
        };

        Monaco = await import('monaco-editor');
        editor = Monaco.editor.create(divEl, {
            value: "",
            language: 'markdown',
        });
        editor.onDidChangeModelContent((e) => {
            setContent(editor.getValue());
        });

        return () => {
            editor.dispose();
        };
    });
</script>

<div bind:this={divEl} class="editor" />

<style>
    .editor {
        width: 90%;
        height: 29vh;
    }
</style>