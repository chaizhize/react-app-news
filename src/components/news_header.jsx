import React from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {
    Col,
    Row,
    Menu,
    Icon,
    Button,
    Modal,
    Tabs,
    Form,
    Input,
    message
} from 'antd'
import PubSub from 'pubsub-js'
import logo from '../images/logo.png'

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem=Form.Item

class NewsHeader extends React.Component{
    constructor(props){
        super(props)
        this.state={
            key:"toutiao",
            username: null,
            userId:null,
            isShow:false
        }
    }

    //组件将要挂载的时候
    componentWillMount(){
        //订阅消息
        PubSub.subscribe('message',(msg,data)=>{
            this.setState({
                isShow:data
            })
        })
        let userObj=JSON.parse(localStorage.getItem('person_ley'))
        console.log(userObj)
        //判断用户是否登录
        if(userObj){//用户登录
            this.setState({
                username:userObj.username,
                userId:userObj.userId
            })

        }
    }

    // 定义点击MenuItem时的回调函数
    changeKey = ({ key }) => {
        if(key === 'loginAndRegister'){
            // 修改isShow的状态
            this.setState({isShow: true});
            this.props.form.resetFields();
        }

        // console.log(item, key,keyPath);
        // 修改状态
        this.setState({key});
    };

    handleShow = (isShow) => {
        this.setState({isShow});
    };
    //定义提交表单的方法
    handleSubmit=(isRegister,event)=>{
        console.log(isRegister,event)
        event.preventDefault();
        let action = isRegister?'register':'login';
        let {username,password,r_userName,r_password,r_confirmPassword}=this.props.form.getFieldsValue();
        let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        //发送ajax请求
        axios.get(url)
            .then(response=>{
                //收集数据
                let data = response.data;
                if(isRegister){//注册成功
                    message.success('恭喜您，注册成功 ！')
                }else{
                    if(!data){//登录失败
                        message.error('登录失败');
                    }else {
                        message.success('登录成功')
                        //登录成功，更新状态
                        this.setState({
                            username:data.NickUserName,
                            userId:data.UserId
                        })
                        //保存用户数据到localStorage中
                        let {username,userId}=this.state;
                        let obj={username,userId};
                        localStorage.setItem('person_ley',JSON.stringify(obj))
                    }
                }
            })
            .catch(error=>{
                console.log(error)
            })
        //更新状态 isShow
        this.setState({isShow:false})
    }
    //定义点击退出的方法
    handleOut=()=>{

        //更新username的状态
        this.setState({
            username:null,
            userId:null
        })
        //清除localStorage中保存的用户信息
        localStorage.removeItem('person_ley')
    }
    render(){
        let {key,username,userId,isShow} = this.state;
        let {getFieldDecorator} = this.props.form;
        let UserItem = username?
            ( // 用户登录
                <MenuItem className="register" key="userCenter">
                    <Button type="primary">{username}</Button>&nbsp;
                    <Button type="dashed"><Link to="/user_center">个人中心</Link></Button>&nbsp;
                    <Button onClick={this.handleOut}><Link to="/">退出</Link> </Button>
                </MenuItem>
            )
            :( // 未登录
                <MenuItem className="register" key="loginAndRegister">
                    <Icon type="appstore"/> 登录/注册
                </MenuItem>
            )
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <div className="logo">
                            <img src={logo} alt=""/>
                            <span>ReactNews</span>
                        </div>
                    </Col>
                    <Col span={19}>
                        <Menu onClick={this.changeKey} mode="horizontal" selectedKeys={[key]}>
                            <MenuItem key="toutiao">
                                <Icon type="appstore"/> 头条
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Icon type="appstore"/> 社会
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore"/>国内
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore"/>国际
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore"/>娱乐
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore"/>体育
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore"/>科技
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore"/>时尚
                            </MenuItem>
                            {UserItem}
                        </Menu>
                        <Modal title="用户中心" visible={isShow} okText="确定"
                               onOk={this.handleShow.bind(this, false)} onCancel={this.handleShow.bind(this, false)}>
                            <Tabs onChange={()=>this.props.form.resetFields()}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                        <FormItem label="用户名">
                                            {
                                                getFieldDecorator('username')(<Input placeholder="请输入您的用户名"/>  )
                                            }
                                        </FormItem>
                                        <FormItem label="密码">
                                                {
                                                    getFieldDecorator('password')(<Input type='password' placeholder="请输入您的密码"/>  )
                                                }
                                        </FormItem>
                                        <Button htmlType="submit" type="primary">登录</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                        <FormItem label="用户名">
                                            {
                                                getFieldDecorator('r_userName')(<Input placeholder="请输入您的用户名"/>  )
                                            }
                                        </FormItem>
                                        <FormItem label="密码">
                                            {
                                                getFieldDecorator('r_password')(<Input type='password' placeholder="请输入您的密码"/>  )
                                            }
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {
                                                getFieldDecorator('r_confirmPassword')(<Input type='password' placeholder="请确认您的密码"/>  )
                                            }
                                        </FormItem>
                                        <Button htmlType="submit" type="primary">注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>

                        </Modal>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}
export default Form.create()(NewsHeader)