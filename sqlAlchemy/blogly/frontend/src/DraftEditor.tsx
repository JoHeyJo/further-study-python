import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';

type handleEditorData = {
  onEditorDataChange: (data: any) => void
}

function DraftEditor({ onEditorDataChange }: handleEditorData) {
  const [editorState, setEditorState] = useState({
   problem: EditorState.createEmpty(),

});


  /** Listens for key command and styles text appropriately */
  function handleKeyCommand(command: any, editorState: any,) {
    const newState = RichUtils.handleKeyCommand(editorState.problem, command)

    if (newState) {
      onEditorChange(newState)
      return 'handled';
    }
    return 'not-handled'
  }

  /** creates 'BOLD' UI styling control */
  function _onBoldClick(){
    onEditorChange(RichUtils.toggleInlineStyle(editorState.problem, 'BOLD'))
  }

/** Updates state -> retrieves raw content from state -> updates parent component state w/ serialized data  */  
  function onEditorChange(newState: any) {
    setEditorState((s)=>({...s, problem:newState}))
    const rawContent = convertToRaw(newState.getCurrentContent())
    const serialized = JSON.stringify(rawContent)
    onEditorDataChange(serialized)
  }  

  return (
<>
{/* <button onClick={_onBoldClick}>Bold</button> */}
<Editor editorState={editorState.problem} handleKeyCommand={handleKeyCommand} onChange={onEditorChange} />
</>
  )
};

export default DraftEditor;