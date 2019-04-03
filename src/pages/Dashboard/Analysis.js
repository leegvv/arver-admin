import React, {Component, Suspense} from 'react';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import PageLoading from '@/components/PageLoading';
import styles from './Analysis.module.less';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const SalesCard = React.lazy(() => import('./SalesCard'));

class Analysis extends Component {

    state = {
        chart: {},
        loading: true,
        salesType: 'all',
        currentTabKey: '',
        rangePickerValue: getTimeDistance('year'),
    }
    componentDidMount() {
        fetch('/api/fake_chart_data',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json())
            .then((data) => {
                this.setState({chart: data, loading: false})
            }
        );
    }

    handleRangePickerChange = rangePickerValue => {
        this.setState({
            rangePickerValue,
        });

    };

    selectDate = type => {
        this.setState({
            rangePickerValue: getTimeDistance(type),
        });

    };

    isActive = type => {
        const { rangePickerValue } = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return '';
        }
        if (
            rangePickerValue[0].isSame(value[0], 'day') &&
            rangePickerValue[1].isSame(value[1], 'day')
        ) {
            return styles.currentDate;
        }
        return '';
    };

    render() {
        const {rangePickerValue, salesType, currentTabKey, loading, chart} = this.state;
        const {visitData, salesData} = chart;

        return (
            <GridContent>
                <Suspense fallback={<PageLoading/>}>
                    <IntroduceRow loading={loading} visitData={visitData}/>
                </Suspense>
                <Suspense fallback={null}>
                    <SalesCard
                        rangePickerValue={rangePickerValue}
                        salesData={salesData}
                        isActive={this.isActive}
                        handleRangePickerChange={this.handleRangePickerChange}
                        loading={loading}
                        selectDate={this.selectDate}
                    />
                </Suspense>
            </GridContent>
        );
    }
}

export default Analysis;