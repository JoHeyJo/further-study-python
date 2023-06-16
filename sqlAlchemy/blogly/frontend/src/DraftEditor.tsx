import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';

type handleEditorData = {
  onEditorDataChange: (data: any) => void
}

function DraftEditor({onEditorDataChange}: handleEditorData) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );


  function handleEditorState(state: any) {
    setEditorState(state)
    const content = convertToRaw(editorState.getCurrentContent())
    const serialized = JSON.stringify(content)
    onEditorDataChange(serialized)

    console.log('editorState', serialized)

  }

  return <Editor editorState={editorState} onChange={handleEditorState} />;
};

export default DraftEditor;