import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard'
import Header from './Components/Header/Header'
import Form from './Components/Form/Form'
import axios from 'axios';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      inventory: [],
      selectedProductId: 0
    }
  }
  
  componentDidMount = () => {
    this.getInventory()
  }


  getInventory = () => {
    axios.get('/api/inventory')
    .then(res => this.setState({
      inventory: res.data
    }))
  }

  getSelectedProductId = (id) => {
    this.setState({
      selectedProductId: id
    })
    
    
  }

  render(){
    console.log(this.state.selectedProductId);
    
    return (
      <div className="App">
        <Header/>
        <div>
          <Dashboard
            getInventory={this.getInventory}
            inventory={this.state.inventory}
            getSelectedProductId={this.getSelectedProductId}
          />
          <Form
            selectedProductId={this.state.selectedProductId}
            getInventory={this.getInventory}
          />
        </div>
      </div>
    )

  }
}

export default App;
