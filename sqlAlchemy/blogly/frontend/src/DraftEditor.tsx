import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';

type handleEditorData = {
  handleEditorData: (data: any) => void
}

function DraftEditor(handleEditorData: handleEditorData ) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
    );

    
  const content = convertToRaw(editorState.getCurrentContent())
  const serialized = JSON.stringify(content)
  handleEditorData(serialized)

    console.log('editorState', serialized)

  return <Editor editorState={editorState} onChange={setEditorState} />;
};

export default DraftEditor;