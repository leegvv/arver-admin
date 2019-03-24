import React, {memo} from 'react';
import {Row, Col, Icon, Tooltip} from 'antd';
import {ChartCard} from '@/components/Charts'
import intl from 'react-intl-universal';

const IntroduceRow = memo(({loading, visitData}) => {
    return (
        <Row gutter={24}>
            <Col>
                <ChartCard
                    bordered={true}
                    title = {intl.get('app.analysis.total-sales')}
                    action={
                        <Tooltip
                            title={intl.get('app.analysis.introduce')}
                        >
                            <Icon type='info-circle-o'/>
                        </Tooltip>
                    }
                    loading={loading}
                    total={() => 126560}
                    footer={<div>12423</div>}
                    contentHeight={46}
                >
                    <div>12%</div>
                    <div>11%</div>
                </ChartCard>
            </Col>

        </Row>
    );
});

export default IntroduceRow;