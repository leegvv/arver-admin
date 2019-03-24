import React, {PureComponent} from 'react';
import {Card} from 'antd';
import styles from './index.module.less';
import classNames from 'classnames';

class ChartCard extends PureComponent {
    renderConnet = () => {
        const { contentHeight, title, avatar, action, total, footer, children, loading } = this.props;
        if (loading) {
            return false;
        }
        return (
            <div className={styles.chartCard}>
                <div
                    className={classNames(styles.chartTop, {
                        [styles.chartTopMargin]: !children && !footer
                    })}
                >
                    <div>{avatar}</div>
                    <div>
                        <div>
                            <span>{title}</span>
                            <span>{action}</span>
                        </div>
                    </div>
                </div>
                {children && (
                    <div>
                        <div>
                            {children}
                        </div>
                    </div>
                )}
                {footer && (
                    <div>
                        {footer}
                    </div>
                )}
            </div>
        );

    }
    render() {
        const {
            loading = false,
            contentHeight,
            title,
            avatar,
            action,
            total,
            footer,
            children,
            ...rest
        } = this.props;

        return (
            <Card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}>
                {this.renderConnet()}
            </Card>
        );
    }
}

export default ChartCard;