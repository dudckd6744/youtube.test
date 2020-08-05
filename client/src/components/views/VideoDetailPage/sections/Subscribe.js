import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {
    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        var variable= { userTo: props.userTo}
        Axios.post('/api/subscribe/subscribeNumber',variable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setSubscribeNumber(response.data.subscribeNumber)
            }else{
                alert('subscribeNumber get false!!')
            }
        })
        var subscribeVariable={
            userTo:props.userTo,
            userFrom:localStorage.getItem('userId')
        }
        Axios.post('/api/subscribe/subscribed',subscribeVariable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setSubscribed(response.data.subscribed)
            }else{
                alert('Subscribe information get false!!')
            }
        })

    }, [props.userTo])

    const onSubscribe =()=>{
        var variable = {
            userTo:props.userTo,
            userFrom:localStorage.getItem('userId')
        }
        if(Subscribed){
            Axios.post('/api/subscribe/unSubscribe', variable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber -1)
                    setSubscribed(!Subscribed)
                }else{
                    alert('unSubscribe false!!')
                }
            })
        }else{
            Axios.post('/api/subscribe/Subscribe', variable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber +1)
                    setSubscribed(!Subscribed)
                }else{
                    alert('Subscribe false!!')
                }
        })
    }}

    return (
        <div>
            <button 
                style={{backgroundColor:`${Subscribed ? '#AAAAAA':"#CC0000"}`, borderRadius:"4px", color:"white", padding:"10px 16px",
            fontWeight:"500",fontSize:"1rem", textTransform:"uppercase"}}
            onClick={onSubscribe} >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
