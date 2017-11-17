import React from 'react'
import {render} from 'react-dom'

import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router'

import {Menu, Icon, Switch} from 'antd'

const SubMenu = Menu.SubMenu

import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'

import './main.css'

import Table from './components/table'
import Form from './components/form'
import Chart from './components/chart'
import Calendar from './components/calendar'
import Animate from './components/animate'
import Card from './components/card'

const ACTIVE = {color: 'red'}

class Sider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '',
            username: ''
        }
    }

    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        this.setState({
            username: 'zhaojianqiao'
        })
    }

    render() {
        return (
            <div>
                <div id="leftMenu">
                    <img src="src/assets/images/logo.png" width="50" id="logo"/>
                    <Menu theme="dark"
                          onClick={this.handleClick}
                          style={{width: 185}}
                          defaultOpenkeys={['sub1', 'sub2']}
                          defaultSelecteKeys={[this.state.current]}
                          mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail"/><span>sub1</span></span>}>
                            <Menu.Item key="1"><Link to="/Table">表格</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/Form">表单</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/Chart">图表</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/Calendar">日历</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>sub2</span></span>}>
                            <Menu.Item key="5"><Link to="/Card">导航</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/Animate">关注</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div id="rightWrap">
                    <Menu mode="horizontal">
                        <SubMenu  title={<span><Icon type="user" />{ this.state.username }</span>}>
                            <Menu.Item key="setting:1">退出</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}




render((
    <Router history={hashHistory}>
        <Route path="/" component={Sider}>
            <IndexRoute path="Card" component={Card} />
            <Route path="Table" component={Table} />
            <Route path="Form" component={Form} />
            <Route path="Chart" component={Chart} />
            <Route path="Calendar" component={Calendar} />
            <Route path="Animate" component={Animate} />
            <Route path="Card" component={Card} />
        </Route>
    </Router>
),document.getElementById('app'))