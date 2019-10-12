import React from 'react'
import axios from 'axios';

export default class Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            imgURLInput: '',
            nameInput: '',
            priceInput: 0,
            selectedProductId: null,
            selectedProduct: {},
            editing: false
        }
    }


    handleChange = (e) => {
        let {name} = e.target
        this.setState({
            [name]: e.target.value
        })
    }

    handleCancel = () => {
        document.getElementById('imgURLInput').value = ''
        document.getElementById('nameInput').value = ''
        document.getElementById('priceInput').value = ''

        this.setState({
            imgURLInput: '',
            nameInput: '',
            priceInput: 0
        })
    }

    postInventory = () => {
        const name = this.state.nameInput
        const price = this.state.priceInput
        const img = this.state.imgURLInput
        axios.post('/api/product', {name, price, img})
        this.handleCancel()
        this.props.getInventory()

    }


    deleteProduct = (id) => {
        axios.delete(`/api/inventory/${id}`)
        this.props.getInventory()
    }

    getSpecificProduct = () => {
        let id = this.props.selectedProductId                
        axios.get(`api/product/${id}`)
        .then(res => {
            console.log(res.data);
            
            this.setState({
                selectedProduct: res.data
            })
            this.handleEdit()
            console.log(this.state.selectedProduct)
            
        })
    }



    handleEdit = () => {
        document.getElementById('imgURLInput').value = this.state.selectedProduct[0].img
        document.getElementById('nameInput').value = this.state.selectedProduct[0].name
        document.getElementById('priceInput').value = this.state.selectedProduct[0].price
        console.log('fire handleEdit');
    }

    // updateSpecificProduct = () => {
    //     let id = this.props.selectedProductId                
    //     axios.put        
    // }

    //update the user edited information
    //return the inventory
    //set the state of editing to false


    componentDidUpdate = (prevProps) => {
        console.log('first', this.props.selectedProductId, 'second',  prevProps.selectedProductId);
        
        if(this.props.selectedProductId !== prevProps.selectedProductId){
            this.getSpecificProduct()
            this.setState({
                editing: true
            })            

        }
        console.log('hit what should be the first console log');
        


    }

//questions about how the component did update fires, becasue it seems to be firing twice, the first everything outside of the if statement, the second time everything inside the if statement. makes the page re-render each time as well


    render(){ 
        // console.log(this.state.editing);


        return(
            <div>
                <h1>Form</h1>
                <input
                    id='imgURLInput'
                    name='imgURLInput'
                    placeholder='Image URL'
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    id='nameInput'
                    name='nameInput'
                    placeholder='Product Name'
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    id='priceInput'
                    name='priceInput'
                    placeholder='Product Price'
                    onChange={(e) => this.handleChange(e)}
                />
                <button
                    onClick={() => this.handleCancel()}
                >Cancel</button>

               
               
               
                {this.state.editing? (<button>Edit</button>) : (<button
                    onClick={() => this.postInventory()}
                >Add To Inventory</button>)}




                {/* <button
                    onClick={() => this.postInventory()}
                >Add To Inventory</button> */}
            </div>
        )
    }
}