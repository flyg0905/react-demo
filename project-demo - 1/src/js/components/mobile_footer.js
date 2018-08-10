import React,{Component} from 'react';
import {Row,Col} from 'antd';
class MobileFooter extends Component{
  render(){
    return(
      <footer>
          <Row>
            <Col span={2}></Col>
            <Col span={20}>&copy;&nbsp;2018 news,all rights reserved</Col>
            <Col span={2}></Col>
          </Row>
      </footer>
    )
  }
}
export default MobileFooter
