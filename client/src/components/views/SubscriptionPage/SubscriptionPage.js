import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row} from 'antd';
import Axios from 'axios';
import moment from 'moment';

const {Title} = Typography;
const {Meta} = Card;

function LandingPage(props) {
    const [Video, setVideo] = useState([])
    
    useEffect(() => {

        const  varialbe={
            userTo: props.userTo,
            userFrom:localStorage.getItem('userId')
        }

        Axios.post('/api/video/getSubscriptionVideos',varialbe)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setVideo(response.data.videos)
                }else{
                    alert('video get is false!')
                }
        })
    }, [props.userTo])

    var renderCard = Video.map((video, index)=> {

        var minutes = Math.floor(video.duration/60);
        var seconds = Math.floor((video.duration - minutes * 60))
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        return( <Col key = {index} lg={6} md={8} xs={24}>
            <div  style={{ position:"relative"}}>
                <a href = {`/video/${video._id}`}>
                    <img style={{ width:"100%"}} src={`http://localhost:5000/${video.thumbnail}`} alt="lodinsg"/>
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
            </div>
            <br />
            <Meta 
                avatar={
                    <Avatar src={video.writer.image}/>
                }
                title={video.title}
            />
            <span>{video.writer.name}</span>
            <br/>
            <span style={{ marginLeft: '3rem'}}>{video.views} views</span> -
            <span>{moment(video.createdAt).format("MMMM Do ")}</span>
        </Col>);
    }) 
    return (
            <div style={{width:"85%", margin:"3rem auto"}}>
                <Title level={2}>Recomended</Title>
                <hr />
                <Row gutter={[32,16]}>

                    {renderCard}

                </Row>
            </div>
    )
}

export default LandingPage

