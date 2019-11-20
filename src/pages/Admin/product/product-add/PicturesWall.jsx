//用于图片上传的组件

import React, { Component } from 'react'

import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

  /*组件自身的状态*/
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  /*组件自生的事件回调 */ 
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
     
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };


  // fileList 所有已上传图片对象的数组 file：当前操作的图片对象
  handleChange = ({ fileList,file }) => {
    console.log(file.response)
    console.log(fileList)
    this.setState({fileList})
  };

  /*状态更新 render()会触发*/ 

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload" //提交图片的地址
          listType="picture-card"
          accept="image/*" //只接受图片格式
          name="image"  //	发到后台的文件参数名
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}


