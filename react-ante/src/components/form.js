import React from 'react'
import {Form, Input, Select, Checkbox, DatePicker, Col, Radio, Button, Modal, message} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class antForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    handleSelectChange = (value) => {
        console.log(`selected ${value}`)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log('收到表单值：', this.props.form.getFieldsValue())
        this.props.form.resetFields()
    }
    showModal = () => {
        this.setState({visible: true})
    }
    hideModal = () => {
        this.setState({visible: false})
    }

    render() {
        const {getFieldProps} = this.props.form
        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 6}
        }
        const success = () => {
            message.success('ok!')
        }
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    id="control-input"
                    label="输入框"
                    {...formItemLayout}
                    required>
                    <Input id="control-input" placeholder="Please enter..."
                           {...getFieldProps('userName')}/>
                </FormItem>

                <FormItem
                    label="日期选择框"
                    labelCol={{ span: 3 }}
                    required>
                    <Col span="2">
                        <FormItem>
                            <DatePicker {...getFieldProps('startDate')} />
                        </FormItem>
                    </Col>
                    <Col span="1">
                        <p className="ant-form-split">-</p>
                    </Col>
                    <Col span="2">
                        <FormItem>
                            <DatePicker {...getFieldProps('endDate')} />
                        </FormItem>
                    </Col>
                </FormItem>
                <FormItem
                    id="control-textarea"
                    label="文本域"
                    {...formItemLayout}>
                    <Input type="textarea" id="control-textarea" rows="3"
                           {...getFieldProps('content')} />
                </FormItem>
                <FormItem
                    label="Checkbox 多选框"
                    {...formItemLayout}
                >
                    <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem1')}>选项一</Checkbox>
                    <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem2')}>选项二</Checkbox>
                    <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem3')}>选项三</Checkbox>
                </FormItem>

                <FormItem
                    label="Radio 单选框"
                    {...formItemLayout} >
                    <RadioGroup defaultValue="a" {...getFieldProps('radioItem')}>
                        <Radio value="a">A</Radio>
                        <Radio value="b">B</Radio>
                        <Radio value="c">C</Radio>
                        <Radio value="d">D</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem wrapperCol={{ span: 6, offset: 3 }} style={{ marginTop: 24 }}>
                    <Button type="primary" htmlType="submit" onClick={success}>确定</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="ghost" onClick={this.showModal}>点击ta</Button>
                </FormItem>
                <Modal title="登录" visible={this.state.visible} onOk={this.hideModal} onCancel={this.hideModal}>
                   这是登录
                </Modal>
            </Form>
        )
    }
}
antForm = Form.create()(antForm)
export  default antForm