import React from 'react'

export default class animate extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="ani-box">
                <img src="src/assets/images/face.jpg" width="100" className="animated fadeInUp lastPic" />
                <span className="animated flipInX ege">我的头像</span>
            </div>
        )
    }
}