import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductQuery } from "../../providers/queries/Product.query";
import { LayoutForAdd } from "../../pages/Add";


export default function CategoryAddForm() {
  type Category = {
    Category: string;
  };

  const initialValue: Category = {
    Category: "",
  };

  const [category, setCategory] = useState<Category>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await ProductQuery.createCategory(category);
    console.log(category);
    
    if (res["status"] === 201) {
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
  };

  return (
    <LayoutForAdd>
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category Name</label>
        <input
          type="text"
          id="Category"
          name="Category"
          required
          onChange={handleChange}
        ></input>
        <button type="submit" className="add-button">Submit</button>
      </form>
    </div></LayoutForAdd>
  );
}
