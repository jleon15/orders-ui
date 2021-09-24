import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const getOrderPage = () => axios.get("http://localhost:8080/api/orders");

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrderPage().then((response) => {
      setOrders(response.data.orders);
    });
  }, []);

  let orderItems = <h1>Order now!</h1>;

  if (orders.length > 0) {
    orderItems = orders.map((order) => (
      <div key={order.id}>
        <h2>{order.id}</h2>
        <div>
          <h3>Pizza</h3>
          <h4>Name: {order.pizza.name}</h4>
          {order.pizza.toppings.map((topping) => (
            <div key={topping.id}>{topping.name}</div>
          ))}
          <h4>Crust: {order.crust.name}</h4>
          <h4>Size: {order.size.size}</h4>
        </div>
      </div>
    ));
  }

  return <div>{orderItems}</div>;
}

export default Orders;
