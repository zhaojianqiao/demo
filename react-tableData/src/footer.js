import React from 'react'
export default class Footer extends React.Component {
    handlerAddClick (e) {
        e.preventDefault();
        let item = {};
        let addForm = React.findDOMNode(this.refs.addForm);
        let sex = addForm.querySelector('#staffAddSex');
        let id = addForm.querySelector('#staffId');
        item.name = addForm.querySelector('#staffAddName').value.trim();
        item.age = addForm.querySelector('#staffAddAge').value.trim();
        item.descrip = addForm.querySelector('#staffAddDescrip').value.trim();
        item.sex = sex.options[sex.selectedIndex].value;
        item.id = id.options[id.selectedIndex].value;
        if(item.name=='' || item.age=='' || item.descrip=='') {
            let tips = React.findDOMNode(this.refs.tipsUnDone);
            tips.style.display = 'block';
            setTimeout(function(){
                tips.style.display = 'none';
            }, 1000);
            return;
        }
        let numReg = /^\d+$/;
        if(!numReg.test(item.age) || parseInt(item.age)>150) {
            let tips = React.findDOMNode(this.refs.tipsUnAge);
            tips.style.display = 'block';
            setTimeout(function(){
                tips.style.display = 'none';
            }, 1000);
            return;
        }

        this.props.addStaffItem(item);
        addForm.reset();
        let tips = React.findDOMNode(this.refs.tips);
        tips.style.display = 'block';
        setTimeout(function(){
            tips.style.display = 'none';
        }, 1000);
    }
    render(){
        return (
            <div>
                <h4 style={{'text-align':'center'}}>人员新增</h4>
                <hr/>
                <form ref="addForm" className="addForm">
                    <div>
                        <label for="staffAddName" style={{'display': 'block'}}>姓名</label>
                        <input type="text" ref="addName" id="staffAddName" placeholder="请输入你的名字"/>
                    </div>
                    <div>
                        <label for="staffAddAge" style={{'display': 'block'}}>年龄</label>
                        <input type="text" ref="addAge" id="staffAddAge" placeholder="请输入你的年龄"/>
                    </div>
                    <div>
                        <label for="staffAddSex" style={{'display': 'block'}}>性别</label>
                        <select ref="addSex" id="staffAddSex">
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                    </div>
                    <div>
                        <label for="staffAddId" style={{'display': 'block'}}>身份</label>
                        <select ref="addId" id="staffId">
                            <option value='主任'>主任</option>
                            <option value='老师'>老师</option>
                            <option value='学生'>学生</option>
                            <option value='实习'>实习</option>
                        </select>
                    </div>
                    <div>
                        <label for='staffAddDescrip' style={{'display': 'block'}}>个人描述</label>
                        <textarea ref='addDescrip' id='staffAddDescrip' type='text'></textarea>
                    </div>
                    <p ref="tips" className='tips' >提交成功</p>
                    <p ref='tipsUnDone' className='tips'>请录入完整的人员信息</p>
                    <p ref='tipsUnAge' className='tips'>请录入正确的年龄</p>
                    <div>
                        <button onClick={this.handlerAddClick.bind(this)}>提交</button>
                    </div>
                </form>
            </div>
        )
    }
}