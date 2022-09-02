import React from 'react';
import styles from './index.module.less';
import {SelectLang} from '@/components';
import {LoginForm} from '@ant-design/pro-components';

const Login: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.lang}>
                <SelectLang/>
            </div>
            <div className={styles.content}>
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;
