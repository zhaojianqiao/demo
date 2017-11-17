import React from 'react'
import {Card} from 'antd'

import 'whatwg-fetch'

export default class card extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lists: []
        }
    }
    fetchFn = () => {
        fetch('../../bigData.json')
            .then((res) => {return res.json()})
            .then((data) => {this.setState({lists:data.listData})})
            .catch((e) => { console.log(e.message) })
    }
    componentDidMount () {
        this.fetchFn()
    }
    render() {
        return(
            <Card title="资源导航" style={{ width: "800px", margin: "0 auto" }} className="animated zoomIn">
                {
                    this.state.lists.map((e) => {
                        return (
                            <p className="doclist"><a href={ e.url } target="_blank">{ e.title }</a></p>
                        )
                    })
                }
            </Card>
        )
    }
}