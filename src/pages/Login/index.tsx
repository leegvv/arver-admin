import React, {useState} from 'react';
import styles from './index.module.less';
import {SelectLang} from '@/components';
import {LoginForm, ProFormText, ProFormCheckbox, ProFormCaptcha} from '@ant-design/pro-components';
import {UserOutlined, LockOutlined, MobileOutlined} from '@ant-design/icons';
import {Tabs, message} from 'antd';
import {getFakeCaptcha, login, currentUser} from '@/api';

const Login: React.FC = () => {
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');

    const items = [
        {
            label: '账号密码登录',
            key: 'account',
            children: (
                <>
                    <ProFormText
                        name='usename'
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined/>
                        }}
                        placeholder='用户名'
                        rules={[
                            {required: true, message: '请输入用户名！'}
                        ]}
                    />
                    <ProFormText.Password
                        name='password'
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined/>
                        }}
                        placeholder='密码'
                        rules={[
                            {required: true, message: '请输入密码！'}
                        ]}
                    />
                </>
            )
        },
        {
            label: '手机号登录',
            key: 'mobile',
            children: (
                <>
                    <ProFormText
                        fieldProps={{
                            size: 'large',
                            prefix: <MobileOutlined/>
                        }}
                        name='mobile'
                        placeholder='手机号'
                        rules={[
                            {required: true, message: '请输入手机号！'},
                            {pattern: /^1\d{10}$/, message: '手机号格式错误！'}
                        ]}
                    />
                    <ProFormCaptcha
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined/>
                        }}
                        captchaProps={{
                            size: 'large'
                        }}
                        placeholder='请输入验证码'
                        captchaTextRender={(timing, count) => {
                            if (timing) {
                                return count + '秒';
                            }
                            return '获取验证码';
                        }}
                        name='captcha'
                        rules={[
                            {required: true, message: '请输入验证码！'}
                        ]}
                        onGetCaptcha={async (phone) => {
                            const result = await getFakeCaptcha({phone});
                            console.log(result);
                            /* if (result === false) {
                                return;
                            } */
                            message.success('获取验证码成功！验证码为：1234');
                        }}
                    />
                </>
            )
        }
    ];
    const handleSubmit = async (values: API.LoginParam) => {
        console.log(111111);
        console.log(values);
        const msg = await login({...values, type});
        console.log(msg);
        if (msg.status === 'ok') {
            message.success('登录成功');
        }
        const user = await currentUser();
        console.log(user);
    };
    return (
        <div className={styles.container}>
            <div className={styles.lang}>
                <SelectLang/>
            </div>
            <div className={styles.content}>
                <LoginForm
                    logo={<img alt='logo' src='/logo.svg'/>}
                    title='Ant Design'
                    subTitle='Ant Design 是西湖区最具影响力的 Web 设计规范'
                    initialValues={{autoLogin: true}}
                    onFinish={async (values) => {
                        console.log('0000000');
                        await handleSubmit(values);
                    }}
                >
                    <Tabs
                        activeKey={type}
                        onChange={setType}
                        items={items}
                    />
                </LoginForm>
            </div>
        </div>
    );
};

export default Login;
