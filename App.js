import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerNavigator, addNavigationHelpers } from 'react-navigation';


class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component {
  



    constructor(props) {
    super(props);
    this.state = {
      drawer: 0,
      screen: 0,
    };
    this.updateDrawer = function(v) {
      this.setState({ drawer: v, screen: this.state.screen });
    };
    this.updateScreen = function(v) {
      this.setState({ drawer: this.state.drawer, screen: v });
    };
  }




  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Home')}
        title="Go back home"
      />
    );
  }
}

const MyApp = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});

export default class App extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      drawer: 0,
      screen: 0,
    };
    this.updateDrawer = function(v) {
      this.setState({ drawer: v, screen: this.state.screen });
    };
    this.updateScreen = function(v) {
      this.setState({ drawer: this.state.drawer, screen: v });
    };
  }
  render() {
    console.log(this.state);
    var self = this;
    return (
      <MyApp
        navigation={addNavigationHelpers({
          dispatch: function(e) {
            console.log(e);
            if (e.routeName == 'DrawerClose') {
              self.updateDrawer(0);
            }
            if (e.routeName == 'DrawerOpen') {
              self.updateDrawer(1);
            }
            if (e.routeName == 'Home') {
              self.updateScreen(0);
            }
            if (e.routeName == 'Notifications') {
              self.updateScreen(1);
            }

            return true;
          },
          state: {
            index: this.state.drawer,
            routes: [
              {
                index: this.state.screen,
                key: 'DrawerClose',
                routeName: 'DrawerClose',
                routes: [
                  {
                    key: 'Home',
                    routeName: 'Home',
                  },
                  {
                    key: 'Notifications',
                    routeName: 'Notifications',
                  },
                ],
              },
              {
                key: 'DrawerOpen',
                routeName: 'DrawerOpen',
              },
            ],
          },
        })}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
