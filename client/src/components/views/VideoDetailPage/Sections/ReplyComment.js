import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComment, setOpenReplyComment] = useState(false)
    useEffect(() => {
        let commentNumber = 0
        props.commentsList.map((comment) => {
            if (comment.responseTo === props.parentCommentId) commentNumber += 1
        })
        setChildCommentNumber(commentNumber)
    }, [props.commentsList])
    const renderReplyComment = (parentCommentId) => (
        props.commentsList.map((comment, index) => (
            comment.responseTo === parentCommentId &&
            <div key={index} style={{ width: '80%', marginLeft: '50px' }}>
                <SingleComment videoId={props.videoId} comment={comment} refreshFunction={props.refreshFunction} />
                <ReplyComment commentsList={props.commentsList} videoId={props.videoId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
            </div>
        ))
    )
    const onHandleChange = () => { setOpenReplyComment(!OpenReplyComment) }
    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange}>
                    View {ChildCommentNumber} more comment(s)
                </p>
            }
            {OpenReplyComment && renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
