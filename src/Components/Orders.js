import React,{useEffect, useState} from 'react';
import { db } from '../Config/Config'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import close from '../images/close.png'
import { Navbar } from './Navbar';
import { Button } from './Button';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
const Orders = ({ user, userUid }) => {

    const [orders, setOrders] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [currentOrderId, setCurrentOrderId] = useState('')

    const handleClose = () => {
        setCurrentOrderId('')
        setIsVisibleModal(false)
    };
    const handleShow = (id) => {
        setCurrentOrderId(id)
        setIsVisibleModal(true)
    };

    const cancelOrder = async () => {
        await deleteDoc(doc(db, `Buyer-info-${userUid}`, currentOrderId));
        const temp = [...orders]
        setOrders(temp.filter(order => order.id !== currentOrderId))
        setIsVisibleModal(false)
    }

    useEffect(() => {
        const querySnapshot = getDocs(collection(db, `Buyer-info-${userUid}`)).then((querySnapsot) => {
            querySnapsot.forEach((doc) => {
                let order = doc.data()
                Object.assign(order,{id:doc.id})
                setOrders((prev)=>[...prev,order])
              });
        })
    },[])

    return (
        <>
            <Navbar user={user} />
                <Modal 
                    open={isVisibleModal} 
                    onClose={handleClose} 
                    center
                    closeIcon={
                        <img src={close} style={{height:'24px'}}/>
                    }
                    classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                    }}>
                        <h2 style={{color:'#000', marginTop:'25px'}}>Do you confirm the cancellation of the order?</h2>
                        <div style={{alignItems:'center', display:'flex',justifyContent:'center',alignSelf:'center',width:'100%', marginTop:'10px'}}>
                            <div style={{marginRight:'10px'}}>
                                <Button
                                    title={'Cancel'}
                                    onClick={()=>{handleClose()}}
                                    backgroundColor={'#e4e4e4'}
                                    padding={'5px 10px 5px 10px'}
                                    color={'#f16A28'} 
                                    border={'1px solid #e4e4e4'}
                                />
                            </div>
                            <div style={{marginLeft:'10px'}}>
                                <Button
                                    title={'Confirm'}
                                    onClick={()=>{cancelOrder()}}
                                    backgroundColor={'#F16A28'}
                                    padding={'5px 10px 5px 10px'}
                                    color={'#fff'} 
                                    border={'1px solid #F16A28'}
                                />
                            </div>
                        </div>
                </Modal>
                <div style={{backgroundColor:'#fff', position:'absolute', width:'100%', display:'flex', flexDirection:'column', alignItems:'center', minHeight:'100%'}}>
                {orders.length === 0 && <div style={{marginTop:'50vh',color:'#fff'}}>Loading</div>}
                {orders.length > 0 && orders.map(order => (
                    <div key={order.id} className='ordersContainer'>
                        <div className='dateContainer'>
                            <div>
                                <span style={{ fontFamily: 'Raleway', color: '#000' }}>Date </span>
                                <span style={{ fontFamily: 'Raleway', color: '#f16a28' }}>{order.DateOfShop}</span>
                            </div>
                            <div>
                                <span style={{ fontFamily: 'Raleway', color: '#000' }}>Order </span>
                                <span style={{ fontFamily: 'Raleway', color: '#f16a28' }}>#{order.id}</span>
                            </div>
                        </div>
                        <div style={{alignItems:'center', display:'flex',flexDirection:'column'}}>
                            {order.BuyerGoods.length > 0 && order.BuyerGoods.map(product => (
                                <div className='buyerGoodsContainer' key={product.img}>
                                    <div style={{width:'25%'}}>
                                        <img src={product.img} style={{width:"80%", padding:'20px'}} alt="not found" />
                                    </div>
                                    <div style={{width:'75%', display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                        <span style={{color:'#F16A28', marginTop:'10px',marginRight:'10px'}}>{product.name}</span>
                                        <span style={{display:'flex',justifyContent:'space-between',marginBottom:'10px',marginRight:'10px'}}><span style={{color:'#000'}}>Qty: {product.qty} </span><span style={{color:'#000'}} >Price: ${product.price}</span></span>
                                    </div>
                                </div>
                            ))}
                            <div style={{width:'100%',backgroundColor:'#F16A28',height:'1px'}}></div>
                        </div>
                        <div style={{width:'100%', display:'flex',flexDirection:'row', justifyContent:'space-between',height:'45px', alignItems:'center', textAlign:'center'}}>
                            <div style={{marginLeft:'10px', alignItems:'center',display:'flex',flexDirection:'row'}} onClick={()=>{handleShow(order.id)}}>
                                <img src={close} style={{height:'24px'}}/>
                                <span style={{color:'#F16A28',fontFamily:'Raleway',marginLeft:'5px'}}>Cancel Order</span>    
                            </div>
                            <div style={{marginRight:'10px', color:'#F16A28',fontFamily:'Raleway'}}>
                                Total: ${order.BuyerPayment.toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Orders;