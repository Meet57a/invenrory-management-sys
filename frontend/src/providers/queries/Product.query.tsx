export const ProductQuery = {
  createProduct: async (product: any) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/product/createProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(product),
        }
      );
      console.log(res);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  createCategory: async (category: any) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/product/createCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(category),
        }
      );
      console.log(res);
      const data = await res.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  createSubCategory: async (subcategory: any) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/product/createSubCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(subcategory),
        }
      );
      console.log(res);
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/product/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (id: any) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/product/deleteProduct/" + id,
        {
          method: "DELETE",
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

  deleteCategory: async (id: any) => {
    try {
      console.log(id);

      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/product/deleteCategory/" + id,
        {
          method: "DELETE",
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

  deleteSubCategory: async (id: any) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/product/deleteSubCategory/" + id,
        {
          method: "DELETE",
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

  updateCategory: async (id: any, category: any) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/product/editCategory/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(category),
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  updateSubCategory: async (id: any, subcategory: any) => {
    console.log(subcategory);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/product/editSubCategory/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(subcategory),
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  updateProduct: async (id: any, product: any) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/product/editProduct/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(product),
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  alertProduct: async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/product/alertProduct", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      // const data = await res.json();
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};
