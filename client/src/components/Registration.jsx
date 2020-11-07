import React, {useState} from 'react'
import { Form, Input, Button, Checkbox, Switch } from 'antd';
import 'antd/dist/antd.css';

const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 5 }
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 12 }
};
const firstNameCollection = ["Harry","Ross", "Bruce","Cook", "Carolyn","Morgan", "Albert","Walker", "Randy","Reed", "Larry","Barnes", "Lois","Wilson",
    "Jesse","Campbell", "Ernest","Rogers", "Theresa","Patterson", "Henry","Simmons", "Michelle","Perry", "Frank","Butler", "Shirley",
    "Brooks", "Rachel","Edwards", "Christopher","Perez", "Thomas","Baker", "Sara","Moore", "Chris","Bailey", "Roger","Johnson", "Marilyn","Thompson",
    "Anthony","Evans", "Julie","Hall", "Paula","Phillips", "Annie","Hernandez", "Dorothy","Murphy", "Alice","Howard"];

const lastNameCollection = ["Ruth","Jackson", "Debra","Allen", "Gerald","Harris", "Raymond","Carter", "Jacqueline","Torres", "Joseph","Nelson",
    "Carlos","Sanchez", "Ralph","Clark", "Jean","Alexander", "Stephen","Roberts", "Eric","Long", "Amanda","Scott", "Teresa","Diaz", "Wanda","Thomas"];


function Registration() {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Success:', values);
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const body = await response.json();
        console.log(body)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        const firstName = firstNameCollection[Math.floor(Math.random() * firstNameCollection.length)];
        const lastName = lastNameCollection[Math.floor(Math.random() * lastNameCollection.length)];
        form.setFieldsValue({
            name: firstName,
            email: firstName + '.' + lastName + '@gmail.com',
            mobile: '' + Math.floor(Math.random() * 1000000000),
            password: Math.random().toString(36).substring(7),
        });
    };

    const handlerSwitch = (value) => {
        form.setFieldsValue({
            userType: value ? 1 : 2
        });
    };

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

            <Form.Item
                label="Username"
                name="name"
                rules={[ { required: true, message: 'Please input your username!'} ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="E-mail"
                name="email"
                rules={[ { required: true, message: 'Please input your e-mail!'} ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone number"
                name="mobile"
                rules={[ { required: false, message: 'Please input your phone number!'} ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[ { required: true, message: 'Please input your password!'} ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Admin"
                name="userType"
                rules={[ { required: false, message: 'Please input your e-mail!'} ]}>
                <div align={"left"}>
                    <Switch onChange={value => handlerSwitch(value)} />
                </div>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                    Fill form
                </Button>
            </Form.Item>
        </Form>
    )
}


export default Registration
