import React,{Component} from 'react';
// import { Row, Col } from 'antd';
import PCHeader from './pc_header';
import PcFooter from './pc_footer';
import PcNewsContainer from './pc_newscontainer';
class PCIndex extends Component{
  render(){
    return(
      <div>
          <PCHeader/>
          <PcNewsContainer/>
          <PcFooter/>
      </div>
    )
  }
}
export default PCIndex;
