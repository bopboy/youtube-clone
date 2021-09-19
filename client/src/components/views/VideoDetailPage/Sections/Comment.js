import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ReplyComment from './ReplyComment'
import SingleComment from './SingleComment'

function Comment(props) {
    const videoId = props.videoId
    const user = useSelector(state => state.user)
    const [commentValue, setcommentValue] = useState("")
    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const variables = {
            content: commentValue,
            writer: user.userData._id,
            videoId: videoId
        }
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
                    setcommentValue("")
                    props.refreshFunction(response.data.result)
                } else alert('댓글 저장 실패')
            })
    }
    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />
            {props.commentsList && props.commentsList.map((comment, index) => (
                (!comment.responseTo &&
                    <>
                        <SingleComment key={index} videoId={videoId} comment={comment} refreshFunction={props.refreshFunction} />
                        <ReplyComment commentsList={props.commentsList} parentCommentId={comment._id} videoId={videoId} refreshFunction={props.refreshFunction} />
                    </>
                )
            ))}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="댓글을 작성해주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
