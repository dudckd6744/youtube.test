import React, { useEffect, useState } from 'react'
import {Row, Col, Avatar, List} from 'antd';
import Axios from'axios';
import SideVideo from './sections/SideVideo';
import Subscribe from './sections/Subscribe';
import Comment from './sections/Comment';
import LikeDislike from"./sections/LikeDislike";
function VideoDetailPage(props) {
    const videoId = props.match.params.videoId
    const variable ={videoId:videoId};

    const [Comments, setComments] = useState([])
    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setVideoDetail(response.data.videoDetails)
            }else{
                alert("get video false!!!")
            }
        })

        Axios.post('/api/comment/getComments', variable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data.result)
                setComments(response.data.result)
            }else{
                alert("get comments false!!!")
            }
        })
    }, [])

    const refreshFunction=(newComment)=> {
        setComments(Comments.concat(newComment))
    }
    if(VideoDetail.writer){
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') &&
        <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />
        return (
            <Row gutter={(16,16)}>
                <Col lg={18} xs={24}>
                    <div style={{ width:"100%", padding:"3rem 1rem"}}>
                        <video
                            style={{width:"100%"}}
                            src={`http://localhost:5000/${VideoDetail.filePath}`}
                            controls
                        />
                        <List.Item
                        actions={[<LikeDislike userId={localStorage.getItem("userId")} videoId={videoId}/> , subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>'
                        <div style={{ width:"100%"}}>
                        <Comment refreshFunction={refreshFunction}commentLists={Comments}videoId={videoId}/>
                        </div>
                    
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo/>
                </Col>
            </Row>
        )
    }else{
        return(
        <h2>Loading...</h2>
        )
    }
    
}

export default VideoDetailPage
