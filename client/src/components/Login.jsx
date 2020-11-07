import {NavLink, useHistory} from 'react-router-dom';
import { Form, Input, Button, Divider } from 'antd';
import 'antd/dist/antd.css';

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 4 }
};
const tailLayout = {
    wrapperCol: {offset: 7, span: 10}
};

function Login() {
    const history = useHistory();
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
        console.log(body);

        history.push("/dashboard")
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
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
                        Log in
                    </Button>
                </Form.Item>
            </Form>

            <Divider>Or</Divider>

            <p>Don't have an account? <NavLink to="/registration">Sing up</NavLink></p>
        </div>
    )
}


export default Login
