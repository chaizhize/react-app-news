import React from 'react'
import {Row,Col} from 'antd'
import axios from 'axios'
import NewsImgBlock from './news_img_block';

import NewsComponents from './news_components'

class NewsDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            news:null
        }
    }
    componentWillMount(){
        // 准备工作
        let newsId = this.props.params.newsId;
        this.getNewsItem(newsId)
    }
    getNewsItem = (newsId) => {
        // 准备工作
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`
        axios.get(url)
            .then(response => {
                let data = response.data;
                // 更新状态
                this.setState({
                    news: data.pagecontent
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
    // 当组件将要接收props数据或者是props数据发生变化的时候
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        this.getNewsItem(nextProps.params.newsId);
    }
    render(){
        let {news} = this.state;
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <div dangerouslySetInnerHTML={{__html: news}}></div>
                        <NewsComponents newsId={this.props.params.newsId}/>
                    </Col>
                    <Col span={6}>

                        <NewsImgBlock title="娱乐新闻" count={400} type="yule" width="300px" imgWidth="115px"/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )

    }
}
export default NewsDetail