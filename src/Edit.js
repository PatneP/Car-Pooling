import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      from: '',
	via:'',
	to:'',
      time: '',
      vacantSeats: '',
	vehType:''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('items').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const item = doc.data();
        this.setState({
          key: doc.id,
          from: item.from,
	  via: item.via,
	to: item.to,
          time: item.time,
          vacantSeats: item.vacantSeats,
	vehType: item.vehType
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({item:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { from, via, to, time, vacantSeats, vehType } = this.state;

    const updateRef = firebase.firestore().collection('items').doc(this.state.key);
    updateRef.set({
      from,
	via,
	to,
      time,
      vacantSeats,
	vehType
    }).then((docRef) => {
      this.setState({
        key: '',
        from: '',
	via:'',
	to:'',
        time: '',
        vacantSeats: '',
	vehType:''
      });
      this.props.history.push("/App/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
	 <div className='app'>
	<header>
            <div className="wrapper">
              <h1>Car Pooling</h1>
              <h4><Link to={`/App/${this.state.key}`} class="btn btn-primary">Own Ride details</Link></h4>
            </div>
        </header>
      <div class="container">
 	 
        <section className='add-item'>
          <div>
            <h3 >
              <b>Edit Response</b>	
            </h3>
          </div><br />
          <div >
            
            <form onSubmit={this.onSubmit}>
           
               
                <input type="text" name="from" value={this.state.from} onChange={this.onChange} placeholder="From" />

                <input type="text" name="via" value={this.state.via} onChange={this.onChange} placeholder="Via" />

                <input type="text"  name="to" value={this.state.to} onChange={this.onChange} placeholder="To" />

                <input type="text"  name="time" value={this.state.time} onChange={this.onChange} placeholder="Time" />

                <input type="text"  name="vacantSeats" value={this.state.vacantSeats} onChange={this.onChange} placeholder="Vacant seats" />

                <input type="text" name="vehType" value={this.state.vehType} onChange={this.onChange} placeholder="Vehical Type" />
            
              <button type="submit">Submit</button>
            </form>
          </div>
	</section>	
      </div>
	</div>
    );
  }
}

export default Edit;

