
import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types'


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



export default  class RichTextEditor extends Component {
  
  static propTypes={
    detail:PropTypes.string
  }

  constructor(props) {
    super(props);
    const {detail}=this.props
    const html = detail;
    // 转换为html格式的代码
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  state={
    editorState: EditorState.createEmpty()
  }

  // 获取富文本的数据
  getEditorVal=()=>{

  return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
   
  }

  // 支持图片上传

  uploadImageCallBack=(file)=> {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const url=response.data.url
          resolve({data:{link:url}});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  onEditorStateChange=(editorState) => {

   
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          editorStyle={{border:'1px solid rgba(7,17,27,.3)',minHeight:'300px'}}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } }
          }}
        />
        
      </div>
    );
  }
}