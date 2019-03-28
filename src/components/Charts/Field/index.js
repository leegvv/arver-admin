import React from 'react';
import styles from './index.module.less';

const Field = ({label, value, ...rest}) => {
    return (
        <div className={styles.field} {...rest}>
            <span className={styles.label}>{label}</span>
            <span className={styles.number}>{value}</span>
        </div>
    );
};

export default Field;