import React from 'react';
import {Card} from 'antd';
class PCNewsBlock extends React.Component{
  constructor(){
    super();
    this.state={
      news:''
    }
  };
  componentWillMount(){
    const fetchOptions={
      method:'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+this.props.type+'&count='+this.props.count,fetchOptions)
    .then(response=>response.json())
    .then(json=>this.setState({news:json}));
  };
  render(){
    const {news} =this.state;
    const newsList=news.length
    ?
    news.map((newsItem,index)=>(
      <li key={index}>
          <a href={'details/${newsItem.uniquekey}'} target="_blank">{newsItem.title}</a>
      </li>
    ))
    :
    "没有新闻数据！";
    return(
      <div className="topNewsList">
          <Card bordered={false}>
              <ul>
                  {newsList}
              </ul>
          </Card>
      </div>
    )
  }
}
export default PCNewsBlock;
