import React from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import PropTypes from 'prop-types'

import {reqDeleteImg} from '../../../../api'
import {BASE_URL} from '../../../../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default  class PicturesWall extends React.Component {

    static propTypes = {
        imgs:PropTypes.array
      }

 constructor(props){
     super(props)
     let fileList=[]
		 const  imgs=this.props.imgs
		 if(imgs && imgs.length>0){
				fileList=imgs.map((item,index)=>({
					uid:-index,
					name:item,
					status:'done',
					url:BASE_URL + item
        }))
        
        console.log(fileList)
		 }
		 
     this.state = {
        previewVisible: false,
        previewImage: '',
        fileList
      };
 }
  

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

  handleChange = async ({ fileList,file }) =>{
  
    // 获取到服务器返回的数据
    if(file.status==="done"){

      message.success('图片上传成功')
      const res=file.response
      if(res.status===0){
        const {name,url} =res.data
        // 上传后的数据 赋值到前台显示
        const list=fileList[fileList.length-1]
        list.name=name
        list.url=url
     }else{
        message.error('图片上传失败')
      }
      
    }else if(file.status==="removed"){
      const {name}=file
      // 删除后台图片
      const result = await reqDeleteImg(name)
      console.log(result)
      if (result.status===0) {
        message.success('删除图片成功!')
      } else {
        message.error('删除图片失败!')
      }
    
    }

    this.setState({ fileList })

  };

  getImgs=()=>{
    const {fileList}=this.state
    console.log(fileList)
    return fileList.map(item=>item.name)
 }

  render() {
		const { previewVisible, previewImage, fileList } = this.state;
   
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          name='image'

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
