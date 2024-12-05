import "../css/Header.css";


export default function Header() {
  return (
    <div>
      <div className="nav-bar">
        <div className="title">Inventory Management System</div>
        <div className="links">
          <a href="/home">Home</a>
          <a href="/inventory">Inventory</a>
          <a href="/add">Add</a>
          <a href="/orders">Orders</a>
       
        </div>
      </div>
    </div>
  );
}
