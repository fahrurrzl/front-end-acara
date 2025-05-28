import instance from "@/libs/axios/instance";
import { ICart } from "@/types/Ticket";
import endpoint from "./endpoint.constant";

const orderService = {
  createOrder: (payload: ICart) => instance.post(endpoint.ORDER, payload),
  updateOrderStatus: (order_id: string, status: string) =>
    instance.put(`${endpoint.ORDER}/${order_id}/${status}`),
  getOrderHistory: (params: string) =>
    instance.get(`${endpoint.ORDER}-history?${params}`),
  getOrderByOrderId: (orderId: string) =>
    instance.get(`${endpoint.ORDER}/${orderId}`),
  getOrders: (params: string) => instance.get(`${endpoint.ORDER}?${params}`),
  deleteOrder: (orderId: string) =>
    instance.delete(`${endpoint.ORDER}/${orderId}`),
};

export default orderService;
