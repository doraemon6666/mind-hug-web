import React, { useState } from 'react'
import { Form, Input,Button,Selector,DatePicker,ImageUploader, Space, Toast, Dialog } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import dayjs from 'dayjs'
import { registerAsClient,registerAsPsychologist } from '../../api/auth'
import './index.css';

function Register() {
  const [visible, setVisible] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isIdentityFormVisible, setIsIdentityFormVisible] = useState(false);
  const [isClientFormVisible, setIsClientFormVisible] = useState(false);
  const [currentIdentity, setCurrentIdentity] = useState(1);
  const [userInfo,setUserInfo] = useState({});
  const options = [
    {
      label: 'Client',
      description: 'Seek Mental Health Support',
      value: 1,
    },
    {
      label: 'Therapist',
      description: 'Offer Counseling and Guidance',
      value: 2,
    }
  ]
   // 密码校验规则
   const passwordRules = [
    // { required: true, message: '请输入密码' },
    {
      validator: (_, value) => {
        if (!value) {
          return Promise.reject('Password is required!');
        }
        if (value.length < 8) {
          return Promise.reject('The password must be at least eight characters long.');
        }
        if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
          return Promise.reject('The password must contain both letters and numbers.');
        }
        return Promise.resolve();
      },
    },
  ];
  // submit register form
  const onFinish = (val) => {
    console.log('Received values of form:', val);
    // hide form
    setIsFormVisible(false);
    setIsIdentityFormVisible(true)
    setUserInfo({...val})
  }

  // select identity
  const selectIdentity = (val) => {
    console.log('Received values of identity:', val);
    // hide form
    setIsClientFormVisible(true)
    setIsIdentityFormVisible(false) 
  }
  const onChangeIdentity = (arr, extend) => {
    console.log(arr, extend.items)
    setCurrentIdentity(arr[0])
    // setIsClientFormVisible(arr[0] === 1)
  }
  // upload image
  const [fileList, setFileList] = useState([
   
  ])
  // register as Psychologist
  const handleRegister = async (val) => {
    let params = {
      ...userInfo,
      dateOfBrith: dayjs(val.dateOfBrith).format('YYYY-MM-DD'),
      gender: val?.gender[0],
    }
    if(currentIdentity === 1){
      // params = {
      //   ...userInfo,
      //   dateOfBrith: dayjs(val.dateOfBrith).format('YYYY-MM-DD'),
      //   gender: val?.gender[0],
      // }
      console.log(params,'handleRegister---------------')
      let res = await registerAsClient(params)
      if(res?.userId){
        Toast.show({
          icon: 'success',
          content: 'Refister successfully!',
        })
      } else {
        Toast.show({
          icon: 'fail',
          content: res?.message,
        })
      }
    } else {
      let res = await registerAsPsychologist(params)
      if(res?.userId){
        Toast.show({
          icon: 'success',
          content: 'Refister successfully!',
        })
      } else {
        Toast.show({
          icon: 'fail',
          content: res?.message,
        })
      }
    }
  }

  // upload image
  const upload =  (file) =>{
    return {
      url: URL.createObjectURL(file),
    }
  }
  const handleUploadChange = (info) => {
    const updatedList = info.fileList.map(file => ({
      // ...file,
      // url: file.url || file.response?.url,  // 确保每个文件对象包含 `url`
    }));
    setFileList(updatedList); // 更新文件列表
  };
  return (
    <div className="Register">
        {/* refister form */}
        {
          isFormVisible && (
            <Form 
            className='register-form'
              layout='horizontal'
              onFinish={onFinish}
              footer={
                  <Button block type='submit' color='primary' size='large'>
                  Next
                  </Button>
              }>
            <Form.Item 
              label='Email' 
              name='email'
              rules={[{ required: true, message: 'Email is required!' },{ type: 'email', message: 'Please enter a valid email address' },]}>
              <Input placeholder='account' clearable />
            </Form.Item>
            <Form.Item 
              label='Username' 
              name='username'
              rules={[{ required: true, message: 'Username is required!' }]}>
              <Input placeholder='username' clearable />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={passwordRules}
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
                placeholder='password'
                clearable
                type={visible ? 'text' : 'password'}
              />
            </Form.Item>
          </Form>
          )
        }
        {/* select identity */}
        {
          isIdentityFormVisible &&(
            <div className='identity'>
              <p className='text'>Please select your identity.</p>
              <Form 
                layout='horizontal'
                onFinish={selectIdentity}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                    Next
                    </Button>
                }>
                <Selector
                  style={{
                    '--border-radius': '100px',
                    '--border': 'solid transparent 1px',
                    '--checked-border': 'solid var(--adm-color-primary) 1px',
                    '--padding': '8px 24px',
                  }}
                  showCheckMark={false}
                  options={options}
                  defaultValue={['1']}
                  onChange={onChangeIdentity}
                />
              </Form>
            </div>
          )
        }
        {
          isClientFormVisible && (
            <div>
               {/* client identity form */}
        {
           (isClientFormVisible && currentIdentity === 1) && (
            <Form
              name='form'
              onFinish={handleRegister}
              footer={
                <Button block type='submit' color='primary' size='large'>
                  Register
                </Button>
              }
            >
              <Form.Item name='address' label='Address' help='address'>
                <Input placeholder='address' />
              </Form.Item>

              <Form.Item
                name='birthday'
                label='Birthday'
                trigger='onConfirm'
                onClick={(e, datePickerRef) => {
                  datePickerRef.current?.open()
                }}
              >
                <DatePicker>
                  {value =>
                    value ? dayjs(value).format('YYYY-MM-DD') : 'birthday'
                  }
                </DatePicker>
              </Form.Item>
              <Form.Item name='gender' label='Gender'>
                <Selector
                  columns={3}
                  options={[
                    { label: 'Female', value: 1 },
                    { label: 'Male', value: 2 },
                  ]}
                />
              </Form.Item>
            </Form>
           )
        }
        {/* Psychologist identity form  */}
        {
            (isClientFormVisible && currentIdentity === 2) && (
              <Form
                name='form'
                onFinish={handleRegister}
                footer={
                  <Button block type='submit' color='primary' size='large'>
                    Register
                  </Button>
                }
              >
                  <Form.Item name='address' label='Address' help='address'>
                    <Input placeholder='address' />
                  </Form.Item>

                  <Form.Item
                    name='birthday'
                    label='Birthday'
                    trigger='onConfirm'
                    onClick={(e, datePickerRef) => {
                      datePickerRef.current?.open()
                    }}
                  >
                    <DatePicker>
                      {value =>
                        value ? dayjs(value).format('YYYY-MM-DD') : 'birthday'
                      }
                    </DatePicker>
                  </Form.Item>
                  <Form.Item name='gender' label='Gender'>
                    <Selector
                      columns={3}
                      options={[
                        { label: 'Female', value: 1 },
                        { label: 'Male', value: 2 },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item  name='documentation' label=' please submitted qualification documentation'>
                    <ImageUploader
                      value={fileList}
                      onChange={setFileList}
                      upload={upload}
                    />
                  </Form.Item>
              </Form>
            )
        }
            </div>
          )
        }
       
       
    </div>
  );
}

export default Register;
