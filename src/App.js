import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';
import { Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      from:'',
      via:'',
      to: '',
      time:'',
      vacantSeats:'',
      vehType:'',
      username: '',
      items: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

handleClick = (e) => {
       debugger;
    e.preventDefault();
    this.context.router.history.push('/Edit');
    }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title1: this.state.from,
      title2: this.state.via,       
      title3: this.state.to,
      title4: this.state.time,
      title5: this.state.vacantSeats,
      title6: this.state.vehType,
      user: this.state.user.displayName || this.state.user.email
    }

    itemsRef.push(item);
    this.setState({
      from:'',
      via:'',
      to: '',
      time:'',
      vacantSeats:'',
      vehType:'',
      username: ''
    });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title1: items[item].title1,
	  title2: items[item].title2,
	  title3: items[item].title3,
	  title4: items[item].title4,
	  title5: items[item].title5,
	  title6: items[item].title6,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  RequestItem(itemId) {
    //const itemRef = this.state.user.email
    //     "emailjs-com": "^2.3.2",
var emailjs = require('emailjs-com');
    var service_id = "gmail";
    var template_id = "mailsend";
    var user_id = 'user_MEzIxr0foZZ9KQz8G9WkQ';
    var template_params = {
        "to":itemId,
        "subject": "subject_value",
        "content": "content_value"
     }
    emailjs.send(service_id,template_id,template_params, user_id)
    .then(function(){ 
      alert("Sent!");
  }, function(err) {
     alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
  });
  
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className="wrapper">
              <h1>Car Pooling</h1>
              {this.state.user ?
                <button onClick={this.logout}>Logout</button>                
              :
                <button onClick={this.login}>Log In</button>              
              }
            </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
                <img src={this.state.user.photoURL} alt='' />
            </div>
            <div className='container'>
              <section className='add-item'>
                    <form onSubmit={this.handleSubmit}>
                      <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.user.displayName || this.state.user.email} />
                     <input type="text" name="from" placeholder="Pooling From?" onChange={this.handleChange} value={this.state.from} />	
 		     <input type="text" name="via" placeholder="Pooling Via?" onChange={this.handleChange} value={this.state.via} />	
		     <input type="text" name="to" placeholder="Pooling To?" onChange={this.handleChange} value={this.state.to} />
                     <input type="text" name="time" placeholder="Pooling Time?" onChange={this.handleChange} value={this.state.time} />
                     <input type="text" name="vacantSeats" placeholder="Vacant Seats?" onChange={this.handleChange} value={this.state.vacantSeats} />
                     <input type="text" name="vehType" placeholder="Vehical Type(car/Bicycle)?" onChange={this.handleChange} value={this.state.vehType} />
                     
                      <button>Add Item</button>
                    </form>
              </section>

              <section className='display-item'>
                  <div className="wrapper">
                    <ul>
                      {this.state.items.map((item) => {
                        return (
                          <li key={item.id}>
                            <h3>Pooling By: {item.user} </h3>
                            <p>	<b>From : </b> {item.title1}<br/><br/>
				<b>Via : </b>{item.title2}<br/><br/>
				<b>To : </b>{item.title3}<br/><br/>
				<b>Time : </b>{item.title4}<br/><br/>
				<b>Vacant Seats : </b>{item.title5}<br/><br/>
				<b>Vehical Type : </b>{item.title6}
                              	{item.user === this.state.user.displayName || item.user === this.state.user.email ?
                                <button onClick={() => this.removeItem(item.id)}>Remove</button>
                              	: null}
                                
				{item.user !== this.state.user.displayName ?
                                <button onClick={() => this.RequestItem(this.state.user.email)}>Request</button>
                             	: null}                            
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
              </section>

            </div>
          </div>
        : 
          <p>You must be logged in to see the Pooling list and to give response.</p>
        }
        
      </div>
    );
  }
}


export default App;
