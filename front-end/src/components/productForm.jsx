import React,{useEffect, useState} from "react";
// import axios from 'axios'
import { useParams } from 'react-router-dom';


const ProductForm = (props) => {

    const {id} = useParams();

    let[productData, setProductData] = useState({
        brand: "",
        category: "",
        name: "",
        price: "",
        description:"",
        count: "",
        images:["https://via.placeholder.com/300x200.png", "https://via.placeholder.com/700x321.png"]
    });

    // let[categoryList, setCategoryList] = useState(['Devices', 'Cosmotics', 'Vitamins'])
    // let[brandList, setBrandList] = useState(['Company 1', 'Company 2', 'Company 3'])

    useEffect( () => {
        if(id !== 'new'){
           let findProduct = props.products.find(p => p._id === id);
        //    console.log(findProduct)
            // setProductData(props.products.find(p => p._id === id))
            let cloneProductData = {...productData}
            console.log('cloneProductData: ', cloneProductData)
           for (let item in cloneProductData){
             cloneProductData[item] = findProduct[item];
           }
           setProductData(cloneProductData);
        }
    },[])
 
    const handleChange = e => {
        let cloneProductData = {...productData};
        cloneProductData[e.target.name] = e.target.value;
        setProductData(cloneProductData);
        console.log(cloneProductData);
    }

    const handleAddEditProductForm = e => {
        e.preventDefault();
        props.handleAddEditProduct(productData, id);
    }

    return ( 
        <React.Fragment>
            {/* productData.name !== '' */}
            {1 && 
            <div className="container">
                <form onSubmit = {handleAddEditProductForm} className="mt-3 mx-auto col-9 col-sm-8 col-lg-6 col-xl-4">
                 <div className="fs-3 my-3">{id === 'new'? 'Add Product': 'Edit Product'}</div>
                    <div className="mb-3">
                        <label htmlFor="inputCategory" className="form-label">Category</label>
                        <select 
                        onChange={handleChange}
                        name="category" id="inputCategory" className="form-select">
                            {/* the option value should = the id sent by the API */}
                            <option value="nothing">Select a category</option>
                            {props.categoryList.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputBrand" className="form-label">Brand</label>
                        <select 
                        onChange={handleChange}
                        name="brand" id="inputBrand" className="form-select">
                            <option value="nothing">Select a brand</option>
                            {props.brandList.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Product Name</label>
                    <input 
                        name="name" 
                        value={productData.name}
                        onChange={handleChange}
                    type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPrice" className="form-label">Price</label>
                    <input 
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        type="text" className="form-control" id="exampleInputPrice" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPrice" className="form-label">Count</label>
                    <input 
                        name="count"
                        value={productData.count}
                        onChange={handleChange}
                        type="text" className="form-control" id="inputCount" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPrice" className="form-label">Description</label>
                    <textarea 
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="form-control" id="inputDescription" style={{height: "150px"}}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputImage" className="form-label">Images</label>
                        {/* <input 
                        name="images"
                        value={productData.images}
                        onChange={handleChange}
                        type="text" className="form-control" id="inputImage" /> */}
                        {/* <input 
                        className="form-control"
                        type="file" name="image" id="inputImage" /> */}
                    </div>

                    <button type="submit" className="btn btn-primary px-4">{id==='new'?'Add':'Edit'}</button>
                </form>
            </div>
            }
        </React.Fragment>
     );
}
 
export default ProductForm;