export const QrQuery = {
  qrGetPro: async (id:string) => {
    try {
      const res = await fetch(
        "http://192.168.1.3:8000/api/v1/qrscan/getProByQr/inventory",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
