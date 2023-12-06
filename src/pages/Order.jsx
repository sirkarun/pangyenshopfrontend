import React, { useEffect,  useState } from 'react'

import {  toast } from 'react-toastify';
import { socket } from '../libs/socket'


function Order() {
   
    const [cart,setcart]=useState([]);



   
  
    const handleNewMessage = (data) => {
        console.log('received message : ', data)
        setcart(data);
     
      
      }
      
      useEffect(() => {
        
        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
            socket.emit('order')
          });
        socket.on('message', handleNewMessage)
       
      }, [])


  

    const removeproduct=async(index2)=>{
        socket.emit('delete', index2)
       
        
    }


return (
  
    
  
 
        <div className='row col-12'>
<table className="table">
  <thead>
    <tr>
    <td>#</td>
                            <td>name</td>
                            <td>price</td>
                            <td>Qty</td>
                            <td>total</td>
                            <td>action</td>
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
                          
                            <td><button className='btn btn-danger btn-sm'  onClick={()=> removeproduct(key)}>Remove</button></td>
                        </tr>
                        ):"No Item In Cart"}
  </tbody>
</table>
        </div>
 
     )
}
export default Order