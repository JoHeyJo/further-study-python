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
type EditorStateObject = {
  content: EditorState;
  problem: EditorState;
  solution: EditorState;
};

function myBlockStyleFn(contentBlock: any) {
  const type = contentBlock.getType();
  if (type === 'unstyled') {
    return 'basicStyling';
  }
  return ''
}

/** Controls input for content, problem, solution
 * 
 * 
 * 
 */
function DraftEditor({ onEditorDataChange }: handleEditorData) {
  const [editorState, setEditorState] = useState<EditorStateObject>({
    content: EditorState.createEmpty(),
    problem: EditorState.createEmpty(),
    solution: EditorState.createEmpty(),
  });

  /** Listens for key command and styles text appropriately */
  function handleKeyCommand(field: any, command: any, editorState: any) {
    const newState = RichUtils.handleKeyCommand(editorState[field], command)

    if (newState) {
      console.log('NEWSTATE key command', newState)
      onEditorChange(field, newState)
      return 'handled';
    }
    return 'not-handled'
  }

  const handleReturn = (event: React.KeyboardEvent<{}>, field: keyof EditorStateObject) => {
    if (!event.shiftKey) {
      setEditorState(prevState => ({
        ...prevState,
        [field]: RichUtils.insertSoftNewline(prevState[field])
      }));
      return 'handled';
    }
    return 'not-handled';
  };

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
        <Editor handleReturn={(event) => handleReturn(event, "content")} blockStyleFn={myBlockStyleFn} editorState={editorState.content} handleKeyCommand={(state) => handleKeyCommand('content', state, editorState)} onChange={(state) => onEditorChange('content', state)} />
      </Form.Group>
      <Form.Group controlId="form-problem">
        <InputGroup.Text>Problem:</InputGroup.Text>
        <Editor handleReturn={(event) => handleReturn(event, "problem")} blockStyleFn={myBlockStyleFn} editorState={editorState.problem} handleKeyCommand={(state) => handleKeyCommand('problem', state, editorState)} onChange={(state) => onEditorChange('problem', state)} />
      </Form.Group>
      <Form.Group controlId="form-solution">
        <InputGroup.Text>Solution:</InputGroup.Text>
        <Editor handleReturn={(event) => handleReturn(event, "solution")} blockStyleFn={myBlockStyleFn} editorState={editorState.solution} handleKeyCommand={(state) => handleKeyCommand('solution', state, editorState)} onChange={(state) => onEditorChange('solution', state)} />
      </Form.Group>
    </>
  )
};

export default DraftEditor;