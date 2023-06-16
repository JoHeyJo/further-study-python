import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';

type handleEditorData = {
  onEditorDataChange: (data: any) => void
}

function DraftEditor({ onEditorDataChange }: handleEditorData) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );


  function handleKeyCommand(command: any, editorState: any,) {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      onEditorChange(newState)
      return 'handled';
    }
    return 'not-handled'
  }

  
  function onEditorChange(newState: any) {
    setEditorState(newState)
    const content = convertToRaw(newState.getCurrentContent())
    const serialized = JSON.stringify(content)
    onEditorDataChange(serialized)
  }


    // const onChange = (newEditorState: any) => {
    //   setEditorState(newEditorState);
    // };

    // const handleKeyCommand = (command: any, currentEditorState: any) => {
    //   const newEditorState = RichUtils.handleKeyCommand(currentEditorState, command);

    //   if (newEditorState) {
    //     onChange(newEditorState);
    //     return 'handled';
    //   }

    //   return 'not-handled';
    // };
  

  return <Editor editorState={editorState} handleKeyCommand={handleKeyCommand} onChange={onEditorChange} />;
};

export default DraftEditor;