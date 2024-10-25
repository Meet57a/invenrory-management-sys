import "../../css/add.css";
import { useState } from "react";
import { ProductQuery } from "../../providers/queries/Product.query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LayoutForAdd } from "../../pages/Add";
import { useEffect } from "react";

export default function ProductAddForm() {
  type Product = {
    Title: string;
    Price: number;
    Quantity: string;
    Stock: number;
    Category: string;
    SubCategory: string;
    Description: string;
    Image: string;
    Visible: string;
    LimitLowStock: number;

  };

  type Category = {
    Category: string;
    CategoryId: string;
  };

  type SubCategory = {
    Category: string;
    SubCategory: string;
    SubCategoryId: string;
  };

  const initialValue: Product = {
    Title: "",
    Price: 0,
    Quantity: "",
    Stock: 0,
    Category: "",
    SubCategory: "",
    Description: "",
    Image: "",
    Visible: "true",
    LimitLowStock: 0,
  };

  const [product, setProduct] = useState<Product>(initialValue);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await ProductQuery.createProduct(product);

    if (res["status"] === 201) {
      toast.success("Product added successfully", {
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
    console.log(res);
  };

  const [category, setCategory] = useState<Category[]>([]);
  const [subcategory, setSubCategory] = useState<SubCategory[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await ProductQuery.getAll();

      if (res) {
        setCategory(res.categories);
        setSubCategory(res.subcategories);
        console.log(res.categories[0].Category);
        setProduct((prev) => ({
          ...prev,
          SubCategory: res.subcategories[0]?.SubCategory,
          Category: res.categories[0]?.Category,
        }));
      } else {
        console.log("No data found");
      }
    };
    fetchCategory();
  }, []);

  return (
    <LayoutForAdd>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            id="Title"
            name="Title"
            onChange={handleChange}
            required
          />
          <div className="div-for-flex">
            <div>
              <label htmlFor="Price">Price</label>
              <input
                type="number"
                id="Price"
                name="Price"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="Quantity">Quantity</label>
              <input
                type="text"
                id="Quantity"
                onChange={handleChange}
                name="Quantity"
              />
            </div>
            <div>
              <label htmlFor="Stock">Stock Available (in number)</label>
              <input
                type="number"
                id="Stock"
                name="Stock"
                min={1}
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="div-for-flex">
            <div>
              <label htmlFor="Category">Select Category</label>
              <select
                name="Category"
                id="Category"
                onChange={handleChange}
                required
                value={product.Category}
              >
                {category.map((value, index) => (
                  <option key={index} value={value.Category}>
                    {value.Category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="SubCategory">Select Sub Category</label>
              <select
                name="SubCategory"
                id="subcategory"
                onChange={handleChange}
                required
                value={product.SubCategory}
              >
                {subcategory.map((value, index) => (
                  <option key={index} value={value.SubCategory}>
                    {value.SubCategory}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="textareadiv">
            <label htmlFor="Description">Description</label>
            <textarea
              name="Description"
              id="description"
              onChange={handleChange}
            ></textarea>
          </div>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" onChange={handleChange} />
          <div className="visiblityfield">
            <label htmlFor="visibility">Visibility</label>
            <select
              name="Visible"
              id="visibility"
              onChange={handleChange}
              required
              value={product.Visible}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <label htmlFor="lowStockLimit">Low Stock Limit</label>
          <input
            type="number"
            id="LowStockLimit"
            name="LimitLowStock"
            required
            onChange={handleChange}
          />

          <button type="submit" className="add-button">
            Add
          </button>
        </form>
      </div>
    </LayoutForAdd>
  );
}
