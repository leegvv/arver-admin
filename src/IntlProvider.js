import React, {Component} from 'react';
import intl from 'react-intl-universal';

class IntlProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {initDone: false}
    }

    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        // init method will load CLDR locale data according to currentLocale
        // react-intl-universal is singleton, so you should init it only once in your app
        const {locales, currentLocale} = this.props;
        intl.init({
            currentLocale: currentLocale,
            locales,
        })
        .then(() => {
            // After loading CLDR locale data, start to render
            this.setState({initDone: true});
        });
    }
    render() {
        return (
            this.state.initDone &&
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
        );
    }
}

export default IntlProvider;