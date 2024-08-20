import { Link, Outlet } from "react-router-dom";
import './Admin.css';

function Admin() {
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <Link to="addcategory" className="nav-link">Add Category</Link>
        <Link to="addproducts" className="nav-link">Add Products</Link>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
