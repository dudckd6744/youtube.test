import React, { useState} from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment'

function Comment(props) {
    const videoId = props.videoId
    const user = useSelector(state => state.user)
    const [Commentvalue, setCommentvalue] = useState("")

    const commentChange=(e)=>{
        setCommentvalue(e.currentTarget.value)
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        const variable={
            content:Commentvalue,
            writer:user.userData._id,
            videoId:videoId
        }
        Axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
                props.refreshFunction(response.data.result)
                setCommentvalue("")
            }else{
                alert("save comment false!!")
            }
        })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />
            {/* Comment List */}
        
            {props.commentLists && props.commentLists.map((comments, index)=>(
                (!comments.responseTo && 
                <React.Fragment key={index}>
                <SingleComment refreshFunction={props.refreshFunction}comments= {comments} videoId={videoId}
                />
                <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comments._id} videoId={videoId} commentLists={props.commentLists}/>
                </React.Fragment>)
            )) }
            {/* Root Comment From */}

            <form style={{ display:"flex"}} onSubmit={onSubmit}>
                <textarea
                    style={{ width:"100%", borderRadius:"5px"}}
                    onChange={commentChange}
                    value={Commentvalue}
                    placeholder="코멘트를 작성하십쇼"
                />
                <br />
                <button style={{ width:"20%", height:"52px"}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
