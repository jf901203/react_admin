//用于图片上传的组件

import React, { Component } from 'react'

import { Upload, Icon, Modal, message } from 'antd';

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
    fileList: [],  //前端显示的数据
  };

  /*组件自身的事件回调 */ 
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
     
    if (!file.url && !file.preview) {
      // Base64的一个串
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };


  // fileList 所有已上传图片对象的数组 file：当前操作的图片对象
  handleChange = ({ fileList,file }) => {

    if(file.status==='done'){
        message.success('上传成功')
        const res=file.response
       if(res.status===0){
          const {name,url} =res.data
          // 上传后的数据 赋值到前台显示
          const list=fileList[fileList.length-1]
          list.name=name
          list.url=url
       }
      
    }
    this.setState({fileList})
  };

// 前台删除图片的同时 要删除后台的图片
  handleRemove=(file)=>{
    
    if(file.status==='done'){
      const res=file.response
      if(res.status===0){
        const {name}=res.data
      }
    }
  

  }


  // 自定函数 给父组件调用的方法

  getImgs=()=>{
  
     const {fileList}=this.state
     return fileList.map(item=>item.name)

  }

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
          name="image"  // 发送到后台的name参数 
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
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


