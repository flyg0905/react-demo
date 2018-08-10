import React,{Component} from 'react';
import {Card} from 'antd';
class PCNewsImages extends Component{
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
    const styleImage={
      display:'block',
      width:this.props.imageWidth,
      height:'90px'
    };
    const styleH3={
      width:this.props.imageWidth,
      whiteSpace:'nowrap',
      overflow:'hidden',
      textOverflow:'ellipsis'
    };
    const {news} =this.state;
    const newsList=news.length
    ?
    news.map((newsItem,index)=>(
        <div key={index} className="imageblock l">
          <a href={'details/${newsItem.uniquekey}'} target="_blank">
            <div className="custom-image">
              <img alt="" style={styleImage} src={newsItem.thumbnail_pic_s}/>
            </div>
            <div className="custom-card">
              <h3 style={styleH3}>{newsItem.title}</h3>
              <p>{newsItem.author_name}</p>
            </div>
          </a>
        </div>
    ))

    :'无图片列表';

    return(
      <Card title={this.props.cardTitle} bordered={true} style={{ width: this.props.width }}>
         {newsList}
      </Card>
    )
  }
}
export default PCNewsImages;
