import React, {useState} from 'react'
import { Form, Input, Button, Checkbox, Switch } from 'antd';
import 'antd/dist/antd.css';

const layout = {
    labelCol: {
        span: 12,
    },
    wrapperCol: {
        span: 5,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 12,
    },
};

function Login() {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Success:', values);

        const response = await fetch('/api/users/login', {
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

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

            <Form.Item
                label="Login"
                name="mobile_or_email"
                rules={[ { required: true, message: 'Please input your e-mail!'} ]}>
                <Input placeholder="E-mail or phone number" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[ { required: true, message: 'Please input your password!'} ]}>
                <Input />
            </Form.Item>


            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}


export default Login
