import React from 'react';

const Admin = (props) => {
    return ( 
        <React.Fragment>
             <table className="table">
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Item</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delte</th>
                    </tr>
                </thead>
                <tbody>
                    {props.products.filter(p => p.isDeleted === false).map(p => {
                        return(
                            <tr id={p.id}>
                                <th scope='row'>{p.id}</th>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td><i onClick={props.handleEdit} className="bi bi-pencil-square"></i></td>
                                <td><i onClick={()=>props.handleDelete(p)} className="bi bi-trash-fill"></i></td>
                            </tr>
                        )
                        })}
                </tbody>
            </table>
        </React.Fragment>
     );
}
 
export default Admin;