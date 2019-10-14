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
                nameInput: res.data[0].name,
                priceInput: res.data[0].price,
                imgURLInput: res.data[0].img,
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

    updateSpecificProduct = () => {
        console.log(this.state.nameInput);
        
        let id = this.props.selectedProductId 
        let name=this.state.nameInput              
        let price=this.state.priceInput               
        let img=this.state.imgURLInput              
        axios.put(`/api/product/${id}`, {name, price, img})
        this.props.getInventory()
        this.setState({
            editing: false
        }) 
        this.handleCancel()
    }

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

               
               
               
                {this.state.editing? (<button
                    onClick={() => this.updateSpecificProduct()}
                >Save Changes</button>) : (<button
                    onClick={() => this.postInventory()}
                >Add To Inventory</button>)}




                {/* <button
                    onClick={() => this.postInventory()}
                >Add To Inventory</button> */}
            </div>
        )
    }
}