import React, {useState} from 'react';
import styles from './index.module.less';
import {SelectLang} from '@/components';
import {LoginForm, ProFormText} from '@ant-design/pro-components';
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
                    />
                </>
            )
        },
        {
            label: '手机号登录',
            key: 'mobile'
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
