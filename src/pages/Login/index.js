import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Input,Button,Toast } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import{login} from'../../api/auth'
import './index.css';

function Login() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate();
  const toRegister = () => {
    navigate('/Register');  // 跳转到 /Register 页面
  };
  const handleLogin = async (val) => {
    let res = await login(val)
    if(res?.success){
      Toast.show({
        icon: 'success',
        content: 'Login successfully!',
      })
    }
  }
  return (
    <div className="Login">
        {/* login form */}
        <Form 
            className='login-form'
            layout='horizontal'
            onFinish={handleLogin}
            footer={
                <Button block type='submit' color='primary' size='large'>
                Login
                </Button>
            }>
          <Form.Item 
            label='Email' 
            name='email'
            rules={[{ required: true, message: 'Email is required!' }]}>
            <Input placeholder='Email' clearable />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Password is required!' }]}
            extra={
              <div className="eye">
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            }
          >
            <Input
              placeholder='Password'
              clearable
              type={visible ? 'text' : 'password'}
            />
          </Form.Item>
        </Form>

        <p className='text' onClick={toRegister}>Didn't have an account? Sign Up</p>
    </div>
  );
}

export default Login;
