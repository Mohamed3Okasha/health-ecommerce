import React, { Component } from 'react';
import{Navigate, Route, Routes} from 'react-router-dom';
import { instanceOf } from 'prop-types'
import { Cookies, withCookies } from 'react-cookie';
import axios from 'axios';

import NavBar from './navBar';
import Contact from './contact';
import Home from './home'
import ShoppingCart from './shoppingCart';
import ProductDetails from './productDetails';
import NotFound from './notFound';
import Menu from './menu';
// import Login from './login';
import SignUp from './signUp';
import ProductForm from './productForm';
import Admin from './admin';
import NavBarAdmin from './navBarAdmin';
const prodAPI = 'https://healthecommerce.herokuapp.com';
// let token = '';
// const qs = require('qs');

class App extends Component {

    state = { 
        products: [],
        logedUser:{
            userRole:'',
            token: ''
        },
        categoryList: [],
        brandList: [],
        categoryList: []
    } 

    constructor(){
        super();
        let cloneLogedUser = {...this.state.logedUser};
        let arrCookies = this.arrangedCookies();
        console.log('constructor arrCookies: ', arrCookies);
        for(let cookie in arrCookies){
            cloneLogedUser[cookie] = arrCookies[cookie];
        }
        console.log('cloneLogedUser: ', cloneLogedUser)
        this.state.logedUser = cloneLogedUser;
    }

