import { MenuItem } from "./menu-item";

export interface OrderItem{
    menuItem: MenuItem;
    isBeingCooked: boolean;
    chefAssigned: string;
    isCompleted: boolean;
    quantity: number;
}