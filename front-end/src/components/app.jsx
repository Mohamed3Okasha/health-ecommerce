import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";

import NavBar from "./navBar";
import Contact from "./contact";
import Home from "./home";
import ShoppingCart from "./shoppingCart";
import ProductDetails from "./productDetails";
import NotFound from "./notFound";
import SignUp from "./signUp";
import ProductForm from "./productForm";
import NavBarAdmin from "./navBarAdmin";
import AdminDashBoard from "./adminDashboard";
import FormData from "form-data";
const prodAPI = "https://healthecommerce.herokuapp.com";

class App extends Component {
  state = {
    products: [],
    logedUser: {
      userRole: "",
      token: "",
    },
    addressList: [],
    categoryList: [],
    brandList: [],
    forceLogin: false,
  };

  constructor() {
    super();
    let cloneLogedUser = { ...this.state.logedUser };
    let arrCookies = this.arrangedCookies();
    // console.log("constructor arrCookies: ", arrCookies);
    for (let cookie in arrCookies) {
      cloneLogedUser[cookie] = arrCookies[cookie];
    }
    // console.log("cloneLogedUser: ", cloneLogedUser);
    this.state.logedUser = cloneLogedUser;
  }

  async componentDidMount() {
    // console.log("App: componentDidMount");
    let getAllProductsResponse = await axios.get(`${prodAPI}/products`);
    let showCartResponse;
    let showAddressResponse;
    if (
      (this.state.logedUser.token !== "") &
      (this.state.logedUser.userRole === "user")
    ) {
      showCartResponse = await axios.get(`${prodAPI}/cart`, {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
      });
      showAddressResponse = await axios.get(`${prodAPI}/addresses`, {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
      });
      // console.log(
      //   "App - componentDidMount - showAddressResponse: ",
      //   showAddressResponse.data
      // );
      this.setState({ addressList: showAddressResponse.data });
    }

    console.log("products from api: ", getAllProductsResponse.data);
    for (let p of getAllProductsResponse.data) {
      p.isSelected = false;
      if (showCartResponse) {
        p.selectedQuantity = 0;
      }
    }
    if (showCartResponse) {
      showCartResponse.data.items.forEach((item) => {
        let targetProduct = getAllProductsResponse.data.find(
          (p) => p._id === item.product_id
        );
        targetProduct.isSelected = true;
        targetProduct.selectedQuantity = item.quantity;
      });
    }

    const brandsResponse = await axios.get(`${prodAPI}/brands`);
    // console.log("brandsResponse: ", brandsResponse.data);
    const categoriesResponse = await axios.get(`${prodAPI}/categories`);
    // console.log("categoriesResponse: ", categoriesResponse);
    this.setState({
      products: getAllProductsResponse.data,
      brandList: brandsResponse.data,
      categoryList: categoriesResponse.data,
    });
  }

  checkLoginDetails = (user) => {
    // console.log(user);
    axios
      .post(`${prodAPI}/users/login`, user)
      .then((res) => {
        // console.log(res);
        this.setState({
          logedUser: { ...res.data.user, token: res.data.token },
        });

        for (let item of Object.entries(res.data.user)) {
          this.setCookie(item[0], item[1], user.rememberLogin);
        }
        this.setCookie("token", res.data.token, user.rememberLogin);
      })
      .catch((err) => console.log("err: ", err));
  };

  handleLogout = () => {
    // console.log("Entered handleLogout");
    let arrCookies = this.arrangedCookies();
    for (let cookie in arrCookies) {
      // console.log(cookie, arrCookies[cookie]);
      this.deleteCookie(cookie);
    }
    let cloneLogedUser = { ...this.state.logedUser };
    for (let item in cloneLogedUser) {
      cloneLogedUser[item] = "";
    }
    this.setState({ logedUser: cloneLogedUser, forceLogin: false });
  };

