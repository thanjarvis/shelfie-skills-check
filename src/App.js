// https://github.com/DevMountain/simulation-1


import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard'
import Header from './Components/Header/Header'
import Form from './Components/Form/Form'
import axios from 'axios';
import {Route, Link, Switch} from 'react-router-dom'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      inventory: [],
      selectedProductId: 0,
      selectedItem: {}
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
    .catch(err => console.log(err))
  }

  getSelectedProductId = (id) => {
    this.setState({
      selectedProductId: id,
    })
    // console.log(this.state.inventory[1].id);
    console.log(id);
    

    const selectedObj = this.state.inventory.find(index => index.id === id)
    console.log(this.state.inventory)
    console.log(selectedObj);
    
    this.setState({
      selectedItem: selectedObj
    })
        
  }



  render(){
    console.log(this.state.selectedItem);
    
    return (
      <div className="App">
        <Header/>
        <div>

          <Route exact path='/' render={(props) => {return(
            <Dashboard
            getInventory={this.getInventory}
            inventory={this.state.inventory}
            getSelectedProductId={this.getSelectedProductId}
            />
          )}}/>

            {/* <Dashboard
              getInventory={this.getInventory}
              inventory={this.state.inventory}
              getSelectedProductId={this.getSelectedProductId}
            /> */}
          
          <Route path='/add' render={(props) => {return(
            <Form
            selectedProductId={this.state.selectedProductId}
            getInventory={this.getInventory}
            />
          )}}/>

          <Route path='/edit/:id' render={(props) => {return(
            <Form
            {...props}
            selectedItem={this.state.selectedItem}
            selectedProductId={this.state.selectedProductId}
            getInventory={this.getInventory}
            />
          )}}/>

          {/* <Form
            selectedProductId={this.state.selectedProductId}
            getInventory={this.getInventory}
          /> */}

        </div>
      </div>
    )

  }
}

export default App;
