import React from 'react';
import {Tabs, Carousel,Row,Col } from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImages from './pc_news_images_block';
import Img1 from '../../images/1.jpeg';
import Img2 from '../../images/2.jpeg';
import Img3 from '../../images/3.jpeg';
import Img4 from '../../images/4.jpeg';
const TabPane = Tabs.TabPane;
class PcNewsContainer extends React.Component{
  constructor(){
    super();
    this.state={

    }
  };
  render(){
    const settings={
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      autoplay:true
    }
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
              <div className="leftContainer l">
                <div className="carousel">
                  <Carousel {...settings}>
                    <div><img src={Img1} /></div>
                    <div><img src={Img2}/></div>
                    <div><img src={Img3}/></div>
                    <div><img src={Img4}/></div>
                  </Carousel>
                </div>
              </div>
              <Tabs className="tabs_news l">
                  <TabPane tab="娱乐新闻" key="1">
                    <PCNewsBlock type="guoji" count='9' width="100%" bordered="false"/>
                  </TabPane>
                  <TabPane tab="国际新闻" key="2">
                    <PCNewsBlock type="guoji" count='9' width="100%" bordered="false"/>
                  </TabPane>
              </Tabs>
              <div  className=" l">
                <PCNewsImages  type="yule" count='8' width="100%" cardTitle="娱乐新闻" imageWidth="112px"/>
                <PCNewsImages  type="guonei" count='16' width="100%" cardTitle="国内新闻" imageWidth="112px"/>
              </div>
          </Col>
          <Col span={2}></Col>
        </Row>
        </div>
    )
  }
}
export default PcNewsContainer;
