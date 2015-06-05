/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var mui = require('material-ui/lib/menu');
var Menu = mui.Menu; //require('material-ui');
var _ = require('lodash');
var scopes = require('../../util/scopes');

var Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },

  render() {

    var styles = {
      container: {
        textAlign: 'center',
        paddingTop: '200px'
      },
      menu: {
        width:200
      }
    };

    //http://callemall.github.io/material-ui/#/components/menus
    var nestedMenuItems = (function recurseMenu(lvl){
      return _.map(lvl, function(v,k){
        if (_.isEmpty(v.children))
          return {payload:k, text:v.name};
        return { type: mui.MenuItem.Types.NESTED, text:v.name, items: recurseMenu(v.children) };
      });
    })(scopes);

    return (
      <div style={styles.container}>

        <h1>material-ui</h1>
        <h2>example project</h2>

        <Menu menuItems={nestedMenuItems} autoWidth={true} style={styles.menu}/>

        <RaisedButton label="Start Timer" primary={true} onTouchTap={this._handleTouchTap} />
      </div>
    );
  },

  _handleTouchTap() {
    alert('Timer Started');
  }
  
});

module.exports = Main;
