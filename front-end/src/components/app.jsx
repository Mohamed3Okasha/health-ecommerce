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
import SignUp from './signUp';
import ProductForm from './productForm';
import Admin from './admin';
import NavBarAdmin from './navBarAdmin';
import AdminDashBoard from './adminDashboard';
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
        brandList: []    
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
        console.log('App: componentDidMount');
        const {data} = await axios.get(`${prodAPI}/products`);
        let showCartResponse;
        if(this.state.logedUser.token !== ''){
            showCartResponse = await axios.get(`${prodAPI}/cart`, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}});
            console.log('App - componentDidMount - showCartResponse: ', showCartResponse.data.items)
        }
        console.log('products from api: ', data)
        for (let p in data){
            data[p].isSelected = false;
            if(showCartResponse){
                data[p].selectedQuantity = 0;
            }
        }
        if(showCartResponse){
            showCartResponse.data.items.forEach( item => {
                let targetProduct = data.find(p => p._id === item.product_id);
                targetProduct.isSelected = true;
                targetProduct.selectedQuantity = item.quantity;
            });
        }
        this.setState({products:data});
        const brandsResponse = await axios.get(`${prodAPI}/brands`);
        console.log('brandsResponse: ', brandsResponse.data);
        this.setState({brandList: brandsResponse.data});
        const categoriesResponse = await axios.get(`${prodAPI}/categories`);
        console.log('categoriesResponse: ', categoriesResponse);
        this.setState({categoryList: categoriesResponse.data});
    }

    checkLoginDetails = (user) => {
        console.log(user);
        axios.post(`${prodAPI}/users/login`, user)
        .then(res => {
            // console.log(res);
            this.setState({logedUser:{...res.data.user, token : res.data.token}});
            for(let item of Object.entries(res.data.user)){
                this.setCookie(item[0], item[1]);
            }
            this.setCookie('token', res.data.token);
        })
        .catch(err => console.log("err: ", err))
    }

    handleLogout = () => {
        console.log('Entered handleLogout');
        let arrCookies = this.arrangedCookies();
        for(let cookie in arrCookies){
            // console.log(cookie, arrCookies[cookie]);
            this.deleteCookie(cookie);
        }
        let cloneLogedUser = {...this.state.logedUser};
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

    handleReset = ()=> {
        let clonedProducts = [...this.state.products];
        clonedProducts = clonedProducts.map(p =>{
            p.count = 0
            return p;
        })
        this.setState({products:clonedProducts})
        console.log(this.state.products)
    }

    handleIncrementDecrementQuantity = async (recievedProduct, operator) => {
        let clonedProducts = [...this.state.products];
        let targetProduct = clonedProducts.find(p => p._id === recievedProduct._id);
        let addToCartrResponse;
        if(operator === '+'){
            targetProduct.selectedQuantity++;
            addToCartrResponse = await axios.post(`${prodAPI}/cart`,{"productId": targetProduct._id, "quantity": targetProduct.selectedQuantity} ,{headers: {Authorization: `Bearer ${this.state.logedUser.token}`}})
            console.log('App - handleIncrementDecrementQuantity - addToCartrResponse Increment: ', addToCartrResponse)
        }
        else if(operator === '-'){
            if(targetProduct.selectedQuantity <= 1){
                this.handleSelectProductToCart(targetProduct);
            }
            else{
                targetProduct.selectedQuantity--;
                addToCartrResponse = await axios.post(`${prodAPI}/cart`,{"productId": targetProduct._id, "quantity": targetProduct.selectedQuantity} ,{headers: {Authorization: `Bearer ${this.state.logedUser.token}`}})
                console.log('App - handleIncrementDecrementQuantity - addToCartrResponse Decrement: ', addToCartrResponse);
            }
        }
        if(addToCartrResponse.status === 201){
            this.setState({products:clonedProducts})
        }
    } 

    handleSelectProductToCart = async (selectedProduct) =>{
        console.log('App - handleSelectProductToCart - state products: ', this.state.products);
        console.log('App - handleSelectProductToCart - selectedProduct: ', selectedProduct);
        let clonedProducts = [...this.state.products];
        const indx = clonedProducts.indexOf(selectedProduct);
        clonedProducts[indx] = {...clonedProducts[indx]};

        if(!selectedProduct.isSelected){
            const addToCartrResponse = await axios.post(`${prodAPI}/cart`,{"productId": selectedProduct._id, "quantity": 1} ,{headers: {Authorization: `Bearer ${this.state.logedUser.token}`}})
            console.log('App - handleSelectProductToCart - addToCartrResponse: ', addToCartrResponse)
            if(addToCartrResponse.status === 201){
                clonedProducts[indx].isSelected = !clonedProducts[indx].isSelected;
                clonedProducts[indx].selectedQuantity = 1;
                console.log('AddToCart - clonedProducts: ',clonedProducts)
                this.setState({
                    products:clonedProducts
                });
            }
        }
        else{
            console.log("productId", selectedProduct._id)
            const removeFromCartResponse = await axios.delete(`${prodAPI}/cart`, { headers: {Authorization: `Bearer ${this.state.logedUser.token}`} , data: {"productId": selectedProduct._id}});
            console.log('App - removeFromCartResponse: ', removeFromCartResponse);
            if(removeFromCartResponse.status === 200){
                clonedProducts[indx].isSelected = !clonedProducts[indx].isSelected;
                clonedProducts[indx].selectedQuantity = 0;
                console.log('RemoveFromCart - clonedProducts: ',clonedProducts)
                this.setState({products:clonedProducts});
            }
        }
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

    handleSearchProducts = async (searchWord) => {
        const {data} = await axios.get(`${prodAPI}/products?q=${searchWord}`)
        console.log('handleSearchProducts - data: ', data);
        for (let p in data){
            data[p].isSelected = false;
            data[p].selectedQuantity = 0;
        }
        this.setState({products:data});
    }

    handleAddEditProduct = async (productData, id, newCategory, newBrand) => {
        console.log('App - handleAddEditProduct - productData: ', productData)
        if( productData.category === 'other'){
            this.handleAddCategory(newCategory);
        } else if( productData.brand === 'other'){
            this.handleAddBrand(newBrand);
        }
        // console.log('this.state.logedUser: ', this.state.logedUser)
        if(id !== 'new'){
            console.log('Here in Edit Product');
            const responseEditProd = await axios.put(`${prodAPI}/products/${productData._id}`, {name: productData.name, price: productData.price, description: productData.description, count: productData.count}, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}})
            // .then(res => console.log('res: ', res));
            //Quest ===> when I update products shall I call the componentDidMount somehow? in order to fetch products with nre edits
            console.log('App - handleAddEditProduct - responseEditProd: ', responseEditProd);
            if(responseEditProd.status === 200){
                let cloneProducts = [...this.state.products];
                let findProd = cloneProducts.find(p => p._id === productData._id)
                findProd.count = productData.count;
                this.setState({products:cloneProducts})
            }
        }
        else{
            console.log('Here in Add  New Product');
            const responseAddProd = await axios.post(`${prodAPI}/addProduct`, productData, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}});
            console.log('App - handleAddEditProduct - responseAddProd: ', responseAddProd);

            if(responseAddProd.status === 200){
                let cloneProducts = [...this.state.products];
                cloneProducts.push(productData);
                this.setState({products:cloneProducts});
            }
        } 
    }

    handleAddCategory = async (nCategory) => {
        const {data} = await axios.post(`${prodAPI}/addCategory`, nCategory, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}});
        console.log('handleAddCategory - data', data);
    }
    handleAddBrand = async (nBrand) => {
        const {data} = await axios.post(`${prodAPI}/addCategory`, nBrand, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}});
        console.log('handleAddBrand - data: ', data);
        // const nBrandId = 1;

    }

    handleDeleteProduct = (id) => {
        console.log('Entered handleDeleteProduct');
        axios.delete(`${prodAPI}/products/${id}`, {headers: {Authorization: `Bearer ${this.state.logedUser.token}`}})
        .then(res => console.log(res));
        let cloneProducts = [...this.state.products]
        cloneProducts = cloneProducts.filter(p => p._id !== id);
        // console.log('cloneProducts: ', cloneProducts);
        this.setState({products:cloneProducts})
    }

    handleDeleteCategory = (id) => {
        console.log('App - handleDeleteCategory');
    }

    handleDeleteBrand = (id) => {
        console.log('App - handleDeleteBrand');
    }

    render() { 
        console.log('App: render');
        
        console.log('App: render: logedUser.userRole: ', this.state.logedUser)
        return (<React.Fragment>
            {(this.state.logedUser.userRole === "admin") && 
                (<NavBarAdmin 
                // productCount = {this.state.products.filter(p => p.isSelected === true).length}
                productCount = {this.state.products.filter(p => p.isSelected === true && p.selectedQuantity > 0).length}
                products = {this.state.products}
                onReset = {this.handleReset}
                onIncrement = {this.handleIncrement}
                // handleDelete = {this.handleCartDelete}
                checkLoginDetails = {this.checkLoginDetails}
                logedUser = {this.state.logedUser}
                handleLogout = {this.handleLogout}
            />) 
            }
            { (this.state.logedUser.userRole === '' || this.state.logedUser.userRole === "user") &&
            (    <NavBar 
                    productCount = {this.state.products.filter(p => p.isSelected === true && p.selectedQuantity > 0).length}
                    products = {this.state.products}
                    onReset = {this.handleReset}
                    onIncrement = {this.handleIncrement}
                    // handleDelete = {this.handleCartDelete}
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
                        handleSelectProductToCart = {this.handleSelectProductToCart}
                        handleDeleteProduct = {this.handleDeleteProduct}
                        handleSearchProducts = {this.handleSearchProducts}
                    />} />
                    <Route path="/home" element={<Navigate to = "/" />} />
                    <Route path='/cart' element={
                        <ShoppingCart 
                            products = {this.state.products}
                            onReset = {this.handleReset}
                            handleSelectProductToCart = {this.handleSelectProductToCart}
                            handleIncrementDecrementQuantity = {this.handleIncrementDecrementQuantity}
                        />
                    } />
                    <Route path='/products/:id' element={<ProductDetails products={this.state.products}/>} />
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
                    <Route path='/dashboard' 
                    element = {<AdminDashBoard 
                        categoryList = {this.state.categoryList}
                        brandList = {this.state.brandList}
                        handleDeleteCategory = {this.handleDeleteCategory}
                        handleDeleteBrand = {this.handleDeleteBrand}
                    />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
         
            </main>
        </React.Fragment>);
    }
}
 
export default App;