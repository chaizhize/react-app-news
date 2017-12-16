import React from 'react'
import NewsImgBlock from './news_img_block'
import {Row,Col,Carousel,Tabs} from 'antd'
import NewsBlock from './news_block';
import ReactProduct from './react_product'
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'

import '../componentCss/news_container.css'
let TabPane=Tabs.TabPane

class NewsContainer extends React.Component{
    render(){
        return(
            <div className="newsContainer">
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div className="leftContainer1">
                            <Carousel autoplay>
                                <div><img src={carousel_1} alt=""/></div>
                                <div><img src={carousel_2} alt=""/></div>
                                <div><img src={carousel_3} alt=""/></div>
                                <div><img src={carousel_4} alt=""/></div>
                            </Carousel>
                            <NewsImgBlock type='guoji' count={6} title='国际新闻' imgWidth='115px' width='100%'/>
                        </div>
                        <Tabs className='news_tab'>
                            <TabPane tab="娱乐新闻" key="1">
                                <NewsBlock type="yule" count={22}/>
                            </TabPane>
                            <TabPane tab="科技新闻" key="2">
                                <NewsBlock type="keji" count={30}/>
                            </TabPane>
                        </Tabs>
                        <Tabs className='react_pro'>
                            <TabPane tab="React产品" key="3">
                                <ReactProduct/>
                            </TabPane>
                        </Tabs>
                        <div style={{float:'left'}}>
                            <NewsImgBlock type='guonei' count={11} title='国内新闻' imgWidth='115px' width='100%'/>
                            <NewsImgBlock type='yule' count={22} title='娱乐新闻' imgWidth='115px' width='100%'/>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
            )

    }
}
export default NewsContainer