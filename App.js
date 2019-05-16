import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941


import './App.css';
import LoginScreen from './LoginScreen'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }

 componentDidMount() {
        fetch('http://https://api.staging.goplannr.com/v2/user/otp/generate')
        .then(res => res.json())
        .then((data) => {
          this.setState({ 
      loginPage:[],
      uploadScreen:[] })
        })
        .catch(console.log)
      }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<LoginScreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;