    async componentDidMount(){
        // document.cookie = '';
        console.log('App: componentDidMount');
        const {data} = await axios.get(`${prodAPI}/products`);
        console.log('products from api: ', data)
        for (let p in data){
            data[p].isSelected = false;
            // data[p].count = 3;
        }
        this.setState({products:data});

        // let cloneLogedUser = {...this.state.logedUser};
        // let arrCookies = this.arrangedCookies();
        // console.log('componentDidMount arrCookies: ', arrCookies);
        // for(let cookie in arrCookies){
        //     cloneLogedUser[cookie] = arrCookies[cookie];
        // }
        // console.log('cloneLogedUser: ', cloneLogedUser)
        // this.setState({logedUser : cloneLogedUser});

        const responseBrands = await axios.get(`${prodAPI}/brands`, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}})
        console.log('responseBrands: ', responseBrands.data)
        this.setState({brandList: responseBrands.data})
        const responseCategories = await axios.get(`${prodAPI}/categories`, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}})
        console.log('responseCategories: ', responseCategories);
        this.setState({categoryList: responseCategories.data})
    }

    checkLoginDetails = (user) => {
        console.log(user);
        axios.post(`${prodAPI}/users/login`, user)
        .then(res => {
                    console.log(res);
                    this.setState({logedUser:{...res.data.user, userRole:'admin', token : res.data.token}});
                    for(let item of Object.entries(res.data.user)){
                    this.setCookie(item[0], item[1]);
                   }
                   this.setCookie('userRole', 'admin');
                   this.setCookie('token', res.data.token);
                //    console.log(this.arrangedCookies());
                    // console.log('logedUser: ', this.state.logedUser);
        })
        .catch(err => console.log("err: ", err))
    }

    handleLogout = () => {
        console.log('Entered handleLogout');
        // document.cookie = '';
        let arrCookies = this.arrangedCookies();
        for(let cookie in arrCookies){
            // console.log(cookie, arrCookies[cookie]);
            this.deleteCookie(cookie);
        }
        let cloneLogedUser = {...this.state.logedUser};
        // this.forceUpdate();
        for(let item in cloneLogedUser){
            cloneLogedUser[item] = '';
        }
        this.setState({logedUser:cloneLogedUser});
    }

    setCookie =(key, value) => {
        let date = new Date();
        date.setDate(date.getDate()+7);
        document.cookie = `${key}=${value};expires=${date.toGMTString()}`;
    }

    deleteCookie = (key) => {
        let date = new Date();
        date.setDate(date.getDate() - 7);
        document.cookie = `${key}='';expires=${date.toGMTString()}`;
    }

    arrangedCookies(){
        let cookiesArr = new Array();
        let cookiesData = document.cookie.split(';');
        for(let i=0; i<cookiesData.length; i++){
            cookiesArr[cookiesData[i].trim().split('=')[0]] = cookiesData[i].trim().split('=')[1];
        }
        return cookiesArr;
    }

    handleCartDelete = (recievedProduct)=> {
        console.log(recievedProduct);
        //1.Clone State
        //2.Edit
        //3.setState
        let clonedProducts =  this.state.products.filter(p => p.id !== recievedProduct.id);
        this.setState({products:clonedProducts});
    };

    handleReset = ()=> {
        let clonedProducts = [...this.state.products];
        clonedProducts = clonedProducts.map(p =>{
            p.count = 0
            return p;
        })
        this.setState({products:clonedProducts})
        console.log(this.state.products)
    }

    handleIncrement = (product) => {
        console.log("plus");
        // this.setState({count:this.props.product.count + 1})
        let clonedProducts = [...this.state.products];
        let prodIndex = clonedProducts.indexOf(product);
        clonedProducts[prodIndex] = {...clonedProducts[prodIndex]}
        clonedProducts[prodIndex].count++;
        this.setState({products:clonedProducts})
    } 

    handleSelect = (selectedProduct) =>{
        // console.log('products once selected a product: ',this.state.products);

        let clonedProducts = [...this.state.products];
        const indx = clonedProducts.indexOf(selectedProduct);
        console.log('index: ', indx);
        clonedProducts[indx] = {...clonedProducts[indx]};
        clonedProducts[indx].isSelected = !clonedProducts[indx].isSelected;
        console.log('clonedProducts: ',clonedProducts)
        this.setState({
            products:clonedProducts
        });
        console.log('products: ',this.state.products);

    }

    handleProductDelete = (selectedProduct) => {
        let clonedProducts = [...this.state.products];
        const indx = clonedProducts.indexOf(selectedProduct);
        clonedProducts[indx] = {...clonedProducts[indx]};
        clonedProducts[indx].isDeleted = true;
        this.setState({
            products: clonedProducts
        })
    }

    handleAddEditProduct = (productData, id) => {
        // e.preventDefault();
        console.log('this.state.logedUser: ', this.state.logedUser)
        if(id !== 'new'){
            console.log('Here in Edit Product');
            axios.put(`${prodAPI}/products/${id}`, {name: productData.name, price: productData.price}, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}})
            .then(res => console.log('res: ', res));
            //Quest ===> when I update products shall I call the componentDidMount somehow? in order to fetch products with nre edits
        }
        else{
            console.log('Here in Add  New Product');
            axios.post(`${prodAPI}/products`, productData, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}})
            .then(res => console.log('res: ', res));
        }
        
    }

    handleDeleteProduct = (id) => {
        console.log('Entered handleDeleteProduct');
        axios.delete(`${prodAPI}/products/${id}`, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}})
        .then(res => console.log(res));
    }

    render() { 
        console.log('App: render');
        
        console.log('App: render: logedUser.userRole: ', this.state.logedUser)
        return (<React.Fragment>
            {(this.state.logedUser.userRole === "admin") && 
                (<NavBarAdmin 
                // productCount = {this.state.products.filter(p => p.count > 0 && p.isSelected === true).length}
                productCount = {this.state.products.filter(p => p.isSelected === true).length}
                products = {this.state.products}
                onReset = {this.handleReset}
                onIncrement = {this.handleIncrement}
                handleDelete = {this.handleCartDelete}
                checkLoginDetails = {this.checkLoginDetails}
                logedUser = {this.state.logedUser}
                handleLogout = {this.handleLogout}
            />) 
            }
            { (this.state.logedUser.userRole === '' || this.state.logedUser.userRole === "user") &&
            (    <NavBar 
                    // productCount = {this.state.products.filter(p => p.count > 0 && p.isSelected === true).length}
                    productCount = {this.state.products.filter(p => p.isSelected === true).length}
                    products = {this.state.products}
                    onReset = {this.handleReset}
                    onIncrement = {this.handleIncrement}
                    handleDelete = {this.handleCartDelete}
                    checkLoginDetails = {this.checkLoginDetails}
                    logedUser = {this.state.logedUser}
                    handleLogout = {this.handleLogout}
                />)
            }
            {/* {(this.state.logedUser.userRole === '' || this.state.logedUser.userRole === 'user') &&
            } */}
            <main className="container">
                <Routes>
                    <Route path="/contact" element= {<Contact />} />
                    <Route path="/" element={<Home 
                        userRole = {this.state.logedUser.userRole}
                        products = {this.state.products}
                        handleSelect = {this.handleSelect}
                        handleDeleteProduct = {this.handleDeleteProduct}
                    />} />
                    <Route path="/home" element={<Navigate to = "/" />} />
                    <Route path='/cart' element={
                        <ShoppingCart 
                            products = {this.state.products}
                            onReset = {this.handleReset}
                            onIncrement = {this.handleIncrement}
                            handleDelete = {this.handleCartDelete}
                        />
                    } />
                    <Route path='/products/:id' element={<ProductDetails products={this.state.products}/>} />
                    <Route path='/menu' element={<Menu 
                        userRole = {this.state.logedUser.userRole}
                        products = {this.state.products}
                        handleSelect = {this.handleSelect}
                        handleDeleteProduct = {this.handleDeleteProduct}
                    />} />
                    {/* <Route path='/login' element={<Login />} /> */}
                    <Route path='/register' element={<SignUp />}/>
                    <Route path='/productform/:id' element={<ProductForm 
                        products = {this.state.products}
                        handleAddEditProduct = {this.handleAddEditProduct}
                        brandList = {this.state.brandList}
                        categoryList = {this.state.categoryList}
                    />}/>
                    <Route path='/admin' element={<Admin 
                    products = {this.state.products}
                    handleDelete = {this.handleProductDelete}
                    />}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
         
            </main>
        </React.Fragment>);
    }
}
 
export default App;