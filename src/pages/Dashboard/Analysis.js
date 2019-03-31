import React, {Component, Suspense} from 'react';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const SalesCard = React.lazy(() => import('./SalesCard'));

class Analysis extends Component {

    state = {
        chart: {},
        loading: true
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

    render() {
        const {loading, chart} = this.state;
        const {visitData} = chart;

        return (
            <GridContent>
                <Suspense fallback={<PageLoading/>}>
                    <IntroduceRow loading={loading} visitData={visitData}/>
                </Suspense>
                <Suspense fallback={null}>
                    <SalesCard/>
                </Suspense>
            </GridContent>
        );
    }
}

export default Analysis;