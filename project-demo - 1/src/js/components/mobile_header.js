import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import {fetch} from 'whatwg-fetch';
import { Form,Row,Menu, Icon,Tabs,message,Input,Button,CheckBox,Modal } from 'antd';
// import { Row, Col,Menu, Icon  } from 'antd';
import Logo from '../../images/newspaper.png';
const FormItem = Form.Item;
const SubMenu=Menu.SubMenu;
const MenuItemGroup =Menu.ItemGroup;
const TabPane=Tabs.TabPane;

class MobileHeader extends Component{
 constructor(){
   super();
   this.state={
     current: 'top',
     modalVisible:false,
     modalMobileVisible:false,
     action:'login',
     hasLogined:false,
     userNickName:'',
     userid:0
   }
 };
 componentWillMount(){
   if(localStorage.userid!='') this.setState({hasLogined:true,userNickName:localStorage.userName,userid:localStorage.userid});
 };
 handleOk=()=>{
   this.setState({modalVisible:false})
 };
 handleCancle=()=>{
   this.setState({modalVisible:false})
 };
 login=()=>{
   this.setState({modalVisible:true})
 };
 logined=()=>{
   this.setState({modalMobileVisible:true})
 }
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
   console.log(data);
   fetch('http://newsapi.gugujiankong.com/Handler.ashx?action='+this.state.action+'&username='+data.userName+'&password='+data.password+'&r_userName='+data.r_userName+'&r_password='+data.r_password+'&r_confirmPassword='+data.r_confirmPassword,fetchOptions).
   then(res=>res.json()).then(json=>{
     this.setState({userNickName:json.NickUserName,userid:json.UserId});
     //console.log('json',json);
     localStorage.userName=json.NickUserName;
     localStorage.userid=json.UserId;
     if(this.state.action==='login') this.setState({hasLogined:true});
      message.success('请求成功！');
      this.setState({modalVisible:false})
   });
 };
  render(){
    const {getFieldDecorator} =this.props.form;
    const formItemLayout = {
          labelCol: {
            xs: { span: 5 },
            sm: { span: 5 },
          },
          wrapperCol: {
            xs: { span: 12 },
            sm: { span: 12 },
          },
        };
    const userShow=this.state.hasLogined?
    <Icon type="solution" onClick={this.logined}/>
    :
    <Icon type="setting" onClick={this.login}/>
    return(
        <div id="mobile_header">
          <header >
              <img src={Logo} alt="logo"/>
              <span>news</span>
              {userShow}
          </header>
          <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancle}>
              <Tabs defaultActiveKey="1" type="card"  onChange={this.tabChangeTab}>
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
                        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form" layout="inline">
                            <FormItem label="账号"   {...formItemLayout}>

                                {getFieldDecorator('r_userName', {
                                  rules: [{ required: true, message: '请输入您的账户!' }],
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入您的账户"  />
                                )}
                            </FormItem>
                            <FormItem label="密码"   {...formItemLayout}>
                                {getFieldDecorator('r_password', {
                                  rules: [{ required: true, message: '请输入您的密码!' }],
                                })(
                                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入您的密码" />
                                )}
                            </FormItem>
                            <FormItem label="确认密码"   {...formItemLayout}>
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
        </div>
    )
  }
}
export default MobileHeader=Form.create()(MobileHeader);
