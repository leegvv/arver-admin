import React, {memo} from 'react';
import {Row, Col, Icon, Tooltip} from 'antd';
import {ChartCard, MiniArea, MiniBar, MiniProgress, Field} from '@/components/Charts'
import Trend from '@/components/Trend';
import intl from 'react-intl-universal';
import Yuan from '@/utils/Yuan';
import numeral from 'numeral';
import styles from './Analysis.module.less'

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
};

const IntroduceRow = memo(({loading, visitData}) => {
    return (
        <Row gutter={24}>
            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    title = {intl.get('app.analysis.total-sales')}
                    action={
                        <Tooltip
                            title={intl.get('app.analysis.introduce')}
                        >
                            <Icon type='info-circle-o'/>
                        </Tooltip>
                    }
                    loading={loading}
                    total={() => <Yuan>126560</Yuan>}
                    footer={
                        <Field
                            label={intl.get('app.analysis.day-sales')}
                            value={`￥${numeral(12423).format('0,0')}`}
                        />
                    }
                    contentHeight={46}
                >
                    <Trend flag='up' style={{marginRight: 16}}>
                        <span>{intl.get('app.analysis.week')}</span>
                        <span className={styles.trendText}>12%</span>
                    </Trend>
                    <Trend flag='down'>
                        {intl.get('app.analysis.day')}
                        <span className={styles.trendText}>11%</span>
                    </Trend>
                </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    loading={loading}
                    title = {intl.get('app.analysis.visits')}
                    action={
                        <Tooltip
                            title={intl.get('app.analysis.introduce')}
                        >
                            <Icon type='info-circle-o'/>
                        </Tooltip>
                    }
                    total={numeral(8846).format(0,0)}
                    footer={
                        <Field
                            label={intl.get('app.analysis.day-visits')}
                            value={numeral(1234).format(0, 0)}
                        />
                    }
                    contentHeight={46}
                >
                    <MiniArea color="#975FE4" data={visitData}/>
                </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    loading={loading}
                    title = {intl.get('app.analysis.payments')}
                    action={
                        <Tooltip
                            title={intl.get('app.analysis.introduce')}
                        >
                            <Icon type='info-circle-o'/>
                        </Tooltip>
                    }
                    total={numeral(6560).format(0,0)}
                    footer={
                        <Field
                            label={intl.get('app.analysis.conversion-rate')}
                            value='60%'
                        />
                    }
                    contentHeight={46}
                >
                    <MiniBar data={visitData}/>
                </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    loading={loading}
                    title = {intl.get('app.analysis.operational-effect')}
                    action={
                        <Tooltip
                            title={intl.get('app.analysis.introduce')}
                        >
                            <Icon type='info-circle-o'/>
                        </Tooltip>
                    }
                    total='78%'
                    footer={
                        <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                            <Trend flag='up' style={{marginRight: 16}}>
                                {intl.get('app.analysis.week')}
                                <span className={styles.trendText}>12%</span>
                            </Trend>
                            <Trend flag='down'>
                                {intl.get('app.analysis.day')}
                                <span className={styles.trendText}>11%</span>
                            </Trend>
                        </div>
                    }
                    contentHeight={46}
                >
                    <MiniProgress
                        percent={78}
                        strokeWidth={8}
                        target={80}
                        color='#13C2C2'
                    />
                </ChartCard>
            </Col>
        </Row>
    );
});

export default IntroduceRow;