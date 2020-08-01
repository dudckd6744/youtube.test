import React, { useEffect, useState } from 'react'
import { Card, Icon, Avatar, Col, Typography, Row} from 'antd';
import Axios from 'axios';
import moment from 'moment';
import { response } from 'express';

const {Title} = Typography;
const {Meta} = Card;

function LandingPage() {
    const [Video, setVideo] = useState(initialState)
    
    useEffect(() => {
        Axios.get('/api/video/getVideo')
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setVideo(response.data.videos)
                }else{
                    alert('video get is false!')
                }
        })
    }, [])

    

    return (
            <div style={{width:"85%", margin:"3rem auto"}}>
                <Title level={2}>Recomended</Title>
                <hr />
                <Row gutter={[32,16]}>
                    {}
                </Row>
            </div>
    )
}

export default LandingPage
