import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Product extends Component {
    state = { 
        // name: this.props.product.name,
        // count: this.props.product.count,
        // imgUrl:"logo192.png",
        // names:['Ahmed','Mohamed','Mahmoud']
     } 

     getClasses(){
        return this.props.product.count === 0
        ? 'badge bg-warning p-2' 
        : 'badge bg-primary p-2' ;
     }

     //1. Solution 1
    //  renderNames(){
    //      if(this.state.names.length ===0){
    //          return <h2>No Names</h2>
    //      }
    //      else{
    //         return(
    //         <ul>
    //             {this.state.names.map((name)=>{
    //                 return <li key={name}>{name}</li>
    //             })}
    //          </ul>
    //         ) 
    //      }
    //  }


    componentDidMount(){
        //For Calling Backend Server
        console.log("Product ===> componentDidMount")
    }

    componentWillUnmount(){
        //to get rid of a piece of info inside memory
        //close an open connection
        console.log("Product ===> componentWillUnmount")
    }

    render() { 
        // const styles = {color:'red'}
        // console.log(this.props.product.count);
        console.log("Product ===> render")
        
        return (
            <React.Fragment>
            <div className="card mb-3">
            <div className="card-body">
            <div className="">
                {/* <img src={this.state.imgUrl} alt="" /> */}
                
                {/* 2. Solution 2 */}
                {/* {this.state.names.length === 0 && <h4>No Names</h4> }
                <ul>
                {this.state.names.map((name)=>{
                    return <li key={name}>{name}</li>
                })}
            </ul> */}
                {/* {this.renderNames()} */}
                {/* {this.props.children} */}
                <div className="d-flex justify-content-around">
                    <div role="button" className="">
                        <Link to={`/products/${this.props.product.id}`} className="text-decoration-none">{this.props.product.name}</Link>
                    </div>
                    <div className="d-flex justify-content-end">
                        <span role="button" onClick={()=>this.props.onIncrement(this.props.product)} className="fs-5">-</span>

                        <input type="text" id="form1" min="0" name="quantity" value={this.props.product.count}  className="form-control form-control-sm p-0 w-25 mx-3 text-center" disabled/>
                        {/* <span role="button" className={this.getClasses()}>{this.props.product.count}</span>  */}
                        <span role="button" onClick={()=>this.props.onIncrement(this.props.product)} className="fs-5">+</span>
                        <i onClick={()=>this.props.handleDelete(this.props.product)} className="bi bi-trash-fill fs-4"></i>

                    </div>
                        {/* <div className="col-sm-2">
                            <button onClick={()=>this.props.onIncrement(this.props.product)} className="btn btn-primary btn-sm">+</button>

                        </div> */}
                        {/* <div role="button" className="">
                        </div> */}
                </div>
                {/* <div className="col-5 col-sm-4">
                    <span className='me-1'>
                    </span>

                </div>
                <div className="col-1">
                </div>
                <div className="col-1">
                </div>
                <div className="col-1" role="button">
                </div> */}
            </div>
            </div>
            </div>

            </React.Fragment>

        );
    }
}
 
export default Product;