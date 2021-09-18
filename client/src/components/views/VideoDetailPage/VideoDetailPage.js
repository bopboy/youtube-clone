import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'

function VideoDetailPage(props) {
    const videoId = props.match.params.videoId
    const variables = { videoId }
    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setVideoDetail(response.data.videoDetail)
                }
                else alert('비디오 정보 가져오기 실패')
            })
    }, [])

    if (VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 2rem', margin: '0' }}>
                        <video
                            style={{ width: '100%' }}
                            src={`http://localhost:5000/${VideoDetail.filePath}`}
                            controls
                        />
                        <List.Item actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />]}>
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                // title={VideoDetail.writer.name}
                                title={VideoDetail.title}
                                description={VideoDetail.description}
                            />
                        </List.Item>
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
