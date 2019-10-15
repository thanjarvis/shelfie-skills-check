import React from 'react'
import {Link} from 'react-router-dom'

export default class Header extends React.Component{
    render(){
        return(
            <div>
                <p>Shelfie Image</p>
                <Link to='/'><button>Dashboard</button></Link>
                <Link to='/add'><button>Add Inventory</button></Link>
            </div>
        )
    }
}