export const OrderQuery = {
  getOrders: async () => {
    const res = await fetch("http://127.0.0.1:8000/api/v1/order/getOrders", {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  },

  editStatus: async (id: string, body: any) => {
 
    
    const res = await fetch("http://127.0.0.1:8000/api/v1/order/orderStatus/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
    return data;
  },
};
