import React, { useEffect ,useState} from 'react'
import SingleComment from './SingleComment';


function ReplyComment(props) {

    const [commentNumbers, setcommentNumbers] = useState(0)
    const [OpenReplyComment, setOpenReplyComment] = useState(false)

    useEffect(() => {

        var commentNumber = 0;

        props.commentLists.map((comment)=>{
            if(comment.responseTo === props.parentCommentId)
                commentNumber ++ 
                return null;
    })
        setcommentNumbers(commentNumber)
        
    }, [props.parentCommentId,props.commentLists])

    const renderReplyComment=(parentCommentId)=>
        props.commentLists.map((comment,index)=>(
            <React.Fragment key={index} >
            {
            comment.responseTo === parentCommentId && (
                <div style={{ width:"80%", marginLeft:"40px"}}>
                    <SingleComment refreshFunction={props.refreshFunction}comments= {comment} videoId={props.videoId}/>
                    <ReplyComment refreshFunction={props.refreshFunction} videoId={props.videoId} parentCommentId={comment._id} commentLists={props.commentLists}/>
                </div>)
            }
            </React.Fragment>
        ))
    
    const onClickChange =()=>{
        setOpenReplyComment(!OpenReplyComment)
    }


    return (
        <div>
            {commentNumbers > 0 &&
            <p style={{fontSize:"14px",margin:'0', color:"blue"}} onClick={onClickChange}>
                -View {commentNumbers} more comment(s)
            </p>
            }
            {OpenReplyComment &&
                renderReplyComment(props.parentCommentId)
            }
            <hr style={{width:"90%", marginLeft:"0"}}/>
        </div>
    )
}

export default ReplyComment
