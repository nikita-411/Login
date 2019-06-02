import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      phoneno:'',
      pincode:'',
      panno:'',
	  transaction_id:''
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  handleClick(event,role) {
    var apiBaseUrl = "https://api.staging.goplannr.com/v2/user/register";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.phoneno.length>0 && this.state.last_name.length>0 && this.state.email.length>0 && this.state.password.length>0 && this.state.phoneno.length>0 && this.state.pincode.length>0 && this.state.panno.length>0){
      var payload={
      "first_name": this.state.first_name,
      "last_name":this.state.last_name,
      "email":this.state.email,
      "password":this.state.password,
      "userid": this.state.phoneno,
      "pincode":this.state.pincode,
      "panno":this.state.panno,
      "role":role	
      }
      axios.post(apiBaseUrl, {
  "pincode": this.state.pincode,
	"pan_no":this.state.panno,
	"phone_no": this.state.phoneno,
	"password": this.state.password,
	"first_name": this.state.first_name,
	"last_name": this.state.last_name,
	"email": this.state.email,
	"transaction_id": this.state.transaction_id

	})
    .then(function (response) {
       alert("Register Success");
       if(response.data.code === 200){
         //console.log("registration successful");
         var loginscreen=[];
         loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
         var loginmessage = "Not Registered yet.Go to registration";
         self.props.parentContext.setState({loginscreen:loginscreen,
         loginmessage:loginmessage,
         buttonLabel:"Register",
         isLogin:true
          });
       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       alert(error);
     });
    }
    else{
      alert("Input field value is missing");
    }
  };
  render() {
    // console.log("props",this.props);
    var userhintText,userLabel;
    if(this.props.role === "user"){
      userhintText="Enter your Phone No"
      userLabel="Phone No"
    }
    else{
      userhintText="Enter Admin's Phone No"
      userLabel="APhone No"
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your email ID"
             floatingLabelText="Email ID"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
<TextField
             hintText="Enter your Phone No"
             floatingLabelText="Phone No"
             onChange = {(event,newValue) => this.setState({phoneno:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Pin Code"
             floatingLabelText="Pin Code"
             onChange = {(event,newValue) => this.setState({pincode:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your PAN Number"
             floatingLabelText="PAN Number"
             onChange = {(event,newValue) => this.setState({panno:newValue})}
             />
           <br/>
		   <TextField
             hintText="Enter your Transaction id"
             floatingLabelText="Transaction ID"
             onChange = {(event,newValue) => this.setState({transaction_id:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;