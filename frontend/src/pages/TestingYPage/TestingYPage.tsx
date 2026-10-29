
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import type { editor as MonacoEditor } from "monaco-editor";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MonacoBinding } from "y-monaco";

export default function InterviewPage() {
    const [editor, setEditor] = useState<
        MonacoEditor.IStandaloneCodeEditor | null
    >(null);

    const [status, setStatus] = useState("connecting");

    useEffect(() => {
        if (!editor) return;

        const model = editor.getModel();
        if (!model) return;

        const doc = new Y.Doc();
        const text = doc.getText("code");

        const provider = new HocuspocusProvider({
            url: "ws://localhost:4001",
            name: "monaco-test",
            document: doc
        });

        const binding = new MonacoBinding(
            text,
            model,
            new Set([editor]),
            provider.awareness ?? undefined
        );

        const handleStatus = (event: { status: string }) => {
            setStatus(event.status);
        };

        provider.on("status", handleStatus);

        return () => {
            provider.off("status", handleStatus);
            binding.destroy();
            provider.destroy();
            doc.destroy();
        };
    }, [editor]);

    return (
        <>
            <h1>Interview Page</h1>
            <p>WebSocket status: {status}</p>

            <Editor
                height="85vh"
                defaultLanguage="javascript"
                defaultValue=""
                theme="vs-dark"
                onMount={(instance) => setEditor(instance)}
            />
        </>
    );
}
