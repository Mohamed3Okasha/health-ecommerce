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
import NavBarAdmin from "./navBarAdmin";
import FormData from "form-data";
import Footer from "./footer";
import AdminDashboard from "./dashboard/adminDashboard";
import Statistics from "./dashboard/statistics";
import StoreOperations from "./dashboard/storeOperations";
import ManageProducts from "./dashboard/manageProducts";
import ProductForm from "./dashboard/productForm";
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

  setLogedUser = (user) => {
    // console.log("setLogedUser - user: ", user);
    this.setState({ logedUser: user });
    for (let item of Object.entries(user)) {
      this.setCookie(item[0], item[1], user.rememberLogin);
    }
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
    let getAllProductsResponse, showCartResponse, showAddressResponse;
    axios
      .get(`${prodAPI}/products`)
      .then((res) => {
        // console.log("res: ", res);
        getAllProductsResponse = res;
      })
      .then(() => {
        if (
          this.state.logedUser.token !== "" &&
          this.state.logedUser.userRole === "user"
        ) {
          axios
            .all([
              axios.get(`${prodAPI}/cart`, {
                headers: {
                  Authorization: `Bearer ${this.state.logedUser.token}`,
                },
              }),

              axios.get(`${prodAPI}/addresses`, {
                headers: {
                  Authorization: `Bearer ${this.state.logedUser.token}`,
                },
              }),
            ])
            .then(
              axios.spread((cartRes, addressRes) => {
                showCartResponse = cartRes;
                showAddressResponse = addressRes;
              })
            )
            .then(() => {
              // console.log("products from api: ", getAllProductsResponse.data);
              for (let p of getAllProductsResponse.data) {
                p.isSelected = false;
                if (showCartResponse) {
                  p.selectedQuantity = 0;
                }
              }
              if (showCartResponse) {
                // console.log("getAllProductsResponse: ", getAllProductsResponse);
                // console.log("showCartResponse: ", showCartResponse);
                showCartResponse.data.items.forEach((item) => {
                  let targetProduct = getAllProductsResponse.data.find(
                    (p) => p._id === item.product_id
                  );
                  if (targetProduct) {
                    targetProduct.isSelected = true;
                    targetProduct.selectedQuantity = item.quantity;
                    // console.log("targetProduct: ", targetProduct);
                  }
                });
              }
            })
            .then(() => {
              this.setState({
                products: getAllProductsResponse.data,
                addressList: showAddressResponse.data,
              });
            });
        } else {
          this.setState({ products: getAllProductsResponse.data });
        }
      })
      .then(() => {
        axios
          .all([
            axios.get(`${prodAPI}/brands`),
            axios.get(`${prodAPI}/categories`),
          ])
          .then(
            axios.spread((brandsRes, categoryRes) => {
              this.setState({
                brandList: brandsRes.data,
                categoryList: categoryRes.data,
              });
            })
          );
      });
  }

  componentDidUpdate(prevProps, prevState) {
    let allStateProducts = this.state.products;
    if (
      this.state.logedUser !== prevState.logedUser &&
      this.state.logedUser.userRole !== ""
    ) {
      // console.log("Entered componentDidUpdate");
      let tempCartProducts = [];
      allStateProducts
        .filter((p) => p.isSelected === true)
        .forEach((targetProduct) => {
          tempCartProducts.push({
            productId: targetProduct._id,
            quantity: targetProduct.selectedQuantity,
          });
        });
      // console.log("App - tempCartProducts: ", tempCartProducts);
      axios
        .put(
          `${prodAPI}/updateCart`,
          { products: tempCartProducts },
          {
            headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
          }
        )
        .then((tempCartProductsRes) => {
          // console.log(
          //   "tempCartProductsRes: ",
          //   tempCartProductsRes.status
          // );
          if (tempCartProductsRes.status === 201) {
            axios.get(`${prodAPI}/cart`, {
              headers: {
                Authorization: `Bearer ${this.state.logedUser.token}`,
              },
            });
            tempCartProductsRes.data.items.forEach((item) => {
              let targetProduct = allStateProducts.find(
                (p) => p._id === item.product_id
              );
              if (targetProduct) {
                targetProduct.isSelected = true;
                targetProduct.selectedQuantity = item.quantity;
                // console.log("targetProduct: ", targetProduct);
              }
            });
          }
        })
        .then(() => {
          // console.log("App - allStateProducts: ", allStateProducts);
          this.setState({ products: allStateProducts });
        });
    }
  }

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
    if (this.state.logedUser.userRole === "user") {
      let cloneProducts = [...this.state.products];
      cloneProducts.filter((p) => (p.isSelected = true));
      cloneProducts.forEach((p) => {
        p.selectedProduct = 0;
        p.isSelected = false;
      });
      this.setState({
        logedUser: cloneLogedUser,
        forceLogin: false,
        products: cloneProducts,
      });
    } else {
      this.setState({ logedUser: cloneLogedUser, forceLogin: false });
    }
  };

  setCookie = (key, value, rememberLogin) => {
    let date = new Date();
    // console.log("setCookie - rememberLogin: ", rememberLogin);
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
      if (this.state.logedUser.userRole !== "") {
        addToCartrResponse = await axios.post(
          `${prodAPI}/cart`,
          {
            productId: targetProduct._id,
            quantity: targetProduct.selectedQuantity,
          },
          { headers: { Authorization: `Bearer ${this.state.logedUser.token}` } }
        );
      } else {
        this.setState({ products: clonedProducts });
      }
      // console.log(
      //   "App - handleIncrementDecrementQuantity - addToCartrResponse Increment: ",
      //   addToCartrResponse
      // );
    } else if (operator === "-") {
      if (targetProduct.selectedQuantity <= 1) {
        this.handleSelectProductToCart(targetProduct);
      } else {
        targetProduct.selectedQuantity--;
        if (this.state.logedUser.userRole !== "") {
          addToCartrResponse = await axios.post(
            `${prodAPI}/cart`,
            {
              productId: targetProduct._id,
              quantity: targetProduct.selectedQuantity,
            },
            {
              headers: {
                Authorization: `Bearer ${this.state.logedUser.token}`,
              },
            }
          );
        } else {
          this.setState({ products: clonedProducts });
        }
        // console.log(
        //   "App - handleIncrementDecrementQuantity - addToCartrResponse Decrement: ",
        //   addToCartrResponse
        // );
      }
    }
    if (addToCartrResponse?.status === 201) {
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
        this.state.logedUser.userRole === ""
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
      let removeFromCartResponse;
      if (this.state.logedUser.userRole === "user") {
        removeFromCartResponse = await axios.delete(`${prodAPI}/cart`, {
          headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
          data: { productId: selectedProduct._id },
        });
      }
      // console.log("App - removeFromCartResponse: ", removeFromCartResponse);
      if (
        removeFromCartResponse?.status === 200 ||
        this.state.logedUser.userRole === ""
      ) {
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
    if (this.state.logedUser.userRole !== "") {
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
    } else {
      this.setState({ forceLogin: true });
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
    productData.brand = newBrand.name;
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
      // let addCategoryResponse, addBrandResponse, addProdResponse;
      // console.log("Here in Add  New Product: ", productData);

      if (productData.category === "other" && productData.brand === "other") {
        // console.log('productData.category === "other"');
        axios.all([
          axios
            .post(`${prodAPI}/addCategory`, newCategory, {
              headers: {
                Authorization: `Bearer ${this.state.logedUser.token}`,
              },
            })
            .then((addCategoryResponse) => {
              if (
                addCategoryResponse.status === 200 ||
                addCategoryResponse.status === 201
              ) {
                productData.category = addCategoryResponse.data.name;
              }
            }),
          axios
            .post(`${prodAPI}/addBrand`, newBrand, {
              headers: {
                Authorization: `Bearer ${this.state.logedUser.token}`,
              },
            })
            .then((addBrandResponse) => {
              if (addBrandResponse.status === 201) {
                // console.log("productData before: ", productData);
                // console.log("addBrandResponse: ", addBrandResponse);
                productData.brand = addBrandResponse.data.name;
                // console.log("productData after: ", productData);
              }
            }),
          axios
            .post(`${prodAPI}/addProduct`, productData, {
              headers: {
                Authorization: `Bearer ${this.state.logedUser.token}`,
              },
            })
            .then((addProdResponse) => {
              if (addProdResponse.status === 200) {
                let cloneProducts = [...this.state.products];
                cloneProducts.push(productData);
                this.setState({ products: cloneProducts });
              }
            }),
        ]);
        // .then(() => {

        // });
      } else if (
        productData.category !== "other" &&
        productData.brand === "other"
      ) {
        axios
          .post(`${prodAPI}/addBrand`, newBrand, {
            headers: {
              Authorization: `Bearer ${this.state.logedUser.token}`,
            },
          })
          .then((addBrandResponse) => {
            if (
              addBrandResponse.status === 200 ||
              addBrandResponse.status === 201
            ) {
              productData.brand = addBrandResponse.data.name;
            }
          })
          .then(() => {
            axios
              .post(`${prodAPI}/addProduct`, productData, {
                headers: {
                  Authorization: `Bearer ${this.state.logedUser.token}`,
                },
              })
              .then((addProdResponse) => {
                if (addProdResponse.status === 200) {
                  let cloneProducts = [...this.state.products];
                  cloneProducts.push(productData);
                  this.setState({ products: cloneProducts });
                }
              });
          });
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
    axios
      .delete(`${prodAPI}/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
      })
      .then((deleteCategoryResponse) => {
        if (deleteCategoryResponse.status === 200) {
          let cloneCategoryList = [...this.state.categoryList];
          this.setState({
            categoryList: cloneCategoryList.filter((c) => c._id !== categoryId),
          });
        }
      });
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
    axios
      .delete(`${prodAPI}/brands/${brandId}`, {
        headers: { Authorization: `Bearer ${this.state.logedUser.token}` },
      })
      .then((deleteBrandResponse) => {
        if (deleteBrandResponse.status === 200) {
          let cloneBrandList = [...this.state.brandList];
          this.setState({
            brandList: cloneBrandList.filter((b) => b._id !== brandId),
          });
        }
      });
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
        axios
          .post(
            `${prodAPI}/addOrder`,
            {
              payment_method: "cash on delivery",
              address_id: recievedPaymentDetails["shippingAddressId"],
            },
            {
              headers: {
                Authorization: `Bearer ${this.state.logedUser.token}`,
              },
            }
          )
          .then((addOrderRes) => {
            // console.log("App - addOrderRes: ", addOrderRes);
            if (addOrderRes.status === 200 || addOrderRes.status === 201) {
              let cloneProducts = [...this.state.products];
              // console.log("confirm order at clone: ", cloneProducts);

              cloneProducts.forEach((p) => {
                if (p.isSelected) {
                  p.isSelected = false;
                }
              });
              this.setState({ products: cloneProducts });
              // console.log("confirm order: ", cloneProducts);
              //loop over products and
            }
          });
        // console.log(
        //   "App - handleOrderCheckout - orderCheckoutResponse: ",
        //   orderCheckoutResponse
        // );
      }

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
            setLogedUser={this.setLogedUser}
          />
        )}
        {/* {(this.state.logedUser.userRole === '' || this.state.logedUser.userRole === 'user') &&
            } */}
        <main className="container-fluid p-0 min-height-100">
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
            <Route path="/myorders" element={<MyOrders />} />
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
                  logedUser={this.state.logedUser}
                />
              }
            />
            <Route
              path="/dashboard"
              element={<AdminDashboard logedUser={this.state.logedUser} />}
            >
              <Route path="/dashboard/statistics" element={<Statistics />} />
              <Route
                path="/dashboard/storeoperations"
                element={
                  <StoreOperations
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
              <Route
                path="/dashboard/manageproducts"
                element={
                  <ManageProducts
                    userRole={this.state.logedUser.userRole}
                    products={this.state.products}
                    handleSelectProductToCart={this.handleSelectProductToCart}
                    handleDeleteProduct={this.handleDeleteProduct}
                    handleSearchProducts={this.handleSearchProducts}
                  />
                }
              />
            </Route>
            {/* <Route path="/statistics" element={<Statistics />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
