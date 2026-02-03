import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, loading }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);