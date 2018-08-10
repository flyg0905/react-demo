import React,{Component} from 'react';
//import {Link} from 'react-router-dom';
import { Row, Col,Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal  } from 'antd';
import Logo from '../../images/newspaper.png';
const FormItem = Form.Item;
const SubMenu=Menu.SubMenu;
const MenuItemGroup =Menu.ItemGroup;
const TabPane=Tabs.TabPane;
class PCHeader extends Component{
  constructor(){
    super();
    this.state={
      current: 'top',
      modalVisible:false,
      action:'login',
      hasLogined:false,
      userNickName:'',
      userid:0
    };
  };
  componentWillMount=()=>{
    if(localStorage.userid!=''||localStorage.userid!=null||localStorage.userid!='undefined') this.setState({hasLogined:true,userNickName:localStorage.userName,userid:localStorage.userid});
    console.log(localStorage.userid);
  };
  setModalVisible=(value)=>{
     this.setState({modalVisible:value})
  };
  handleClick = (e) => {
   console.log(e);
   this.setState({
     current: e.key,
   });
   if(e.key==='register'){
      this.setModalVisible(true)
   }
 };
 handleOk=()=>{
    this.setModalVisible(false)
 };
 handleCancle=()=>{
   this.setModalVisible(false)
 };
 tabChangeTab = (key) =>{
   // console.log(key)
   if(key===1){
     this.setState({action:'login'})
   }else if(key===2){
     this.setState({action:'register'})
   }
 };
 handleSubmit=(e)=>{
   e.preventDefault();
   var fetchOptions={
     method:'GET'
   };
   var data=this.props.form.getFieldsValue();
   //console.log(data);
   //console.log('this.state.action',this.state.action);
   fetch('http://newsapi.gugujiankong.com/Handler.ashx?action='+this.state.action+'&username='+data.userName+'&password='+data.password+'&r_userName='+data.r_userName+'&r_password='+data.r_password+'&r_confirmPassword='+data.r_confirmPassword,fetchOptions).
   then(res=>res.json()).then(json=>{
     this.setState({userNickName:json.NickUserName,userid:json.UserId});
     //console.log('json',json);
     localStorage.userName=json.NickUserName;
     localStorage.userid=json.UserId;
     message.success('请求成功！');
     this.setModalVisible(false);
   });
 };
 logout=()=>{
   localStorage.userName='';
   localStorage.userid='';
   this.setState({hasLogined:false});
 };
  render(){
    const {getFieldDecorator} =this.props.form;
    const usershow=this.state.hasLogined
    ?
      <Menu.Item key="logout" className="register">
          <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
          &nbsp;&nbsp;
          <a target="_blank">
              <Button type="dashed" htmlType="button">个人中心</Button>
          </a>
          &nbsp;&nbsp;
          <Button type="danger" htmlType="button" onClick={this.logout}>退出</Button>
      </Menu.Item>
    :
      <Menu.Item key="register" className="register">
          <Icon type="login" />注册/登录
      </Menu.Item>
    ;
    return(
      <header>
          <Row>
            <Col span={2}></Col>
            <Col span={4}>
               <a href="/" className='logo'>
                   <img src={Logo} alt="logo"/>
                   <span>news</span>
               </a>
            </Col>
            <Col span={16}>
                <Menu mode="horizontal" selectedKeys={[this.state.current]}  onClick={this.handleClick}>
                  <Menu.Item key="top"> <Icon type="appstore" />头条</Menu.Item>
                  <Menu.Item key="shehui"> <Icon
                   type="appstore" />社会</Menu.Item>
                  <Menu.Item key="guonei"> <Icon type="appstore" />国内</Menu.Item>
                  <Menu.Item key="guoji"> <Icon type="appstore" />国际</Menu.Item>
                  <Menu.Item key="yule"> <Icon type="appstore" />娱乐</Menu.Item>
                  <Menu.Item key="tiyu"> <Icon type="appstore" />体育</Menu.Item>
                  <Menu.Item key="keji"> <Icon type="appstore" />科技</Menu.Item>
                  <Menu.Item key="shishang"> <Icon type="appstore" />时尚</Menu.Item>
                  {usershow}
                </Menu>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancle}>
                    <Tabs defaultActiveKey="1" type="card" onChange={this.tabChangeTab}>
                        <TabPane  tab="登录" key="1">
                          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                              <FormItem label="账号">
                                  {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入您的账户!' }],
                                  })(
                                      <Input prefix={<Icon type="user"/>} placeholder="请输入您的账户"  />
                                  )}
                              </FormItem>
                              <FormItem label="密码">
                                  {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入您的密码!' }],
                                  })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入您的密码" />
                                  )}
                              </FormItem>
                              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                          </Form>
                        </TabPane>
                        <TabPane  tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem label="账号">
                                    {getFieldDecorator('r_userName', {
                                      rules: [{ required: true, message: '请输入您的账户!' }],
                                    })(
                                        <Input prefix={<Icon type="user"/>} placeholder="请输入您的账户"  />
                                    )}
                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator('r_password', {
                                      rules: [{ required: true, message: '请输入您的密码!' }],
                                    })(
                                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入您的密码" />
                                    )}
                                </FormItem>
                                <FormItem label="确认密码">
                                    {getFieldDecorator('r_confirmPassword', {
                                      rules: [{ required: true, message: '请再次输入您的密码!' }],
                                    })(
                                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请再次输入您的密码" />
                                    )}
                                </FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </Col>
            <Col span={2}></Col>
          </Row>
      </header>
    )
  }
}
// 需要进行二次封装
export default PCHeader= Form.create()(PCHeader);;
