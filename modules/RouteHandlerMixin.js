var React = require('react');
var assign = require('react/lib/Object.assign');
var PropTypes = require('./PropTypes');

var REF_NAME = '__routeHandler__';

var RouteHandlerMixin = {

  contextTypes: {
    routeDepth: React.PropTypes.number.isRequired,
    router: React.PropTypes.func.isRequired
  },

  childContextTypes: {
    routeDepth: React.PropTypes.number.isRequired
  },

  getChildContext() {
    return {
      routeDepth: this.context.routeDepth + 1
    };
  },

  componentDidMount() {
    if(!this.props.customRouteUpdater) {
      this._updateRouteComponent(this.refs[REF_NAME]);
    }
  },

  componentDidUpdate() {
    if(!this.props.customRouteUpdater) {
      this._updateRouteComponent(this.refs[REF_NAME]);
    }
  },

  componentWillUnmount() {
    this._updateRouteComponent(null);
  },

  _updateRouteComponent(component) {
    this.context.router.setRouteComponentAtDepth(this.getRouteDepth(), component);
  },

  getRouteDepth() {
    return this.context.routeDepth;
  },

  createChildRouteHandler(props) {
    var route = this.context.router.getRouteAtDepth(this.getRouteDepth());
    return route ? React.createElement(route.handler, assign({}, props || this.props, { ref: REF_NAME })) : null;
  }

};

module.exports = RouteHandlerMixin;
