import React, {memo} from 'react';
import {Row, Col, Tabs, Card, DatePicker} from 'antd';
import intl from 'react-intl-universal';
import {Bar} from '@/components/Charts';
import numeral from 'numeral';
import styles from './Analysis.module.less';

const { RangePicker } = DatePicker;
const {TabPane} = Tabs;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
        title: intl.get('app.analysis.test', { no: i }),
        total: 323234,
    });
}

const SalesCard = memo(({rangePickerValue, salesData, isActive, handleRangePickerChange, loading, selectDate}) => {
    return (
        <Card loading={loading} bordered={false} bodyStyle={{padding: 0}}>
            <div className={styles.salesCard}>
                <Tabs
                    tabBarExtraContent={
                        <div className={styles.salesExtraWrap}>
                            <div className={styles.salesExtra}>
                                <a
                                    className={isActive('today')}
                                    onClick={() => selectDate('today')}
                                >
                                    {intl.get('app.analysis.all-day')}
                                </a>
                                <a
                                    className={isActive('week')}
                                    onClick={() => selectDate('week')}
                                >
                                    {intl.get('app.analysis.all-week')}
                                </a>
                                <a
                                    className={isActive('month')}
                                    onClick={() => selectDate('month')}
                                >
                                    {intl.get('app.analysis.all-month')}
                                </a>
                                <a
                                    className={isActive('year')}
                                    onClick={() => selectDate('year')}
                                >
                                    {intl.get('app.analysis.all-year')}
                                </a>
                            </div>
                            <RangePicker
                                value={rangePickerValue}
                                onChange={handleRangePickerChange}
                                style={{width: 256}}
                            />
                        </div>
                    }
                    size='large'
                    tabBarStyle={{marginBottom: 24}}
                >
                    <TabPane
                        key='sales'
                        tab={intl.get('app.analysis.sales')}
                    >
                        <Row>
                            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                <div className={styles.salesBar}>
                                    <Bar
                                        height={295}
                                        title={intl.get('app.analysis.sales-trend')}
                                        data={salesData}
                                    />
                                </div>
                            </Col>
                            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                <div className={styles.salesRank}>
                                    <h4>
                                        {intl.get('app.analysis.sales-ranking')}
                                    </h4>
                                    <ul className={styles.rankingList}>
                                        {rankingListData.map((item, i) => (
                                            <li key={item.title}>
                                                <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                                                    {i + 1}
                                                </span>
                                                <span className={styles.rankingItemTitle}>
                                                    {item.title}
                                                </span>
                                                <span>
                                                    {numeral(item.total).format('0,0')}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane
                        key='visits'
                        tab={intl.get('app.analysis.visits')}
                    >
                        <Row>
                            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                <div className={styles.salesBar}>
                                    <Bar
                                        height={292}
                                        title={intl.get('app.analysis.visits-trend')}
                                        data={salesData}
                                    />
                                </div>
                            </Col>
                            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                <div className={styles.salesRank}>
                                    <h4>{intl.get('app.analysis.visits-ranking')}</h4>
                                    <ul className={styles.rankingList}>
                                        {rankingListData.map((item, i) => (
                                            <li key={item.title}>
                                                <span
                                                    className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                                                >
                                                  {i + 1}
                                                </span>
                                                <span className={styles.rankingItemTitle} title={item.title}>
                                                  {item.title}
                                                </span>
                                                <span>{numeral(item.total).format('0,0')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>

        </Card>
    );
});

export default SalesCard;