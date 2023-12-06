import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios'
import {  toast } from 'react-toastify';
import { ComponentToPrint } from '../Components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import { socket } from '../libs/socket'

function Pos() {
    const [products,setproducts]=useState([]);
    const [isloading,setisloading]=useState(false);
    const [cart,setcart]=useState([]);
    const [totalamount,settotalamount]=useState(0);

    useEffect(() => {
        // Replace with your Socket.IO server URL
    
        socket.on('connect', () => {
          console.log('Connected to Socket.IO server');
        });
    
        socket.on('message', (data) => {
          console.log('Received message:', data);
        });
    
        return () => {
          socket.disconnect();
        };
      }, []);

    const SendMessage=()=>{
        socket.emit('message', cart)
    }


    const addproducttocart=async(product)=>{
        console.log(product)
        let findproductincart= await cart.find(i=>{
            return i.id ===product.id;
        })
        if(findproductincart){
            let newcart=[];
            let newitem;

            cart.forEach(cartitem=>{
                if(cartitem.id===product.id){
                    newitem={
                        ...cartitem,
                        quantity:cartitem.quantity+1,
                        totalamount:cartitem.price * (cartitem.quantity+1)
                    }
                    newcart.push(newitem);
                }else{
                    newcart.push(cartitem);
                }
            })
            setcart(newcart);
            toast(`🦄 adding ${product.name} to cart`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else{
            let addingproduct={
                ...product,
                'quantity':1,
                'totalamount':product.price,

            }
            setcart([...cart,addingproduct])
            //toast(`adding ${product.name} to cart`)
            toast(`🦄 adding ${product.name} to cart`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const removeproduct=async(cartproduct)=>{
        const newcart= cart.filter(cartitem => cartitem.id!==cartproduct.id);
        setcart(newcart);
    }
    const componentRef = useRef();
    const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
   
    removeAfterPrint: false,
    });
  
    const handleprint=()=>{
        SendMessage();
        handleReactToPrint();
        setcart([]);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
              // Make the GET request using Axios
              setisloading(true);
              const fetchproduct=await axios.get('https://pangyenbackend.onrender.com/products');
                
                
                setproducts(await fetchproduct.data);
                setisloading(false);
            
      
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
    },[])
    useEffect(()=>{
        console.log(products);
    },[products])
    useEffect(()=>{
        let newtotalamount =0;
        cart.forEach(icart=>{
            newtotalamount=newtotalamount+parseInt(icart.totalamount)
        })
        settotalamount(newtotalamount);
    },[cart])
  return (
   

    <div className='row'>
        <div className='col-8'>
            {isloading?'Loading':<div className='row'> 
                {products.map((product,key) => 
                    <div key={key} className='col-4 mb-4'>
                        <div className='pos-item px-3 text-center border' onClick={()=>addproducttocart(product)}>
                            <p>{product.name}</p>
                            <img src={product.img} className='img-fluid pos-item img' alt={product.name}  />
                           
                            <p>{product.price}</p>
                        </div>
                    </div>
                )}
            </div>}
        </div>
        <div className='col-4'>
            <div style={{display:"none"}}><ComponentToPrint cart={cart} totalamount={totalamount} ref={componentRef}/></div>
            <div className='table bg-dark'>
                <table className='table table-dark'>
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
                          
                            <td><button className='btn btn-danger btn-sm' onClick={()=> removeproduct(cartproduct)}>Remove</button></td>
                        </tr>
                        ):"No Item In Cart"}
                    </tbody>
                </table>
                <h2 className='px-2 text-white'>Total Amount:{totalamount}</h2>
            </div>
            <div className='mt-3'>
                {totalamount!==0? <div>
                    <button className='btn btn-primary' onClick={()=> handleprint()}>จ่าย</button>
                </div>:'Pls Add Product To Cart'

                
            }
            </div>
        </div>
    </div>


  )
}

export default Pos