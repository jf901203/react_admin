
// 添加分类
import React, { Component } from 'react'
import { Form,Input,Select} from 'antd';
import PropTypes from 'prop-types'

const { Option } = Select
class AddForm extends Component {
  static propTypes ={
    setForm:PropTypes.func.isRequired,
    parentId:PropTypes.string.isRequired,
    categorys:PropTypes.array.isRequired
   }
  
  componentWillMount(){
    this.props.setForm(this.props.form)
  }
  // 发送异步请求获取数据
  render() {
    // 在这里的数据说明已经是更新后的数据了
    const { getFieldDecorator } = this.props.form;
    const {parentId,categorys}=this.props
    
    return (
      <Form layout="horizontal">
        <p>所属分类:</p>
        <Form.Item>
          {getFieldDecorator('parentId', {
              rules: [{ required: true, message: 'Please select your gender!' }],
              initialValue:parentId
            })(
              <Select
                placeholder="Select a option and change input text above"
              >
                <Option value="0">一级分类</Option>
                {
                  categorys.map((item)=>{
                    return(
                    <Option value={item._id} key={item._id}>{item.name}</Option>
                    )
                  })
                }
              </Select>,
            )}
        </Form.Item>
        <p>分类名称:</p>
        <Form.Item>
          {getFieldDecorator('categoryName', {
              rules: [{ required: true, message: '请求输入分类名称!' }],
            })(
              <Input
                placeholder="请输入分类名称"
              />
            )}
        </Form.Item> 
      </Form>
    )
  }
}

// 得到form对象
export default  Form.create()(AddForm)