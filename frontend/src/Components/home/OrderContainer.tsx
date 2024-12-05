import { useState, useEffect, useLayoutEffect } from "react";
import "../../css/Home.css";
import { OrderQuery } from "../../providers/queries/order.query";
import { LineChart } from "@mui/x-charts";

export default function OrderContainer() {
  type Product = {
    DisplayId: string;
    Title: string;
    Price: number;
    Quantity: string;
    Stock: number;
    Category: string;
    SubCategory: string;
    Description: string;
    Visible: string;
    LimitLowStock: number;
  };
  type Order = {
    _id: string;
    OrderId: string;
    UserId: string;
    Products: Product[];
    Total: number;
    Status: string;
    PaymentMethod: string;
    Address: string;
    Phone: string;
    Email: string;
    Note: string;
    PaymentStatus: string;
    OrederAcceptedOrNot: string;
    updatedAt: Date;
  };
  type monthlyRevenue = {
    month: number;
    revenue: number;
  };

  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState(0);
  const [processingOrder, setprocessingOrder] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<monthlyRevenue[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await OrderQuery.getOrders(); 
      
      if (res) {
        setOrders(res.data);
      } else {
        console.log("No data found");
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      filterOrders();
      calculateMonthlyRevenue();
    }
  }, [orders]);

  const filterOrders = () => {
    setDeliveredOrders(
      orders.filter((order: { Status: string }) => order.Status === "Delivered")
        .length
    );
    setPendingOrders(
      orders.filter((order: { Status: string }) => order.Status === "Pending")
        .length
    );

    setCanceledOrders(
      orders.filter((order: { Status: string }) => order.Status === "Cancelled")
        .length
    );

    setprocessingOrder(
      orders.filter(
        (order: { Status: string }) => order.Status === "Processing"
      ).length
    );
  };

  const calculateMonthlyRevenue = async () => {
    console.log("Monthly Revenue");
    const date = new Date();
    const currentMonth = date.getMonth() + 2;
    const monthlyRevenue: monthlyRevenue[] = [];
    for (let i = 1; i <= currentMonth; i++) {
      const revenue = orders
        .filter(
          (order: { updatedAt: Date }) =>
            new Date(order.updatedAt).getMonth() + 1 === i
        )
        .reduce((acc: number, order: { Total: number }) => {
          return acc + order.Total;
        }, 0);
      monthlyRevenue.push({ month: i, revenue: revenue });
    }
    setMonthlyRevenue(monthlyRevenue);
    console.log(monthlyRevenue);
  };

  return (
    <div className="order-container">
      {/* <div className="order-search">
        <input type="text" placeholder="Search Orders" />
        <button>Search</button>
      </div> */}
      <h4>Sales Activity</h4>
      <div className="counts-block">
        <div className="card">
          <div className="icon"></div>
          <div>
            <h3>Total Orders</h3>
            <h2>{orders.length}</h2>
          </div>
        </div>
        <div className="card">
          <div className="icon"></div>
          <div>
            <h3>Delivered Orders</h3>
            <h2>{deliveredOrders}</h2>
          </div>
        </div>
        <div className="card">
          <div className="icon"></div>
          <div>
            <h3>Processing Orders</h3>
            <h2>{processingOrder}</h2>
          </div>
        </div>
        <div className="card">
          <div className="icon"></div>
          <div>
            <h3>Pending Orders</h3>
            <h2>{pendingOrders}</h2>
          </div>
        </div>
      </div>
      <div className="order-graph-both">
        <div className="orders-graph">
          <LineChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "Total Orders",
                  "Delivered Orders",
                  "Processing Orders",
                  "Cancelled Orders",
                ],
                label: "Orders",
              },
            ]}
            series={[
              {
                data: [
                  orders.length,
                  deliveredOrders,
                  pendingOrders,
                  canceledOrders,
                ],
              },
            ]}
          />
        </div>
        <div className="orders-revenue-monthly">
          {monthlyRevenue.length >= 0 && (
            <LineChart
              xAxis={[
                {
                  scaleType: "band",
                  data: monthlyRevenue.map((data) => data.month.toString()),
                  label:
                    new Date().getFullYear().toString() + " Monthly Revenue",
                },
              ]}
              series={[
                {
                  data: monthlyRevenue.map((data) => data.revenue),
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
