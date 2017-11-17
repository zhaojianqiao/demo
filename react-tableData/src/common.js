import React from 'react';
import Header from './header'
import TableTh from './tableTh'
import Detail from './detail'
import Footer from './footer'

import Staff from './staff.js'
class App extends React.Component {
    constructor () {
        super();
        this.state = {
            staff: new Staff,
            staffDetail: null
        }
    }
    addStaffItem(item){
        this.setState({
            staff: this.state.staff.addStaffItem(item)
        });
    }
    removeStaffItem(key){
        this.setState({
            staff: this.state.staff.removeStaffItem(key)
        })
    }
    detailStaffItem(key){
        this.setState({
            staffDetail: this.state.staff.staff.filter(item => {
                return item.key == key;
            })[0]
        })
    }
    closeDetail(){
        this.setState({
            staffDetail: null
        })
    }
    editDetail(item){
        this.setState({
            staff: this.state.staff.editStaffItem(item)
        })
    }
    sortStaff(sortType){
        this.setState({
            staff: this.state.staff.sortStaff(sortType)
        })
    }
    filtStaff(fillType){
        this.setState({
            staff: this.state.staff.filtStaff(fillType)
        })
    }
    searchStaff(word){
        this.setState({
            staff: this.state.staff.searchStaff(word)
        })
    }
    render(){
        return(
            <div>
                <Header sortStaff={this.sortStaff.bind(this)} filtStaff={this.filtStaff.bind(this)} searchStaff={this.searchStaff.bind(this)}/>
                <TableTh items={this.state.staff.staff} removeStaffItem={this.removeStaffItem.bind(this)} detailStaffItem={this.detailStaffItem.bind(this)} />
                <Detail staffDetail={this.state.staffDetail}  closeDetail={this.closeDetail.bind(this)} editDetail={this.editDetail.bind(this)} />
                <Footer addStaffItem={this.addStaffItem.bind(this)} />
            </div>
        )
    }
}

React.render(<App />, document.getElementById('app'))