import React, {useState} from 'react';
import styles from './index.module.less';
import {SelectLang} from '@/components';
import {LoginForm, ProFormText, ProFormCheckbox, ProFormCaptcha} from '@ant-design/pro-components';
import {UserOutlined, LockOutlined, MobileOutlined} from '@ant-design/icons';
import {Tabs} from 'antd';

const Login: React.FC = () => {
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
                            return '获取验证码'
                        }}
                        name='captcha'
                        rules={[
                            {required: true, message: '请输入验证码！'}
                        ]}
                        onGetCaptcha={async (phone) => {
                            const result = await
                        }}
                    />
                </>
            )
        }
    ];
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
