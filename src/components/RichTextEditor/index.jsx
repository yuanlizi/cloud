import React, { useState, forwardRef, useImperativeHandle  } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

 const index = forwardRef((props, ref) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    // 将子组件方法暴露给父组件
    useImperativeHandle(ref, () => ({
        getHtml
    }))
    const onEditorStateChange = (val) => {
        setEditorState(val)
      };
      const getHtml = () => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
      }
  return (
    <div>
        <Editor
          editorState={editorState}
          editorStyle={{border: '1px solid black', minHeight: 200 , padding: '0px 10px'}}
          onEditorStateChange={onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
  )
})
export default index


