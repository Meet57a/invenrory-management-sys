import { ChangeEvent, useEffect, useRef, useState } from "react";
import "../css/order.css";
import { OrderQuery } from "../providers/queries/order.query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoChevronBackSharp } from "react-icons/io5";
import { PdfQuery } from "../providers/queries/Pdf.query";

export default function Orders() {
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
  };

  type Selected =
    | "Orders"
    | "Order Details"
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered";

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Selected>("Pending");

  const [aOrder, setAOrder] = useState<Order>({
    _id: "",
    OrderId: "",
    UserId: "",
    Products: [],
    Total: 0,
    Status: "",
    PaymentMethod: "",
    Address: "",
    Phone: "",
    Email: "",
    Note: "",
    PaymentStatus: "",
    OrederAcceptedOrNot: "",
  });

  const handleSelecteChange = (selected: Selected, orderId: string) => {
    if (selected === "Pending") {
      const order = orders.filter((order) => order.Status === "Pending");
      setFilteredOrders(order);
      setSelected("Pending");
    } else if (selected === "Order Details") {
      const order = orders.filter((order) => order._id === orderId);
      setAOrder(order[0]);
      setSelected("Order Details");
    } else if (selected === "Processing") {
      const order = orders.filter((order) => order.Status === "Processing");
      setFilteredOrders(order);
      setSelected("Processing");
    } else if (selected === "Shipped") {
      const order = orders.filter((order) => order.Status === "Shipped");
      setFilteredOrders(order);
      setSelected("Shipped");
    } else if (selected === "Delivered") {
      const order = orders.filter((order) => order.Status === "Delivered");
      setFilteredOrders(order);
      setSelected("Delivered");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await OrderQuery.getOrders();
      if (res) {
        setOrders(res.data);
        console.log(orders);
        setFilteredOrders(
          res.data.filter(
            (order: { Status: string }) => order.Status === "Pending"
          )
        );
      } else {
        console.log("Error fetching orders");
      }
    };
    fetch();
  }, []);

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "All") {
      setFilteredOrders(orders);
    } else if (e.target.value === "Shipped") {
      setFilteredOrders(orders.filter((order) => order.Status === "Shipped"));
    } else if (e.target.value === "Processing") {
      setFilteredOrders(
        orders.filter((order) => order.Status === "Processing")
      );
    } else if (e.target.value === "Delivered") {
      setFilteredOrders(orders.filter((order) => order.Status === "Delivered"));
    } else if (e.target.value === "Cancelled") {
      setFilteredOrders(orders.filter((order) => order.Status === "Cancelled"));
    } else if (e.target.value === "Paid") {
      setFilteredOrders(
        orders.filter((order) => order.PaymentStatus === "Paid")
      );
    } else if (e.target.value === "Pending") {
      setFilteredOrders(
        orders.filter((order) => order.PaymentStatus === "Pending")
      );
    } else if (e.target.value === "Accepted") {
      setFilteredOrders(
        orders.filter((order) => order.OrederAcceptedOrNot === "Accepted")
      );
    } else if (e.target.value === "Cancelled") {
      setFilteredOrders(
        orders.filter((order) => order.OrederAcceptedOrNot === "Cancelled")
      );
    }
  };
  const getTargetElement = () => document.getElementById("content-id");
  const handleChange = async (
    e:
      | React.ChangeEvent
      | React.MouseEvent<HTMLSelectElement | HTMLButtonElement>,
    id: string,
    orderAcceptStatus: string
  ) => {
    if ((e.target as HTMLSelectElement).name === "Status") {
      const newOrders = filteredOrders.filter((order) => {
        if (order._id === id) {
          order.Status = (e.target as HTMLSelectElement).value;
        }
        return order;
      });
      setFilteredOrders(newOrders);
      const res = await OrderQuery.editStatus(id, {
        Status: (e.target as HTMLSelectElement).value,
      });

      if (res["status"] === 200) {
        setFilteredOrders(newOrders);

        toast.success(res["message"], {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.error(res["message"], {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } else {
      const res = await OrderQuery.editStatus(id, {
        OrederAcceptedOrNot: orderAcceptStatus,
        Status:
          orderAcceptStatus === "Accepted"
            ? "Processing"
            : orderAcceptStatus === "Canceled"
            ? "Cancelled"
            : "",
      });

      if (res["status"] === 200) {
        const newOrders = filteredOrders.filter((order) => {
          if (order._id === id) {
            order.OrederAcceptedOrNot = orderAcceptStatus;
            if (orderAcceptStatus === "Canceled") {
              order.Status = "Cancelled";
            } else if (orderAcceptStatus === "Accepted") {
              order.Status = "Processing";
            }
          }
          return order;
        });
        setFilteredOrders(newOrders);
        toast.success(res["message"], {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.error(res["message"], {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  };

  const handlePdf = async () => {
    console.log(aOrder._id);

    const res = await PdfQuery.generatePdf(aOrder._id);
    console.log(res);

    if (res) {
      toast.success(res["message"], {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      const pdf = res["data"];

      const a = document.createElement("a");
      a.href = pdf["path"];
      a.setAttribute("download", "output.pdf");
      a.download = "output.pdf";
      a.target = "_blank";
      a.click();
    } else {
      toast.error(res["message"], {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  return (
    <div className="order-body">
      <div className="left-container-order">
        <h3>Select</h3>
        <div className="components-order">
          <button onClick={() => handleSelecteChange("Pending", "")}>
            Pending
          </button>
          <button onClick={() => handleSelecteChange("Processing", "")}>
            Processing
          </button>
          <button onClick={() => handleSelecteChange("Shipped", "")}>
            Shipped
          </button>
          <button onClick={() => handleSelecteChange("Delivered", "")}>
            Delivered
          </button>
          {/* <button>Processing</button>
          <button>Cancelled</button> */}
        </div>
      </div>
      <div className="right-container-order">
        <div className="info-bar-order">
          {selected === "Order Details" ? (
            <div className="info-bar-order-details">
              <button
                className="back-button"
                onClick={() => handleSelecteChange("Pending", "")}
              >
                <IoChevronBackSharp size={25} />
              </button>
              <h3>{selected}</h3>
            </div>
          ) : null}
          {selected === "Pending" ||
          selected === "Delivered" ||
          selected === "Processing" ||
          selected === "Shipped" ? (
            <h3>{selected}</h3>
          ) : null}
          {/* {selected === "Pending" ? (
            <div className="filters">
              <select name="statusFilter" id="" onChange={handleFilter}>
                <option value="All">Filter Status</option>
                <option value="Shipped">Shipped</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select name="paymentStatusFilter" id="" onChange={handleFilter}>
                <option value="All">Filter Payment</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
              <select name="actionStatusFilter" id="" onChange={handleFilter}>
                <option value="All">Filter Action Status</option>
                <option value="Accepted">Accepted</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ) : null} */}
        </div>

        {selected === "Order Details" ? (
          <div className="order-details-body">
            <div className="product-details">
              <h3>Product Details</h3>
              {aOrder.Products.map((product, index) => (
                <div key={index} className="product-details-card">
                  <div className="product-no">Product No : {index + 1}</div>
                  <div className="product-data">
                    <div>
                      <span>Product Id : </span>
                      {product.DisplayId}
                    </div>
                    <div>
                      <span>Title : </span>
                      {product.Title}
                    </div>

                    <div className="numeric-value-in-product">
                      <div>
                        <span>Price : </span>
                        {product.Price}
                      </div>
                      <div>
                        <span>Quantity : </span>
                        {product.Quantity}
                      </div>
                      <div>
                        <span>Stock : </span>
                        {product.Stock}
                      </div>
                    </div>
                    <div className="categories-and-sub">
                      <div>
                        <span>Category : </span>
                        {product.Category}
                      </div>
                      <div>
                        <span>Sub Category : </span>
                        {product.SubCategory}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="order-detail-button">
                <button
                  style={{ background: "#76abae", border: "none" }}
                  onClick={() => handlePdf()}
                >
                  Download Invoice
                </button>
              </div>
            </div>
            <div className="order-details">
              <h3>Order Details</h3>

              <div className="order-product-details-card">
                <div className="Ordered-Product-Details">
                  Ordered Product Details
                </div>
                <div className="order-data">
                  <div>
                    <span>Order Id : </span>
                    {aOrder.OrderId}
                  </div>
                  <div>
                    <span>Total : </span>
                    {aOrder.Total}
                  </div>
                  <div className="status-order">
                    <div
                      style={
                        aOrder.Status === "Processing"
                          ? { color: "yellow" }
                          : aOrder.Status === "Delivered"
                          ? { color: "green" }
                          : aOrder.Status === "Cancelled"
                          ? { color: "red" }
                          : { color: "white" }
                      }
                    >
                      <span>Status : </span>
                      {aOrder.Status}
                    </div>
                    <div>
                      <span>Payment Method : </span>
                      {aOrder.PaymentMethod}
                    </div>
                    <div
                      style={
                        aOrder.PaymentStatus === "Paid"
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      <span>Payment Status : </span>
                      {aOrder.PaymentStatus}
                    </div>
                  </div>
                  <div>
                    <span>Note : </span>
                    {aOrder.Note}
                  </div>
                </div>
              </div>
              <div className="user-data-card">
                <div className="user-data-div">User Data</div>
                <div className="user-data">
                  <div>
                    <span>User Id : </span>
                    {aOrder.UserId}
                  </div>
                  <div>
                    <span>Email : </span>
                    {aOrder.Email}
                  </div>
                  <div>
                    <span>Phone : </span>
                    {aOrder.Phone}
                  </div>
                  <div>
                    <span>Address : </span>
                    {aOrder.Address}
                  </div>
                </div>
              </div>
              <div className="order-detail-button">
                <button
                  style={
                    aOrder.OrederAcceptedOrNot === "Accepted"
                      ? { backgroundColor: "green" }
                      : {}
                  }
                  onClick={(e) => handleChange(e, aOrder._id, "Accepted")}
                >
                  {aOrder.OrederAcceptedOrNot === "Accepted"
                    ? "Accepted"
                    : "Accept"}
                </button>
                <button
                  style={
                    aOrder.OrederAcceptedOrNot === "Canceled"
                      ? { backgroundColor: "red" }
                      : {}
                  }
                  onClick={(e) => handleChange(e, aOrder._id, "Canceled")}
                >
                  {aOrder.OrederAcceptedOrNot === "Canceled"
                    ? "Cancelled"
                    : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {selected !== "Order Details" ? (
          <div className="main-content-body-order">
            <div>
              <div className="order-heading">
                <div>Product id</div>
                <div>Order id</div>
                <div>Email</div>
                <div>Status</div>
                <div>Payment</div>
                <div>Actions</div>
              </div>
              {filteredOrders.map((value, index) => (
                <div key={index} className="orders">
                  <div className="productid">
                    {value.Products.map((product) => (
                      <>
                        <div className="productid">{product.Title}</div>
                        <div className="id">{product.DisplayId}</div>
                      </>
                    ))}
                  </div>
                  <div className="orderid">
                    <div className="orderid">{value.UserId}</div>
                    <div className="id">{value.OrderId}</div>
                  </div>
                  <div className="email">{value.Email}</div>
                  {value.OrederAcceptedOrNot === "Canceled" ? (
                    <div style={{ color: "red" }}>Cancelled</div>
                  ) : value.Status === "Delivered" ? (
                    <div style={{ color: "green" }}>Delivered</div>
                  ) : (
                    <select
                      name="Status"
                      id=""
                      className="select-order-status"
                      style={
                        value.Status === "Shipped"
                          ? { borderColor: "white" }
                          : value.Status === "Processing"
                          ? { borderColor: "yellow" }
                          : value.Status === "Delivered"
                          ? { borderColor: "green" }
                          : { borderColor: "red" }
                      }
                      value={value.Status}
                      onChange={(e) => handleChange(e, value._id, "")}
                    >
                      <option value="Shipped">Shipped</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  )}
                  <div
                    style={
                      value.PaymentStatus === "Paid"
                        ? { color: "green" }
                        : value.PaymentStatus === "Pending"
                        ? { color: "yellow" }
                        : { color: "red" }
                    }
                  >
                    {value.PaymentStatus}
                  </div>
                  {selected !== "Delivered" ? (
                    <div className="actions">
                      <div className="orders-action-button">
                        <button
                          style={
                            value.OrederAcceptedOrNot === "Accepted"
                              ? { backgroundColor: "green" }
                              : {}
                          }
                          onClick={(e) =>
                            handleChange(e, value._id, "Accepted")
                          }
                        >
                          {value.OrederAcceptedOrNot === "Accepted"
                            ? "Accepted"
                            : "Accept"}
                        </button>
                        <button
                          style={
                            value.OrederAcceptedOrNot === "Canceled"
                              ? { backgroundColor: "red" }
                              : {}
                          }
                          onClick={(e) => {
                            handleChange(e, value._id, "Canceled");
                          }}
                        >
                          {value.OrederAcceptedOrNot === "Canceled"
                            ? "Cancelled"
                            : "Cancel"}
                        </button>
                      </div>
                      <div>
                        <button
                          className="see-more-button"
                          onClick={() =>
                            handleSelecteChange("Order Details", value._id)
                          }
                        >
                          See More
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
