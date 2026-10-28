import Editor from '@monaco-editor/react';

export default function InterviewPage() {
    return (
        <>
            <h1>Interview Page</h1>
            <Editor
                height="100vh"
                defaultLanguage="javascript"
                defaultValue="// some comment"
                theme='vs-dark'
            />
        </>
    );
}