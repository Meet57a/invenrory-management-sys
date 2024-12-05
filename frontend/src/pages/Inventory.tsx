import "../css/Inventory.css";
import { useEffect, useState } from "react";
import { ProductQuery } from "../providers/queries/Product.query";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "primereact/dialog";
import { IoIosWarning } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { GoEyeClosed } from "react-icons/go";
import { IoMdDownload } from "react-icons/io";
import { PdfQuery } from "../providers/queries/Pdf.query";
import QRCode from "react-qr-code";

export default function Inventory() {
  type Category = {
    _id: string;
    Category: string;
    CategoryId: string;
  };

  type SubCategory = {
    _id: string;
    Category: string;
    SubCategory: string;
    SubCategoryId: string;
  };

  type Product = {
    _id: string;
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
  type Selected = "Categories" | "Sub Categories" | "Products";
  const [selected, setSelected] = useState<Selected>("Products");
  const [category, setCategory] = useState<Category[]>([]);
  const [subcategory, setSubCategory] = useState<SubCategory[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const [filterdSubCategory, setFilterdSubCategory] = useState<SubCategory[]>(
    []
  );
  const [filterdCategory, setFilterdCategory] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await ProductQuery.getAll();

      if (res) {
        setCategory(res.categories);
        setSubCategory(res.subcategories);
        setProduct(res.products);
        setFilteredProduct(res.products);
        setFilterdSubCategory(res.subcategories);
        setFilterdCategory(res.categories);
      } else {
        console.log("No data found");
      }
    };
    fetchCategory();
  }, []);

  const handleSelecteChange = (selected: Selected) => {
    setSelected(selected);
  };

  const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selected === "Products") {
      if (e.target.value === "") {
        setFilteredProduct(product);
        setFilterdSubCategory(subcategory);
      } else {
        if (e.target.name !== "filterSubCategory") {
          const filteredSubCategory = subcategory.filter(
            (value) => value.Category === e.target.value
          );
          setFilterdSubCategory(filteredSubCategory);
        }
        const filteredProduct = product.filter(
          (value) =>
            value.Category === e.target.value ||
            value.SubCategory === e.target.value
        );
        setFilteredProduct(filteredProduct);
      }
    } else if (selected === "Categories") {
      if (e.target.value === "") {
        setFilterdCategory(category);
      } else {
        if (e.target.name === "filterCategory") {
          const filteredCategory = category.filter((value) =>
            value.Category.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setFilterdCategory(filteredCategory);
        }
      }
    } else if (selected === "Sub Categories") {
      if (e.target.value === "") {
        setFilterdSubCategory(subcategory);
      } else {
        if (e.target.name === "filterCategory") {
          const fileterd = subcategory.filter((val) => {
            return val.Category === e.target.value;
          });
          setFilterdSubCategory(fileterd);
        }
        const filteredSubCategory = subcategory.filter((value) => {
          return value.SubCategory === e.target.value;
        });
        setFilterdSubCategory(filteredSubCategory);
      }
    }
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearch(e.target.value);
    if (selected === "Products") {
      if (e.target.value === "") {
        setFilteredProduct(product);
      } else {
        const filteredProduct = product.filter(
          (value) =>
            value.Title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            value.Category.toLowerCase().includes(
              e.target.value.toLowerCase()
            ) ||
            value.SubCategory.toLowerCase().includes(
              e.target.value.toLowerCase()
            )
        );
        setFilteredProduct(filteredProduct);
      }
    } else if (selected === "Sub Categories") {
      if (e.target.value === "") {
        setFilterdSubCategory(subcategory);
      } else {
        const filteredSubCategory = subcategory.filter(
          (value) =>
            value.SubCategory.toLowerCase().includes(
              e.target.value.toLowerCase()
            ) ||
            value.Category.toLowerCase().includes(e.target.value.toLowerCase())
        );

        setFilterdSubCategory(filteredSubCategory);
      }
    } else {
      if (e.target.value === "") {
        setFilterdCategory(category);
      } else {
        const filteredCategory = category.filter((value) =>
          value.Category.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilterdCategory(filteredCategory);
      }
    }
  };

  const handleProductDelete = async (id: string) => {
    const res = await ProductQuery.deleteProduct(id);

    if (res["status"] === 200) {
      const newProduct = product.filter((value) => value._id !== id);
      setProduct(newProduct);
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

  const handleCategoryDelete = async (id: string, categoryname: string) => {
    const res = await ProductQuery.deleteCategory(id);

    if (res["status"] === 200) {
      const newcategory = category.filter((value) => value._id !== id);
      const newsubcategory = subcategory.filter(
        (value) => value.Category !== categoryname
      );
      const newProduct = product.filter(
        (value) => value.Category !== categoryname
      );
      setSubCategory(newsubcategory);
      setCategory(newcategory);
      setProduct(newProduct);
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

  const handleSubCategoryDelete = async (
    id: string,
    subCategoryName: string
  ) => {
    const res = await ProductQuery.deleteSubCategory(id);

    if (res["status"] === 200) {
      const newsubcategory = subcategory.filter((value) => value._id !== id);
      const newProduct = product.filter(
        (value) => value.SubCategory !== subCategoryName
      );
      setSubCategory(newsubcategory);
      setProduct(newProduct);
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
  const initialCategory: Category = {
    Category: "",
    _id: "",
    CategoryId: "",
  };
  const initialSubCategory: SubCategory = {
    Category: "",
    SubCategory: "",
    SubCategoryId: "",
    _id: "",
  };
  const initialProduct: Product = {
    _id: "",
    Category: "",
    Description: "",
    DisplayId: "",
    Title: "",
    Price: 0,
    Quantity: "",
    Stock: 0,
    SubCategory: "",
    Visible: "",
    LimitLowStock: 0,
  };
  const [categoryEdit, setCategoryEdit] = useState<Category>(initialCategory);
  const [subCategoryEdit, setSubCategoryEdit] =
    useState<SubCategory>(initialSubCategory);
  const [productEdit, setProductEdit] = useState<Product>(initialProduct);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    // setCategoryEdit({
    //   ...categoryEdit,
    //   Category: e.target.value,
    // });
    if (e.target.name === "category") {
      setCategoryEdit({
        ...categoryEdit,
        Category: e.target.value,
      });
    } else if (e.target.name === "sub-category") {
      setSubCategoryEdit({
        ...subCategoryEdit,
        SubCategory: e.target.value,
      });
    } else if (e.target.name === "select-category") {
      setSubCategoryEdit({
        ...subCategoryEdit,
        Category: e.target.value,
      });
    }
  };
  const handleProductChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProductEdit({
      ...productEdit,
      [e.target.name]: e.target.value,
    });
  };
  const handleCategoryDialog = (
    categoryName: string,
    id: string,
    categoryId: string
  ) => {
    setOpenDialog(!openDialog);
    setCategoryEdit({
      Category: categoryName,
      _id: id,
      CategoryId: categoryId,
    });
  };

  const handleSubCategoryDialog = (
    subCategory: string,
    id: string,
    category: string
  ) => {
    setOpenDialog(!openDialog);
    setSubCategoryEdit({
      Category: category,
      SubCategory: subCategory,
      SubCategoryId: "",
      _id: id,
    });
  };

  const handleProductDialog = (
    id: string,
    displayId: string,
    title: string,
    price: number,
    quantity: string,
    stock: number,
    category: string,
    subcategory: string,
    description: string,
    visible: string,
    limitLowStock: number
  ) => {
    setOpenDialog(!openDialog);
    setProductEdit({
      _id: id,
      DisplayId: "",
      Title: title,
      Price: price,
      Quantity: quantity,
      Stock: stock,
      Category: category,
      SubCategory: subcategory,
      Description: description,
      Visible: visible,
      LimitLowStock: limitLowStock,
    });
    console.log(productEdit);
  };

  const handleEditSubmit = async (
    name: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (name === "category") {
      const res = await ProductQuery.updateCategory(
        categoryEdit._id,
        categoryEdit
      );
      if (res["status"] === 200) {
        const newCategory = category.map((value) =>
          value._id === categoryEdit._id ? categoryEdit : value
        );
        setCategory(newCategory);
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
    } else if (name === "subCategory") {
      const res = await ProductQuery.updateSubCategory(
        subCategoryEdit._id,
        subCategoryEdit
      );
      if (res["status"] === 200) {
        const newSubCategory = subcategory.map((value) =>
          value._id === subCategoryEdit._id ? subCategoryEdit : value
        );
        setSubCategory(newSubCategory);
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
    } else if (name === "product") {
      const res = await ProductQuery.updateProduct(
        productEdit._id,
        productEdit
      );
      if (res["status"] === 200) {
        const newproduct = product.map((value) =>
          value._id === productEdit._id ? productEdit : value
        );
        setProduct(newproduct);

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

  const handleReportPdf = async () => {
    const res = await PdfQuery.generatePdfReport();
    const pdf = res["data"];
    if (res["status"] === 201) {
      toast.success(res["message"], {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      const a = document.createElement("a");
      a.href = pdf["path"];
      a.download = "report.pdf";
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
    <div className="inventory-body">
      <div className="left-container">
        <h3>Select</h3>
        <div className="components">
          <button onClick={() => handleSelecteChange("Products")}>
            Product
          </button>
          <button onClick={() => handleSelecteChange("Categories")}>
            Category
          </button>
          <button onClick={() => handleSelecteChange("Sub Categories")}>
            Sub Category
          </button>
          <QRCode value="get-report-from-qr" className="qr-inventory" size={200}/>
        </div>
      </div>
      <div className="right-container">
        <div className="info-bar">
          <h2>{selected}</h2>

          <div className="search-bar-div">
            <div className="filters">
              <select name="filterCategory" id="" onChange={handleFilters}>
                <option value="">Filter Category</option>
                {category.map((value, index) => (
                  <option key={index} value={value.Category}>
                    {value.Category}
                  </option>
                ))}
              </select>
              <select name="filterSubCategory" id="" onChange={handleFilters}>
                <option value="">Filter Sub Category</option>
                {filterdSubCategory.map((value, index) => (
                  <option key={index} value={value.SubCategory}>
                    {value.SubCategory}
                  </option>
                ))}
              </select>
            </div>
            <IoIosSearch color="" className="search-icon" />
            <input
              type="search"
              className="search-bar"
              onChange={handleSearch}
              value={search}
            />
            <button className="report-button" onClick={() => handleReportPdf()}>
              <IoMdDownload size={15} color="white" />
              Report
            </button>
          </div>
        </div>
        <div className="main-content">
          {selected === "Categories" ? (
            <div className="category-section">
              <div className="category-section-heading">
                <div>Category</div>
                <div>Category Id</div>
              </div>
              {openDialog ? (
                <Dialog
                  visible={openDialog}
                  modal
                  onHide={() => setOpenDialog(false)}
                  className="dialog-edit-form-category"
                  closeOnEscape={true}
                  content={({ hide }) => (
                    <>
                      <h3>Edit Category</h3>
                      <form onSubmit={(e) => handleEditSubmit("category", e)}>
                        <label htmlFor="category">Category Name</label>
                        <input
                          type="text"
                          id="category"
                          name="category"
                          required
                          onChange={handleChange}
                          value={categoryEdit.Category}
                        ></input>
                        <button className="edit-button">Edit</button>
                        <button
                          className="edit-button"
                          type="button"
                          onClick={hide}
                        >
                          Close
                        </button>
                      </form>
                    </>
                  )}
                ></Dialog>
              ) : null}
              {filterdCategory.map((value, index) => (
                <div key={index} className="category">
                  <div className="categoryName  ">{value.Category}</div>
                  <div className="category-id">{value.CategoryId}</div>
                  <div className="button-section">
                    <button
                      onClick={() =>
                        handleCategoryDialog(
                          value.Category,
                          value._id,
                          value.CategoryId
                        )
                      }
                    >
                      <MdEdit size={20} color="yellow" />
                    </button>
                    <button
                      onClick={() =>
                        handleCategoryDelete(value._id, value.Category)
                      }
                    >
                      <MdDelete className="delete-icon" size={20} color="red" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : selected === "Sub Categories" ? (
            <div className="sub-category-section">
              <div className="sub-category-section-heading">
                <div>Category</div>
                <div>Sub Category</div>
                <div>Sub Category Id</div>
              </div>
              {openDialog ? (
                <Dialog
                  visible={openDialog}
                  modal
                  onHide={() => setOpenDialog(false)}
                  className="dialog-edit-form-subcategory"
                  closeOnEscape={true}
                  content={({ hide }) => (
                    <>
                      <h3>Edit Category</h3>
                      <form
                        onSubmit={(e) => handleEditSubmit("subCategory", e)}
                      >
                        <div className="category-select">
                          <label htmlFor="select-category">
                            Select Category
                          </label>
                          <select
                            name="select-category"
                            id="select-category"
                            onChange={handleChange}
                            value={subCategoryEdit.Category}
                          >
                            {category.map((value, index) => (
                              <option key={index} value={value.Category}>
                                {value.Category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <label htmlFor="sub-category">Sub Category Name</label>
                        <input
                          type="text"
                          id="sub-category"
                          name="sub-category"
                          required
                          onChange={handleChange}
                          value={subCategoryEdit.SubCategory}
                        ></input>
                        <button className="edit-button">Edit</button>
                        <button
                          className="edit-button"
                          type="button"
                          onClick={hide}
                        >
                          Close
                        </button>
                      </form>
                    </>
                  )}
                ></Dialog>
              ) : null}

              {filterdSubCategory.map((value, index) => (
                <div key={index} className="sub-category">
                  <div className="subCategoryName">{value.Category}</div>
                  <div className="subCategoryName">{value.SubCategory}</div>
                  <div>{value.SubCategoryId}</div>
                  <div className="button-section">
                    <button
                      onClick={() =>
                        handleSubCategoryDialog(
                          value.SubCategory,
                          value._id,
                          value.Category
                        )
                      }
                    >
                      <MdEdit size={20} color="yellow" />
                    </button>
                    <button
                      onClick={() =>
                        handleSubCategoryDelete(value._id, value.SubCategory)
                      }
                    >
                      <MdDelete className="delete-icon" size={20} color="red" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="product-section">
              <div className="product-section-heading">
                <div>Product Id</div>
                <div>Title</div>
                <div>Price</div>
                <div>Stock</div>
                <div>Category/Sub Category</div>
                <div>Actions</div>
              </div>
              {openDialog ? (
                <Dialog
                  visible={openDialog}
                  modal
                  onHide={() => setOpenDialog(false)}
                  className="dialog-edit-form-product"
                  closeOnEscape={true}
                  content={({ hide }) => (
                    <>
                      <h3>Edit Product</h3>
                      <form onSubmit={(e) => handleEditSubmit("product", e)}>
                        <label htmlFor="Title">Product Name</label>
                        <input
                          type="text"
                          id="Title"
                          name="Title"
                          required
                          onChange={handleProductChange}
                          value={productEdit.Title}
                        ></input>
                        <div className="div-for-flex">
                          <div>
                            <label htmlFor="Price">Price</label>
                            <input
                              type="number"
                              id="Price"
                              name="Price"
                              onChange={handleProductChange}
                              required
                              value={productEdit.Price}
                            />
                          </div>
                          <div>
                            <label htmlFor="Quantity">Quantity</label>
                            <input
                              type="text"
                              id="Quantity"
                              onChange={handleProductChange}
                              name="Quantity"
                              value={productEdit.Quantity}
                            />
                          </div>
                          <div>
                            <label htmlFor="Stock">
                              Stock Available (in number)
                            </label>
                            <input
                              type="number"
                              id="Stock"
                              name="Stock"
                              min={1}
                              required
                              onChange={handleProductChange}
                              value={productEdit.Stock}
                            />
                          </div>
                        </div>
                        <div className="div-for-flex">
                          <div>
                            <label htmlFor="Category">Select Category</label>
                            <select
                              name="Category"
                              id="Category"
                              onChange={handleProductChange}
                              required
                              value={productEdit.Category}
                            >
                              {category.map((value, index) => (
                                <option key={index} value={value.Category}>
                                  {value.Category}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="SubCategory">
                              Select Sub Category
                            </label>
                            <select
                              name="SubCategory"
                              id="SubCategory"
                              onChange={handleProductChange}
                              required
                              value={productEdit.SubCategory}
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
                            id="Description"
                            onChange={handleProductChange}
                            value={productEdit.Description}
                          ></textarea>
                        </div>
                        {/* <label htmlFor="image">Image</label>
                          <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleProductChange}
                          /> */}
                        <div className="visiblityfield">
                          <label htmlFor="Visible">Visibility</label>
                          <select
                            name="Visible"
                            id="Visible"
                            onChange={handleProductChange}
                            required
                            value={productEdit.Visible}
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>
                        <label htmlFor="LimitLowStock">Low Stock Limit</label>
                        <input
                          type="number"
                          id="LimitLowStock"
                          name="LimitLowStock"
                          required
                          onChange={handleProductChange}
                          value={productEdit.LimitLowStock}
                        />

                        <button className="edit-button">Edit</button>
                        <button
                          className="edit-button"
                          type="button"
                          onClick={hide}
                        >
                          Close
                        </button>
                      </form>
                    </>
                  )}
                ></Dialog>
              ) : null}
              {filteredProduct.map((value, index) => (
                <div key={index} className="product">
                  <div>#{value.DisplayId}</div>
                  <div className="productName">{value.Title}</div>
                  <div>{value.Price}</div>
                  <div>{value.Stock}</div>
                  <div>
                    {value.Category}/{value.SubCategory}
                  </div>
                  <div className="button-section">
                    <button
                      onClick={() =>
                        handleProductDialog(
                          value._id,
                          "",
                          value.Title,
                          value.Price,
                          value.Quantity,
                          value.Stock,
                          value.Category,
                          value.SubCategory,
                          value.Description,
                          value.Visible,
                          value.LimitLowStock
                        )
                      }
                    >
                      <MdEdit size={20} color="yellow" />
                    </button>
                    <button onClick={() => handleProductDelete(value._id)}>
                      <MdDelete className="delete-icon" size={20} color="red" />
                    </button>
                    {value.Stock < value.LimitLowStock && value.Stock !== 0 ? (
                      <IoIosWarning size={20} color="red"></IoIosWarning>
                    ) : null}
                    {value.Stock < 1 || value.Stock === 0 ? (
                      <p style={{ color: "red", fontSize: 12 }}>Out Of Stock</p>
                    ) : null}
                    {value.Visible === "false" ? (
                      <GoEyeClosed size={20} />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
