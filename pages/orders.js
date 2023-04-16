import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders,setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1>Lịch sử đặt hàng</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Thời gian</th>
            <th>Tình trạng</th>
            <th>Người nhận</th>
            <th>Sản phẩm</th>
          </tr>
        </thead>
        <tbody>
        {orders.length > 0 && orders.map(order => (
          <tr key={order._id}>
            <td>{(new Date(order.createdAt)).toLocaleString()}
            </td>
            <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
              {order.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </td>
            <td>
              {order.name} {order.email}<br />
              {order.city} {order.postalCode} {order.country}<br />
              {order.streetAddress}
            </td>
            <td>
              {order.line_items.map(l => (
                <>
                  {l.price_data?.product_data.name} x
                  {l.quantity}<br />
                </>
              ))}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </Layout>
  );
}