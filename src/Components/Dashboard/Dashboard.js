import React from 'react'
import Product from './../Product/Product'
import axios from 'axios';


export default class Dashboard extends React.Component{


    deleteProduct = (id) => {
        axios.delete(`/api/inventory/${id}`)
        this.props.getInventory()
    }



    render(){
        // console.log(this.props.getSelectedProductId);
        
        return(
            <div>
                <h1>Dashboard</h1>

                <div>
                    {this.props.inventory.map((element) => {
                     
                        return (
                                <Product
                                    key={element.id}
                                    getSelectedProductId={this.props.getSelectedProductId}
                                    id={element.id}
                                    name={element.name}
                                    price={element.price}
                                    img={element.img}
                                    deleteProduct={() => {this.deleteProduct(element.id)}}

                                />
                                )
                    })}
                </div>
                
            </div>
        )
    }
}