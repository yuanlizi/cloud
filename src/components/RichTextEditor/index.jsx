import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const index = forwardRef((props, ref) => {
  const { detail } = props
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  useEffect(() => {
    changeHtml()
  }, [])
  // 将html结构在富文本编辑器中显示出来
  const changeHtml = () => {
    if (detail) {
      const contentBlock = htmlToDraft(detail);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState)
      }
    }

  }
  // 将子组件方法暴露给父组件
  useImperativeHandle(ref, () => ({
    getHtml
  }))
  // 修改内容
  const onEditorStateChange = (val) => {
    setEditorState(val)
  };
  // 获取输入的内容转化为html格式
  const getHtml = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  // 上传图片
  const uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api//manage/img/upload');
        // xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const url = response.data.url
          resolve({data: {link: url}});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
  return (
    <div>
      <Editor
        editorState={editorState}
        editorStyle={{ border: '1px solid black', minHeight: 200, padding: '0px 10px' }}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
      {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
    </div>
  )
})
export default index


