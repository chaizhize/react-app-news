import React from 'react'
import {Row,Col,Card,Button,Input,Form, message, notification,BackTop} from 'antd'
import axios from 'axios'
import PubSub from 'pubsub-js'

let FormItem=Form.Item;
class NewsComponents extends React.Component {
    constructor(props) {
        super(props)
        // 初始化状态
        this.state = {
            comments:[]
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${nextProps.newsId}`;
        axios.get(url)
            .then(response => {
                let data = response.data;
                // 更新状态
                this.setState({comments: data});
            })
    }
    // 定义提交评论的方法
    handleSubmit = (event) => {
        event.preventDefault();
        // 准备工作
        let userId = JSON.parse(localStorage.getItem('person_ley') || '{}').userId;
        // 判断用户是否登录
        if(!userId){
            message.warn('请先登录');
            setTimeout(() => {
                PubSub.publish('message', true);
            }, 2000)
            return;
        }
        let newsId = this.props.newsId;
        let comment = this.props.form.getFieldValue('comment');
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${newsId}&commnet=${comment}`;
        axios.get(url)
            .then(response => {
                let data = response.data;
                message.success('提交评论成功');
                // 重置表单项的内容，清空输入的内容
                this.props.form.resetFields();
            })

    };
    // 定义收藏文章的方法
    handleCollection = () => {
        // 准备工作
        let userId = JSON.parse(localStorage.getItem('person_ley') || '{}').userId;
        // 判断用户是否登录
        if(!userId){
            message.warn('请先登录');
            setTimeout(() => {
                PubSub.publish('message', true);
            }, 2000)
            return;
        }
        let newsId = this.props.newsId;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${newsId}`
        axios.get(url)
            .then(response => {
                notification.success({
                    message: 'ReactNews收藏',
                    description: '收藏成功'
                })
            })
            .catch(error => {
                console.log(error);
            })
    };

    render() {
        let {comments}=this.state;
        let {getFieldDecorator}  = this.props.form;
        let commentsList=comments.length?
            (
             comments.map((item,index)=>{
                 return(
                     <li key={index}>
                         <Card title={item.UserName} extra={item.datetime}>
                             {item.Comments}
                         </Card>
                    </li>
                 )
             })

        ):'暂时没有评论内容';
        return (
            <div>
                <ul>
                    {commentsList}
                </ul>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label='您的评论' labelCol={{span: 2, offset: 11}}>
                        {
                            getFieldDecorator('comment')(<Input.TextArea type="textarea"/>)
                        }
                    </FormItem>

                    <Row>
                        <Col span={5} push={10}>
                            <Button htmlType='submit' type="primary">提交评论</Button>&nbsp;
                            <Button onClick={this.handleCollection} type="primary">收藏文章</Button>
                        </Col>
                    </Row>
                </Form>


                <BackTop/>

            </div>
        )
    }
}

export default Form.create()(NewsComponents)