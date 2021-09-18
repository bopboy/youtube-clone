import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {
    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)
    useEffect(() => {
        const variables = { userTo: props.userTo }
        Axios.post('/api/subscribe/subscribeNumber', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setSubscribeNumber(response.data.subscribeNumber)
                } else alert('구독자수 정보 가져오기 실패')
            })
        const subscribedVariables = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }
        Axios.post('/api/subscribe/subscribed', subscribedVariables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setSubscribed(response.data.subscribed)
                } else alert('구독 여부 가져오기 실패')
            })
    }, [])
    const onSubscribe = () => {
        const subscribedVariable = { userTo: props.userTo, userFrom: props.userFrom }
        if (Subscribed) {
            Axios.post('/api/subscribe/unsubscribe', subscribedVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else alert('구독 취소 실패')
                })
        } else {
            Axios.post('/api/subscribe/subscribe', subscribedVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else alert('구독 실패')
                })
        }
    }
    return (
        <div>
            <button
                style={{ background: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px', color: 'white', padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase' }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
