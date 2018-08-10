import React,{Component} from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';
import { Tabs,Carousel } from 'antd';
const TabPane = Tabs.TabPane;

class MobileIndex extends Component{
  constructor(){
    super();
    this.state={

    }
  };
  tabCallback=(key)=>{

  }
  render(){

    return(
         <div>
            <MobileHeader/>
            <Tabs defaultActiveKey="1" onChange={this.tabCallback} className="tabs_nav" >
               <TabPane tab="头条" key="1">
                 <MobileList type='top' count={10}/>
               </TabPane>
               <TabPane tab="社会" key="2">
                  <MobileList type='shehui' count={10}/>
               </TabPane>
               <TabPane tab="国内" key="3">
                  <MobileList type='guonei' count={10}/>
               </TabPane>
               <TabPane tab="国际" key="4">
                  <MobileList type='guoji' count={10}/>
               </TabPane>
               <TabPane tab="娱乐" key="5">
                  <MobileList type='yule' count={10}/>
               </TabPane>
            </Tabs>
            <MobileFooter/>
         </div>
    )
  }
}
export default MobileIndex;
