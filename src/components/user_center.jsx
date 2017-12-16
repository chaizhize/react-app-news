import React from 'react'
import {Row,Col,Card,Tabs,Upload,Icon,Modal} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
let TabPane=Tabs.TabPane
class UserCenter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            comments:null,
            collections:null,
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    componentWillMount(){
        //准备userId
        let userId=JSON.parse(localStorage.getItem('person_ley')).userId;
        let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url)
            .then(response=>{
                let data=response.data
                //更新状态
                this.setState({
                    comments:data
                })
            })
            .catch(error=>{
                console.log(error)
            })
        url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url)
            .then(response=>{
                let data=response.data
                //更新状态
                this.setState({
                    collections:data
                })
            })
            .catch(error=>{
                console.log(error)
            })
    }
    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        let {comments,collections}=this.state;
        let commentList=comments
        ?(
           comments.map((item,index)=>{
               return(
                   <li key={index}>
                       <Card title={`于${item.datetime}评论了该文章`} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                           {item.Comments}
                       </Card>
                   </li>
               )
           })
         )
         :'暂无评论内容';
       let collectionsList=collections
        ?(
           collections.map((item,index)=>{
               return(
                   <li key={index}>
                       <Card title={item.uniquekey} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                           {item.Title}
                       </Card>
                   </li>
               )
           })
         )
         :'暂无收藏文章'
        return(
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div>
                            <Tabs>
                                <TabPane tab="我的评论" key="1">
                                    <ul>
                                        {commentList}
                                    </ul>
                                </TabPane>
                                <TabPane tab="我的收藏" key="2">
                                    <ul>
                                        {collectionsList}
                                    </ul>
                                </TabPane>
                                <TabPane tab="上传图片" key="3">
                                    <Upload
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                        multiple
                                    >
                                        {uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>

                                </TabPane>

                            </Tabs>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>

            )

    }
}
export default UserCenter