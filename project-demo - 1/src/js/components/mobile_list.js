import React,{Component} from 'react';
import {Row,Col} from 'antd';
class MobileList extends Component{
  constructor(){
    super();
    this.state={
      news:''
    }
  };
  componentWillMount(){
    const fetchOption={
      method:'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+this.props.type+'&count='+this.props.count,fetchOption)
    .then(response=>response.json())
    .then(json=>this.setState({news:json}));
  };
  render(){
    const {news}=this.state;

    const newsList=news.length
    ?
    news.map((newsItem,index)=>(
      <section key={index} className="m_article list_item special_section">
        <a href={'details/${newsItem.uniquekey}'} target="_blank" className="clearfix">
          <div className="m_article_img l">
            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
          </div>
          <div className="m_article_info l">
            <div className="m_article_title">
              <span>{newsItem.title}</span>
            </div>
            <div className="m_article_desc clearfix">
              <div className="m_article_desc_l">
                <span className="m_article_channel">{newsItem.realtype}</span>
                <span className="m_article_time">{newsItem.date}</span>
              </div>
            </div>
          </div>
        </a>
      </section>
    ))
    :'';
    return(
      <div className='TabPaneItem'>
        <Row>
          <Col span={24}>
              {newsList}
          </Col>
        </Row>
      </div>
    )
  }
}
export default MobileList;
