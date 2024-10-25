import "../css/add.css";

export const LayoutForAdd = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="add-page-body">
      <div className="add-left-container">
        <h3>Select</h3>
        <div className="add-components">
          <a href="/productadd">Add Product</a>
          <a href="/categoryadd">Add Category</a>
          <a href="/subcategoryadd">Add Sub Category</a>
        </div>
      </div>
      <div className="add-right-container">
        <div className="add-info-bar">
          <h2>Title</h2>
        </div>
        <div className="add-main-content">
       
          {children}
        </div>
      </div>
    </div>
  );
};
