import React from 'react'
import {Table, Icon} from 'antd'

export default class aTable extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            tData: [],
            selectedRowKeys: []
        }
    }
    componentDidMount () {
        const data = []
        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                name: `table${i}`,
                age: 18,
                address: `杨高南路${i}号`,
                remark: 'http://www.baidu.com',
                operate: '暂无'
            })
        }
        this.setState({
            tData: data
        })
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }
    render() {
        const columns = [{
            title: '姓名',
            width: '20%',
            dataIndex: 'name'
        }, {
            title: '年龄',
            width: '20%',
            dataIndex: 'age'
        }, {
            title: '住址',
            width: '20%',
            dataIndex: 'address'
        }, {
            title: '备注',
            width: '20%',
            dataIndex: 'remark',
            render (text) {
                return <a href={text} target="_blank">百度</a>
            }
        }, {
            title: '操作',
            width: '20%',
            dataIndex: 'name'
        }]

        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const pagination = {
            total: this.state.tData.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize){
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }
        return (
            <Table rowSelection={rowSelection}
                   columns={columns}
                   dataSource={this.state.tData}
                   bordered
                   pagination={pagination}
            />
        )
    }
}