import React from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';



function DraftEditorConvertFromRaw({ rawContent }: any) {
console.log('rawContent', rawContent)
  const contentState = convertFromRaw(JSON.parse(rawContent));
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div>
      <Editor editorState={editorState} onChange={() => {}} readOnly />
    </div>
  );
}

export default DraftEditorConvertFromRaw;