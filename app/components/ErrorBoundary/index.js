/**
 *
 * ErrorBoundary
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@components/IntlGlobalProvider/index';
import { reportError } from '@app/services/sentry';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
    reportError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // handle gracefully
      return <h1>{translate('something_went_wrong')}</h1>;
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default ErrorBoundary;
