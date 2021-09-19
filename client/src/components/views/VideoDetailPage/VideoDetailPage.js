import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'

function VideoDetailPage(props) {
    const videoId = props.match.params.videoId
    const variables = { videoId }
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setVideoDetail(response.data.videoDetail)
                }
                else alert('비디오 정보 가져오기 실패')
            })
        Axios.post('/api/comment/getComments', variables)
            .then(response => {
                if (response.data.success) {
                    setComments(response.data.comments)
                    console.log(response.data.comments)
                } else alert('댓글 정보 가져오기 실패')
            })
    }, [])
    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }
    if (VideoDetail.writer) {
        const userId = localStorage.getItem('userId')
        const subscribeButton = VideoDetail.writer._id !== userId && <Subscribe userTo={VideoDetail.writer._id} userFrom={userId} />
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 2rem', margin: '0' }}>
                        <video
                            style={{ width: '100%' }}
                            src={`http://localhost:5000/${VideoDetail.filePath}`}
                            controls
                        // autoPlay
                        />
                        <List.Item actions={[subscribeButton]}>
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                // title={VideoDetail.writer.name}
                                title={VideoDetail.title}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                        <Comment videoId={videoId} commentsList={Comments} refreshFunction={refreshFunction} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row >
        )
    } else return (<div>loading</div>)
}

export default VideoDetailPage