  setCookie = (key, value, rememberLogin) => {
    let date = new Date();
    console.log("setCookie - rememberLogin: ", rememberLogin);
    if (rememberLogin) {
      date.setDate(date.getDate() + 7);
    } else {
      date.setHours(date.getHours() + 7);
    }
    document.cookie = `${key}=${value};expires=${date.toGMTString()}`;
  };

  deleteCookie = (key) => {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    document.cookie = `${key}='';expires=${date.toGMTString()}`;
  };

  arrangedCookies() {
    let cookiesArr = new Array();
    let cookiesData = document.cookie.split(";");
    for (let i = 0; i < cookiesData.length; i++) {
      cookiesArr[cookiesData[i].trim().split("=")[0]] = cookiesData[i]
        .trim()
        .split("=")[1];
    }
    return cookiesArr;
  }

  handleReset = () => {
    let clonedProducts = [...this.state.products];
    clonedProducts = clonedProducts.map((p) => {
      p.count = 0;
      return p;
    });
    this.setState({ products: clonedProducts });
    // console.log(this.state.products);
  };

  handleIncrementDecrementQuantity = async (recievedProduct, operator) => {
    let clonedProducts = [...this.state.products];
    let targetProduct = clonedProducts.find(
      (p) => p._id === recievedProduct._id
    );
    let addToCartrResponse;
    if (operator === "+") {
      targetProduct.selectedQuantity++;
      addToCartrResponse = await axios.post(
        `${prodAPI}/cart`,
        {
          productId: targetProduct._id,
          quantity: targetProduct.selectedQuantity,
        },
        { headers: { Authorization: `Bearer ${this.state.logedUser.token}` } }
      );
      // console.log(
      //   "App - handleIncrementDecrementQuantity - addToCartrResponse Increment: ",
      //   addToCartrResponse
      // );
    } else if (operator === "-") {
      if (targetProduct.selectedQuantity <= 1) {
        this.handleSelectProductToCart(targetProduct);
      } else {
        targetProduct.selectedQuantity--;
        addToCartrResponse = await axios.post(
          `${prodAPI}/cart`,
          {
            productId: targetProduct._id,
            quantity: targetProduct.selectedQuantity,
          },
          { headers: { Authorization: `Bearer ${this.state.logedUser.token}` } }
        );
        // console.log(
        //   "App - handleIncrementDecrementQuantity - addToCartrResponse Decrement: ",
        //   addToCartrResponse
        // );
      }
    }
    if (addToCartrResponse.status === 201) {
      this.setState({ products: clonedProducts });
    }
  };

  handleSelectProductToCart = async (selectedProduct) => {
    // console.log(
    //   "App - handleSelectProductToCart - state products: ",
    //   this.state.products
    // );
    // console.log(
    //   "App - handleSelectProductToCart - selectedProduct: ",
    //   selectedProduct
    // );
    let clonedProducts = [...this.state.products];
    const indx = clonedProducts.indexOf(selectedProduct);
    clonedProducts[indx] = { ...clonedProducts[indx] };

    if (!selectedProduct.isSelected) {
      let addToCartrResponse;
      if (this.state.logedUser.userRole === "user") {
        addToCartrResponse = await axios.post(
          `${prodAPI}/cart`,
          { productId: selectedProduct._id, quantity: 1 },
          { headers: { Authorization: `Bearer ${this.state.logedUser.token}` } }
        );
      }
      // console.log(
      //   "App - handleSelectProductToCart - addToCartrResponse: ",
      //   addToCartrResponse
      // );
      if (
        (addToCartrResponse && addToCartrResponse.status === 201) ||
        (this.state.logedUser.userRole === "" && 1)
      ) {
        clonedProducts[indx].isSelected = !clonedProducts[indx].isSelected;
        clonedProducts[indx].selectedQuantity = 1;
        // console.log("AddToCart - clonedProducts: ", clonedProducts);
        this.setState({
          products: clonedProducts,
        });
      }
    } else {
      // console.log("productId", selectedProduct._id);
      const removeFromCartResponse = await axios.delete(`${prodAPI}/cart`, {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
        data: { productId: selectedProduct._id },
      });
      // console.log("App - removeFromCartResponse: ", removeFromCartResponse);
      if (removeFromCartResponse.status === 200) {
        clonedProducts[indx].isSelected = !clonedProducts[indx].isSelected;
        clonedProducts[indx].selectedQuantity = 0;
        // console.log("RemoveFromCart - clonedProducts: ", clonedProducts);
        this.setState({ products: clonedProducts });
      }
    }
    // console.log("products: ", this.state.products);
  };

