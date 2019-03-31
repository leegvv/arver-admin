import React, {memo} from 'react';
import {Row, Col, Tabs, Card} from 'antd';
import intl from 'react-intl-universal';
import styles from './Analysis.module.less';

const {TabPane} = Tabs;

const SalesCard = memo(({loading}) => {
    return (
        <Card>
            <div>
                <Tabs>
                    <TabPane
                        key='sales'
                        tab={intl.get('app.analysis.sales')}
                    >
                        <Row>
                            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                表格
                            </Col>
                            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                排名
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane
                        key='visits'
                        tab={intl.get('app.analysis.visits')}
                    >
                        22
                    </TabPane>
                </Tabs>
            </div>

        </Card>
    );
});

export default SalesCard;