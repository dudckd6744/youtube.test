import React, { useEffect, useState } from 'react'
import {Tooltip, Icon} from "antd";
import Axios from 'axios';

function LikeDislike(props) {

    const [Likeis, setLikeis] = useState(0)
    const [DisLikeis, setDisLikeis] = useState(0)
    const [DislikeAciton, setDislikeAciton] = useState(null)
    const [LikeAction, setLikeAction] = useState(null)

    var variable={}

    if(props.videoId){
        variable = {videoId:props.videoId , userId:props.userId}
    }else{
        variable={ commentId:props.commentId ,  userId:props.userId}
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes',variable)
        .then(response=>{
            if(response.data.success){
                setLikeis(response.data.likes.length)
                response.data.likes.map(like=> {
                    if(like.userId === props.userId){
                        setLikeAction("liked")
                    }
                })
            }else{
                alert("getLikes false!!")
            }
        })

        Axios.post('/api/like/getDislikes',variable)
        .then(response=>{
            if(response.data.success){
                setDisLikeis(response.data.Dislikes.length)
                response.data.Dislikes.map(dislike=> {
                    if(dislike.userId === props.userId){
                        setDislikeAciton("Disliked")
                    }
                })
            }else{
                alert("getLikes false!!")
            }
        })
    }, [])
    const onlike =() =>{
        if(LikeAction === null){
        Axios.post('/api/like/uplike',variable)
        .then(response=>{
            if(response.data.success){
                setLikeis(Likeis + 1)
                setLikeAction("liked")
                if(DislikeAciton !== null){
                    setDisLikeis(DisLikeis -1)
                    setDislikeAciton(null)
                }
            }else{
                alert('uplike false!!')
            }
        })
    }else{
        Axios.post('/api/like/unlike',variable)
        .then(response=>{
            if(response.data.success){
                setLikeis(Likeis - 1)
                setLikeAction(null)
            }else{
                alert('unlike false!!')
            }
        })
    }
    }
    const ondislike =()=>{
        if(DislikeAciton === null){
            Axios.post('/api/like/updislike',variable)
        .then(response=>{
            if(response.data.success){
                setDisLikeis(DisLikeis + 1)
                setDislikeAciton("Disliked")
                if(LikeAction !== null){
                    setLikeis(Likeis -1)
                    setLikeAction(null)
                }
            }else{
                alert('uplike false!!')
            }
        })
    }else{
        Axios.post('/api/like/undislike',variable)
        .then(response=>{
            if(response.data.success){
                setDisLikeis(DisLikeis - 1)
                setDislikeAciton(null)
            }else{
                alert('unlike false!!')
            }
        })
    }
    }

    return (
        <div>
        <span >
                <Tooltip title ="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled':'outlined'}
                        onClick={onlike}
                    />
                </Tooltip>
                <span style={{ paddingLeft:"3px",paddingRight:"8px", cursor:"auto" }}>{Likeis}</span>
            </span>

            <span >
                <Tooltip title ="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAciton === "Disliked" ? 'filled':'outlined'}
                        onClick={ondislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft:"3px",paddingRight:"8px" , cursor:"auto"}}>{DisLikeis}</span>
            </span>
        </div>
    )
}

export default LikeDislike
