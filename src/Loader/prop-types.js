import PropTypes from 'prop-types';

export const defaultProps = {
};

export const propTypes = {
  render: PropTypes.func.isRequired,
  /**
   * render:
   *     <Loader
          component={MyComponent}
        />
    * all the props from FetchDocument will wrap inside props.fetch
   */
  component: PropTypes.element
  /*   
   * What you going to get Fetch:
   * showLoader : boolean
  */
};
