import React, { useState } from 'react'
import { Comment, Avatar, Button} from 'antd';
import { useSelector} from 'react-redux';
import Axios from 'axios';
import LikeDislike from "./LikeDislike";

function SingleComment(props) {
    const user = useSelector(state => state.user)
    const [OpenReply, setOpenReply] = useState(false)
    const [Comments, setComments] = useState("")

    const onClickReplyOpne =()=>{
        setOpenReply(!OpenReply)
    }
    const onReplyChange =(e)=> {
        setComments(e.currentTarget.value)
    }
    
    const onSubmit=(e)=>{
        e.preventDefault();
        const variable={
            content:Comments,
            writer:user.userData._id,
            videoId:props.videoId,
            responseTo:props.comments._id
        }

        Axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
                props.refreshFunction(response.data.result)
                setComments("")
                setOpenReply(false)
            }else{
                alert("save comment false!!")
            }
        })
    }

    
    
    const actions=[
        <LikeDislike userId={localStorage.getItem("userId")} commentId={props.comments._id}/>,
        <span onClick={onClickReplyOpne} key="comment-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comments.writer.name}
                avatar={<Avatar arc={props.comments.writer.image} alt="image"/>}
                content={ <p>{props.comments.content}</p>}
            />


            {OpenReply &&
                <form style={{ display:"flex"}} onSubmit={onSubmit}>
                    <textarea
                        style={{ width:"100%", borderRadius:"5px"}}
                        onChange={onReplyChange}
                        value={Comments}
                        placeholder="코멘트를 작성하십쇼"
                    />
                    <br />
                    <Button style={{ width:"20%", height:"52px"}} onClick={onSubmit}>Submit</Button>
                </form>
            }
        </div>
    )       
}

export default SingleComment;
