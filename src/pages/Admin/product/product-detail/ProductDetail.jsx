import React, { Component } from 'react'
import { List,Card,Icon} from 'antd';

import LinkButton from '../../../../components/link-button/LinkButton'
import './detail.less'
import {BASE_URL} from '../../../../utils/constants'
import {reqCategoryInfo} from '../../../../api/index'
const {Item}=List

export default class ProductDetail extends Component {


  state={
    cName:'', //一级分类名称
    pName:''  //二级分类名称
  }




// 准备渲染的标签 
 getImgs=()=>{
  const {imgs}=this.product
  return imgs.map((item)=>{return(

   <img style={{width:'120px'}} key={item} src={BASE_URL+item} alt="图裂了"/>

  )})

 }
  // 第一次渲染render前准备同步数据 
  componentWillMount(){
    this.product=this.props.location.state
  }
 async componentDidMount(){
    const {pCategoryId,categoryId}=this.product
    // 只有一个一级分类
    if(pCategoryId==='0'){ 
       const result=await reqCategoryInfo(categoryId)
       if(result.status===0){
        const pName=result.data.name
        this.setState({pName})
       }

    }else{ //一级分类和二级分类都有
     
      // 一次性发送多个请求 只有都成功了 才会处理结果
      const results=await Promise.all([reqCategoryInfo(pCategoryId),reqCategoryInfo(categoryId)])
      const pName=results[0].data.name
      const cName=results[1].data.name
      this.setState({
        pName,
        cName
      })

    }
  }
  render() {
    const {desc,detail,name,price}=this.product
    const {pName,cName}=this.state
    const title=(
      <span>
        <LinkButton onClick={()=>{this.props.history.goBack()}}>
         <Icon type="arrow-left" style={{margin:'0px 10px'}}/>
         商品详情
        </LinkButton>
      </span>
    )
    return (
      <div>
        <Card size="small" title={title}  style={{ width: '100%' }}>
        <List>
           <Item>
              <span className="detail">商品名称:</span>
              <span>{name}</span>
           </Item>
           <Item>
              <span className="detail">商品描述:</span>
              <span>{desc}</span>
           </Item>
           <Item>
              <span className="detail">商品价格:</span>
              <span>{price}元</span>
           </Item>
           <Item>
              <span className="detail">所属分类:</span>
              <span>{pName} {cName ? '--->' + cName:null}</span>
           </Item>
           <Item>
              <span className="detail">商品图片:</span>
              {this.getImgs()}
           </Item>
           <Item>
              <span className="detail">商品详情:</span>
              <span dangerouslySetInnerHTML={{__html:detail}}></span>
           </Item>
        </List>
        </Card>
      </div>
    )
  }
}
