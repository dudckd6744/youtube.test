import React, { useEffect, useState } from 'react'
import {Row, Col, Avatar, List} from 'antd';
import Axios from'axios';
// import { Video } from '../../../../../server/models/Vidoe';

function VideoDetailPage(props) {
    const videoId = props.match.params.videoId
    const variable ={videoId:videoId};

    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
        .then(response=>{
            if(response.data.success){
                setVideoDetail(response.data.videoDetails)
            }else{
                alert("get video false!!!")
            }
        })
    }, [])
    if(VideoDetail.writer){
        return (
            <Row gutter={(16,16)}>
                <Col lg={18} xs={24}>
                    <div style={{ width:"100%", padding:"3rem 4rem"}}>
                        <video
                            style={{width:"100%"}}
                            src={`http://localhost:5000/${VideoDetail.filePath}`}
                            controls
                        />
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                        {/* COMMENt */}
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    Side Videos
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
