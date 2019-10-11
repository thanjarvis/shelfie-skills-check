import React from 'react'
import axios from 'axios';

export default class Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            imgURLInput: '',
            nameInput: '',
            priceInput: 0,
            selectedProductId: null
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
        // .then(res => {})
        this.handleCancel()
        this.props.getInventory()

    }

    getSpecificProduct = (id) => {
        axios.get(`api/product/:{id}`)
    }








    // handleEdit = (id) => {
    //     id = this.props.selectedProductId
    //     this.setState({
    //         selectedProductId: id
    //     })


    // }

    // componentDidUpdate = (oldProps) => {
    //     oldProps = this.state.selectedProductId
    //     if(this.props.selectedProductId === oldProps){

    //     }
    // }



    render(){
        // console.log(this.props.getInventory);
        
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
                <button
                    onClick={() => this.postInventory()}
                >Add To Inventory</button>
            </div>
        )
    }
}