import React from 'react'
import {Row,Col} from 'antd'
import '../componentCss/news_footer.css'

class NewsFooter extends React.Component{
    render(){
        return(
            <div className="news_footer">
                <Row>
                    <Col>
                        &copy; 2016 ReactNews. All Rights Reserved
                    </Col>
                </Row>
            </div>
        )
    }
}
export default NewsFooter