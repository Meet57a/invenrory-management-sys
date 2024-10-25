import React, { useEffect, useState } from "react";
import { ProductQuery } from "../../providers/queries/Product.query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LayoutForAdd } from "../../pages/Add";

export default function SubCategoryAddForm() {
  type SubCategory = {
    Category: string;
    SubCategory: string;
  };

  type Category = {
    Category: string;
    CategoryId: string;
  };

  const initialValue: SubCategory = {
    Category: "",
    SubCategory: "",
  };

  const [subCategory, setSubCategory] =
    React.useState<SubCategory>(initialValue);
  const [category, setCategory] = useState<Category[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.name, e.target.value);
    setSubCategory({ ...subCategory, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await ProductQuery.getAll();
      if (res) {
        setCategory(res.categories);
        setSubCategory((prev) => ({
          ...prev,
          Category: res.categories[0]?.Category,
        }));
      } else {
        console.log("No data found");
      }
    };
    fetchCategory();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await ProductQuery.createSubCategory(subCategory);
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
          <div className="category-select">
            <label htmlFor="Category">Select Category</label>
            <select
              name="Category"
              id="Category"
              onChange={handleChange}
              required
              value={subCategory.Category}
              className="select-category-field"
            >
              {category.map((value, index) => (
                <option key={index} value={value.Category}>
                  {value.Category}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="SubCategory">Sub Category Name</label>
          <input
            type="text"
            id="SubCategory"
            name="SubCategory"
            required
            onChange={handleChange}
          ></input>
          <button type="submit" className="add-button">
            Submit
          </button>
        </form>
      </div>
    </LayoutForAdd>
  );
}
