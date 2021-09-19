import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd'
import Axios from 'axios'

function LikeDislike(props) {
    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikes, setDisLikes] = useState(0)
    const [DisLikeAction, setDisLikeAction] = useState(null)
    let variable = {}
    if (props.video) variable = { videoId: props.videoId, userId: props.userId }
    else variable = { commentId: props.commentId, userId: props.userId }
    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(response.data.likes.length)
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) setLikeAction('liked')
                    })
                } else alert('좋아요 정보 가져오기 실패')
            })
        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    setDisLikes(response.data.dislikes.length)
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) setDisLikeAction('disliked')
                    })
                } else alert('싫어요 정보 가져오기 실패')
            })
    }, [])
    const onLike = () => {
        if (LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        if (DisLikeAction !== null) {
                            setDisLikeAction(null)
                            setDisLikes(DisLikes - 1)
                        }
                    } else alert('좋아요 up 실패')
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else alert('좋아요 down 실패')
                })
        }
    }
    const onDislike = () => {
        if (DisLikeAction === null) {
            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDisLikes(DisLikes + 1)
                        setDisLikeAction('disliked')
                        if (LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else alert('싫어요 up 실패')
                })
        } else {
            Axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDisLikes(DisLikes - 1)
                        setDisLikeAction(null)
                    } else alert('싫어요 down 실패')
                })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon
                        type="like"
                        theme={LikeAction === 'liked' ? "filled" : "outlined"}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={DisLikeAction === 'disliked' ? "filled" : "outlined"}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {DisLikes} </span>
            </span>&nbsp;
        </div>
    )
}

export default LikeDislike