  handleAddAddress = async (recievedAddress) => {
    // console.log("App - handleAddAdress - recievedAddress: ", recievedAddress);
    const addAddressResponse = await axios.post(
      `${prodAPI}/address`,
      recievedAddress,
      { headers: { Authorization: `Bearer ${this.state.logedUser.token}` } }
    );
    // console.log(
    //   "App - handleAddAdress - addAddressResponse: ",
    //   addAddressResponse
    // );
    if (addAddressResponse.status === 200 || addAddressResponse === 2001) {
      let cloneAddressList = [...this.state.addressList];
      cloneAddressList.push(recievedAddress);
    }
  };

  handleSearchProducts = async (searchWord) => {
    const { data } = await axios.get(`${prodAPI}/products?q=${searchWord}`);
    // console.log("handleSearchProducts - data: ", data);
    for (let p in data) {
      data[p].isSelected = false;
      data[p].selectedQuantity = 0;
    }
    this.setState({ products: data });
  };

  handleAddEditProduct = async (productData, id, newCategory, newBrand) => {
    if (productData.category === "other") {
      const addCategoryResponse = await axios.post(
        `${prodAPI}/addCategory`,
        newCategory,
        {
          headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
        }
      );
      if (
        (addCategoryResponse.status === 200) |
        (addCategoryResponse.status === 2001)
      ) {
        productData.category = addCategoryResponse.data.name;
      }
    } else if (productData.brand === "other") {
      const addBrandResponse = await axios.post(
        `${prodAPI}/addBrand`,
        newBrand,
        {
          headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
        }
      );
      if (
        (addBrandResponse.status === 200) |
        (addBrandResponse.status === 2001)
      ) {
        productData.brand = addBrandResponse.data.name;
      }
    }
    // console.log("App - handleAddEditProduct - productData: ", productData);
    // console.log('this.state.logedUser: ', this.state.logedUser)
    if (id !== "new") {
      // console.log("Here in Edit Product");
      const responseEditProd = await axios.put(
        `${prodAPI}/products/${productData._id}`,
        {
          name: productData.name,
          price: productData.price,
          description: productData.description,
          count: productData.count,
        },
        { headers: { Authorization: `Bearer ${this.state.logedUser.token}` } }
      );
      // console.log(
      //   "App - handleAddEditProduct - responseEditProd: ",
      //   responseEditProd
      // );
      if (responseEditProd.status === 200) {
        let cloneProducts = [...this.state.products];
        let findProd = cloneProducts.find((p) => p._id === productData._id);
        findProd.count = productData.count;
        this.setState({ products: cloneProducts });
      }
      this.handleUploadImage("pic-black-white.jpg");
    } else {
      // console.log("Here in Add  New Product: ", productData);
      const responseAddProd = await axios.post(
        `${prodAPI}/addProduct`,
        productData,
        { headers: { Authorization: `Bearer ${this.state.logedUser.token}` } }
      );

      if (responseAddProd.status === 200) {
        let cloneProducts = [...this.state.products];
        cloneProducts.push(productData);
        this.setState({ products: cloneProducts });
      }
    }
  };

