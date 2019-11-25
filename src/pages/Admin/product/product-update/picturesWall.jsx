import React from 'react'
import { Upload, Icon, Modal } from 'antd';
import PropTypes from 'prop-types'

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

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
		const { previewVisible, previewImage, fileList } = this.state;
		
		console.log(fileList)
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
