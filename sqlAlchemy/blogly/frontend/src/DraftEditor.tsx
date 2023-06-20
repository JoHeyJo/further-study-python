//dependencies
import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
//modules / components
//styles
import './style/DraftEditor.css';
type handleEditorData = {
  onEditorDataChange: (field: string, data: any) => void
}

function myBlockStyleFn(contentBlock: any) {
  const type = contentBlock.getType();
  if (type === 'unstyled') {
    return 'basicStyling';
  }
  return ''
}

/** Contols input for content, problem, solution
 * 
 * 
 * 
 */
function DraftEditor({ onEditorDataChange }: handleEditorData) {
  const [editorState, setEditorState] = useState({
    content: EditorState.createEmpty(),
    problem: EditorState.createEmpty(),
    solution: EditorState.createEmpty(),
  });

  /** Listens for key command and styles text appropriately */
  function handleKeyCommand(field: any, command: any, editorState: any) {
    const newState = RichUtils.handleKeyCommand(editorState.field, command)

    if (newState) {
      onEditorChange(field, newState)
      return 'handled';
    }
    return 'not-handled'
  }

  function handleReturn(command: any, editorState: any){
    if (!command.shiftKey) {
      // Create a new paragraph (line break) on Enter
      // setEditorState(RichUtils.insertSoftNewline(editorState.));
      return 'handled';
    }
    return 'not-handled';
  }

  /** creates 'BOLD' UI styling control */
  // function _onBoldClick(){
  //   onEditorChange(RichUtils.toggleInlineStyle(editorState.problem, 'BOLD'))
  // }

  /** Updates state -> retrieves raw content from state -> updates parent component state w/ serialized data  */
  function onEditorChange(field: any, newState: any) {
    setEditorState((prevState) => ({ ...prevState, [field]: newState }))
    const rawContent = convertToRaw(newState.getCurrentContent())
    const serialized = JSON.stringify(rawContent)
    onEditorDataChange(field, serialized)
  }

  return (
    <>
      {/* <button onClick={_onBoldClick}>Bold</button> */}
      <Form.Group controlId="form-content">
        <InputGroup.Text>Content:</InputGroup.Text>
        {/* <div className="DraftEditor-control"> */}
          <Editor readOnly={false} blockStyleFn={myBlockStyleFn} editorState={editorState.content} handleKeyCommand={(state) => handleKeyCommand('content', state, editorState)} onChange={(state) => onEditorChange('content', state)} />
        {/* </div> */}
      </Form.Group>
      <Form.Group controlId="form-problem">
        <InputGroup.Text>Problem:</InputGroup.Text>
          <Editor blockStyleFn={myBlockStyleFn} editorState={editorState.problem} handleKeyCommand={(state) => handleKeyCommand('problem', state, editorState)} onChange={(state) => onEditorChange('problem', state)} />
      </Form.Group>
      <Form.Group controlId="form-solution">
        <InputGroup.Text>Solution:</InputGroup.Text>
          <Editor blockStyleFn={myBlockStyleFn} editorState={editorState.solution} handleKeyCommand={(state) => handleKeyCommand('solution', state, editorState)} onChange={(state) => onEditorChange('solution', state)} />
      </Form.Group>
    </>
  )
};

export default DraftEditor;