  handleUploadImage = async (imgLocalPath) => {
    let imgData = new FormData();
    // imgData.append('1234567:19', imgLocalPath);
    // console.log("App - handleUploadImage - imgLocalPath: ", imgLocalPath);
    imgData.append("file", imgLocalPath);

    // console.log('App - handleUploadImage - imgData: ', imgData.keys());
    // console.log("App - handleUploadImage - imgData: ", imgData);
    const uploadImgResponse = await axios.post(
      `${prodAPI}/images`,
      { imgData },
      {
        headers: {
          Authorization: `Bearer ${this.state.logedUser.token}`,
          "Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
        },
      }
    );
    // console.log(
    //   "App - handleUploadImage - uploadImgResponse: ",
    //   uploadImgResponse
    // );
  };

  handleAddCategory = async (nCategory) => {
    const { data } = await axios.post(`${prodAPI}/addCategory`, nCategory, {
      headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
    });
    return data;
  };

  handleAddBrand = async (nBrand) => {
    const { data } = await axios.post(`${prodAPI}/addBrand`, nBrand, {
      headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
    });
    // console.log("handleAddBrand - data: ", data);
    // const nBrandId = 1;
    return data;
  };

  handleDeleteProduct = (id) => {
    //console.log("Entered handleDeleteProduct");
    axios
      .delete(`${prodAPI}/products/${id}`, {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
      })
      .then((res) => console.log(res));
    let cloneProducts = [...this.state.products];
    cloneProducts = cloneProducts.filter((p) => p._id !== id);
    // console.log('cloneProducts: ', cloneProducts);
    this.setState({ products: cloneProducts });
  };

  handleDeleteCategory = async (categoryId) => {
    // console.log("App - handleDeleteCategory");
    const deleteCategoryResponse = await axios.delete(
      `${prodAPI}/categories/${categoryId}`,
      {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
      }
    );
    if (deleteCategoryResponse.status === 200) {
      let cloneCategoryList = [...this.state.categoryList];
      this.setState({
        categoryList: cloneCategoryList.filter((c) => c._id !== categoryId),
      });
    }
  };

  handleEditCategory = async (categoryData) => {
    const editCategoryResponse = await axios.put(
      `${prodAPI}/categories/${categoryData.categoryId}`,
      {
        name: categoryData.categoryName,
        description: categoryData.categoryDescription,
      },
      {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
      }
    );
    if (editCategoryResponse.status === 200) {
      let cloneCategoryList = [...this.state.categoryList];
      let targetCategory = cloneCategoryList.find(
        (c) => c._id === categoryData.categoryId
      );
      targetCategory.name = categoryData.categoryName;
      targetCategory.description = categoryData.categoryDescription;
      this.setState({
        categoryList: cloneCategoryList,
      });
    }
  };

  handleDeleteBrand = async (brandId) => {
    // console.log("App - handleDeleteBrand");
    const deleteBrandResponse = await axios.delete(
      `${prodAPI}/brands/${brandId}`,
      {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
      }
    );
    if (deleteBrandResponse.status === 200) {
      let cloneBrandList = [...this.state.brandList];
      this.setState({
        brandList: cloneBrandList.filter((b) => b._id !== brandId),
      });
    }
  };

  handleEditBrand = async (brandData) => {
    const editBrandResponse = await axios.put(
      `${prodAPI}/brands/${brandData.brandId}`,
      { name: brandData.brandName, description: brandData.brandDescription },
      {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
      }
    );

    if (editBrandResponse.status === 200) {
      let cloneBrandList = [...this.state.brandList];
      let targetBrand = cloneBrandList.find((b) => b._id === brandData.brandId);
      targetBrand.name = brandData.brandName;
      targetBrand.description = brandData.brandDescription;
      this.setState({
        brandList: cloneBrandList,
      });
    }
  };

