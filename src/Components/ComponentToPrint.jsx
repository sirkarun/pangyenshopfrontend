import React from "react";
export const ComponentToPrint = React.forwardRef((props, ref) => {
    const {cart,totalamount}=props;   
    return (
      <div ref={ref} className="p-5">
        <table className='table'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>name</td>
                            <td>price</td>
                            <td>Qty</td>
                            <td>total</td>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {cart? cart.map((cartproduct,key)=>
                        <tr key={key}>
                            <td>{cartproduct.id}</td>
                            <td>{cartproduct.name}</td>
                            <td>{cartproduct.price}</td>
                            <td>{cartproduct.quantity}</td>
                            <td>{cartproduct.totalamount}</td>
                          
                           
                        </tr>
                        ):""}
                    </tbody>
                </table>
                <h2 className='px-2 '>Total Amount:{totalamount}</h2>

      </div>
    );
  }); 