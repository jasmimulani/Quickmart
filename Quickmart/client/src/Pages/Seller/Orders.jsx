import React ,{ useEffect,useState } from 'react'
import { useAppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const Orders = () => {
   const {currency ,axios} = useAppContext()
   const [orders,setOrders] = useState([])
   const [loading, setLoading] = useState(false)

   const fetchOrders = async () =>{
    setLoading(true)
    try {
        const {data} = await axios.get('/api/order/seller')
        if(data.success){
            setOrders(data.orders || [])
            console.log('Orders fetched:', data.orders); // Log for debugging
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
        console.error('Error fetching orders:', error);
    } finally {
        setLoading(false)
    }
   };
useEffect(() =>{
    fetchOrders();
    // Auto-refresh orders every 5 seconds to catch payment updates from webhook
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
},[])


   return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
        <div className="md:p-10 p-4 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-lg font-medium">Orders List</h2>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600 text-sm font-medium">Total Orders: {orders.length}</span>
                    <button 
                        onClick={fetchOrders}
                        disabled={loading}
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <img src={assets.refresh_icon} alt="refresh" className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                </div>
            </div>
            {!orders || orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No orders found</p>
                </div>
            ) : (
            orders.map((order, index) => (
                order && (
                <div key={index} className="flex flex-col  md:items-center  md:flex-row
                gap-5 justify-between  p-5 max-w-4xl rounded-md border border-gray-300">

                    <div className="flex gap-5 max-w-80">
                        <img className="w-12 h-12 object-cover " src={assets.box_icon} alt="boxIcon" />
                        <div>
                            {order.items && order.items.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <p className="font-medium">
                                        {item.product?.name || 'Product Name Not Available'}{" "}
                                        <span className="text-primary">x {item.quantity || 0}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-sm md:text-base text-black/60">
                       
                        <p>{order.address?.street || 'N/A'}, {order.address?.city || 'N/A'}</p>
                        <p> {order.address?.state || 'N/A'},{order.address?.zipcode || 'N/A'}</p>
                        <p>{order.address?.phone || 'N/A'}</p>
                    </div>

                    <p className="font-medium text-base my-auto ">{currency}{order.amount}</p>

                    <div className="flex flex-col text-sm md:text-base text-black/60">
                        <p>Method: <span className={`font-medium ${order.paymentType === 'Online' ? 'text-blue-600' : 'text-purple-600'}`}>{order.paymentType === 'Online' ? ' Online' : ' COD'}</span></p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        {/* <p className={`font-medium text-base ${order.isPaid ? 'text-green-600' : 'text-orange-600'}`}>
                            {order.isPaid ? "✅ Paid" : "⏳ Pending"}
                        </p> */}
                    </div>
                </div>
                )
            ))
            )}
        </div>
    </div>
    );
}

export default Orders
