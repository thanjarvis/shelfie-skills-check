import React from 'react'
import {Link} from 'react-router-dom'

export default class Product extends React.Component{
    constructor(){
        super()
        this.state = {
            editUrl: '',
            editName: '',
            editPrice: 0
        }
    }



    render(){
        // console.log(this.props.getSelectedProductId);
        
        return(
            <div>
                <div>
                    <img
                        className='product-image'
                        src={this.props.img}
                    />
                </div>
                <div>
                    <p>{this.props.name}</p>
                    <p>{this.props.price}</p>
                </div>
                <div>
                    <button
                        onClick={this.props.deleteProduct}
                    >Delete</button>
                    <Link to='/edit/:id'><button
                        onClick={() => this.props.getSelectedProductId(this.props.id)
                            
                        }
                    >Edit</button></Link>
                </div>
            </div>
        )
    }
}