  handleOrderCheckout = async (recievedPaymentDetails) => {
    // console.log(
    //   "App - recievedPaymentDetails address Id: ",
    //   recievedPaymentDetails["shippingAddressId"]
    // );
    if (this.state.logedUser.userRole !== "") {
      // console.log("Entered here after forceLogin");
      if (recievedPaymentDetails.onDelivery) {
        const orderCheckoutResponse = await axios.post(
          `${prodAPI}/addOrder`,
          {
            payment_method: "cash on delivery",
            address_id: recievedPaymentDetails["shippingAddressId"],
          },
          { headers: { Authorization: `Bearer ${this.state.logedUser.token}` } }
        );
        // console.log(
        //   "App - handleOrderCheckout - orderCheckoutResponse: ",
        //   orderCheckoutResponse
        // );
      }
      const getOrdersResponse = await axios.get(`${prodAPI}/orders`, {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
      });
      // console.log(
      //   "App - handleOrderCheckout - getOrdersResponse: ",
      //   getOrdersResponse.data
      // );
    } else {
      // console.log("You should login first");
      this.setState({ forceLogin: true });
      // this.handleOrderCheckout(recievedPaymentDetails);
    }
  };

  render() {
    // console.log("App: render");

    // console.log("App: render: logedUser.userRole: ", this.state.logedUser);
    return (
      <React.Fragment>
        {this.state.logedUser.userRole === "admin" && (
          <NavBarAdmin
            // productCount = {this.state.products.filter(p => p.isSelected === true).length}
            productCount={
              this.state.products.filter(
                (p) => p.isSelected === true && p.selectedQuantity > 0
              ).length
            }
            products={this.state.products}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            // handleDelete = {this.handleCartDelete}
            checkLoginDetails={this.checkLoginDetails}
            logedUser={this.state.logedUser}
            handleLogout={this.handleLogout}
          />
        )}
        {(this.state.logedUser.userRole === "" ||
          this.state.logedUser.userRole === "user") && (
          <NavBar
            productCount={
              this.state.products.filter(
                (p) => p.isSelected === true && p.selectedQuantity > 0
              ).length
            }
            products={this.state.products}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            // handleDelete = {this.handleCartDelete}
            checkLoginDetails={this.checkLoginDetails}
            logedUser={this.state.logedUser}
            handleLogout={this.handleLogout}
            forceLogin={this.state.forceLogin}
          />
        )}
        {/* {(this.state.logedUser.userRole === '' || this.state.logedUser.userRole === 'user') &&
            } */}
        <main className="container">
          <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/"
              element={
                <Home
                  userRole={this.state.logedUser.userRole}
                  products={this.state.products}
                  handleSelectProductToCart={this.handleSelectProductToCart}
                  handleDeleteProduct={this.handleDeleteProduct}
                  handleSearchProducts={this.handleSearchProducts}
                />
              }
            />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route
              path="/cart"
              element={
                <ShoppingCart
                  products={this.state.products}
                  onReset={this.handleReset}
                  handleSelectProductToCart={this.handleSelectProductToCart}
                  handleIncrementDecrementQuantity={
                    this.handleIncrementDecrementQuantity
                  }
                  handleAddAddress={this.handleAddAddress}
                  addressList={this.state.addressList}
                  handleOrderCheckout={this.handleOrderCheckout}
                />
              }
            />
            <Route
              path="/products/:id"
              element={<ProductDetails products={this.state.products} />}
            />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/productform/:id"
              element={
                <ProductForm
                  products={this.state.products}
                  handleAddEditProduct={this.handleAddEditProduct}
                  brandList={this.state.brandList}
                  categoryList={this.state.categoryList}
                />
              }
            />
            {/* <Route path='/admin' element={<Admin 
                    products = {this.state.products}
                    />}/> */}
            <Route
              path="/dashboard"
              element={
                <AdminDashBoard
                  categoryList={this.state.categoryList}
                  brandList={this.state.brandList}
                  handleDeleteCategory={this.handleDeleteCategory}
                  handleEditCategory={this.handleEditCategory}
                  handleDeleteBrand={this.handleDeleteBrand}
                  handleEditBrand={this.handleEditBrand}
                  logedUser={this.state.logedUser}
                />
              }
            />
            {/* <Route path="/statistics" element={<Statistics />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
