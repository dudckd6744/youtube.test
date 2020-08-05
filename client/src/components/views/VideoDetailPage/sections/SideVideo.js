import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function SideVideo() {

    const [SideVideos, setSideVideos] = useState([])

    useEffect(() => {

        Axios.get('/api/video/getVideos')
        .then(response=>{
            if(response.data.success){
                setSideVideos(response.data.videos)
            }else{
                alert('get Videos false!!')
            }
        })
        
    }, [])

    const renderSideVideos = SideVideos.map((video, index)=> {
        var minutes = Math.floor(video.duration / 60)
        var seconds = Math.floor(video.duration - minutes * 60)

        if(minutes < 10){
            minutes = `0${minutes}`
        }
        if(seconds < 10){
            seconds = `0${seconds}`
        }

        return(
            <div key={index} style={{display:"flex", marginBottom:"2rem", padding:"0 1rem"}}>
                <div style={{ width:"525px", marginLeft:"0rem"}}>
                    <a href ={ `/video/${video._id}`}>
                        <img
                            style={{ width:"197px",height:"100px"}}
                            src={`http://localhost:5000/${video.thumbnail}`}
                            alt="thubmail"
                        />
                        <div className="durations">
                        <span>{minutes} : {seconds}</span>
                    </div>
                    </a>
                    
                </div>
                
                
                <div style={{ width:"670px" ,marginTop:"-6px", marginLeft:"8px"}}>
                <a href ={ `/video/${video._id}`} style={{color:"gray"}}>
                    <span style={{ fontSize:"1rem",fontWeight:"Bold", color:"gary"}}>{video.title}</span>
                    <br />
                    <span>{video.writer.name}</span>
                    <br />
                    <span>{video.views}view</span>
                    <br />
                    <span>{minutes} : {seconds}</span>
                </a>
                </div>
            </div>
        )

    })

    return (
        <div style={{ marginTop:"3rem"}}>
            {renderSideVideos}
        </div>
    )
}

export default SideVideo
