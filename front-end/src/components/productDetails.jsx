import React, {useState} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const queryString = require('query-string');

const ProductDetails = (props) => {
    let {id} = useParams();
    let location = useLocation();
    const parsedLocation = queryString.parse('location', location.keys);
    console.log(parsedLocation);
    // location.state;
    const [handleSave, setHandleSave] = useState('Hello World!')
    console.log(handleSave);

    const navigate = useNavigate();

    const onInputChange = (e) => {
        setHandleSave('Hey new world');
        console.log(handleSave);
        // window.history.replaceState({}, undefined, "/cart"); //for login form/page
        window.history.pushState({}, undefined, "/cart");

        navigate("/cart");
    }

    const product = props.products.find(p => p.id === +id);
    return ( 
        <React.Fragment>
            <h1>Prod Details No. {product.id}</h1>
            <h2>Name: {product.name}</h2>
            <h2>Count: {product.count}</h2>
            {/* <button onClick={}></button> */}
            <button onClick={onInputChange} className="btn btn-primary btn-sm">Save</button>
        </React.Fragment>
     );
}
 
export default ProductDetails;