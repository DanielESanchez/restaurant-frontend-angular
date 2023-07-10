import { OrderItem } from "./order-item";

export interface Order {
    orderList: OrderItem[];
    waiterAssigned: string;
    table: number;
    isCompleted: boolean;
}