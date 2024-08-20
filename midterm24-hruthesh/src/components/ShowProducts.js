import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import moment from 'moment-timezone';
import 'moment/locale/en-gb';
import './ShowProducts.css'; 

function ShowProducts() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    displayProducts();
  }, []);

  useEffect(() => {
    if (id) {
      viewProductDetails(id);
    }
  }, [id]);

  useEffect(() => {
    filterData(); 
  }, [statusFilter, data]);

  const displayProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/products');
      setData(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error fetching products.');
    }
  };

  const viewProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/products/${productId}`);
      setSelectedProduct(response.data.product);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const filterData = () => {
    const filterText = document.getElementById('search-input').value.toLowerCase();
    const filteredItems = data.filter(item =>
      (item.name.toLowerCase().includes(filterText) ||
       item.description.toLowerCase().includes(filterText)) &&
      (statusFilter === 'All' ||
       (statusFilter === 'True' && item.status) ||
       (statusFilter === 'False' && !item.status))
    );
    setFilteredData(filteredItems);
  };

  const handleFilterChange = () => {
    filterData();
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null); 
    navigate('/Home');
  };

  const columns = [
    {
      name: 'Code',
      selector: row => row.code,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Status',
      selector: row => row.status ? 'True' : 'False',
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: row => row.stock,
    },
    {
      name: 'Actions',
      cell: row => (
        <button onClick={() => {
          navigate(`/Home/${row._id}`); // Update URL
          viewProductDetails(row._id); // Fetch product details
        }}>View Details</button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];
  

  return (
    <div className='outer'>
      {selectedProduct ? (
        <div className="product-details">
          <button onClick={handleCloseDetails} className="close-button">Close</button>
          <h1>Product Details</h1>
          <p><b>Code:</b> {selectedProduct.code}</p>
          <p><b>Name:</b> {selectedProduct.name}</p>
          <p><b>Excerpt:</b> {selectedProduct.excerpt}</p>
          <p><b>Description:</b> {selectedProduct.description}</p>
          <p><b>Status:</b> {selectedProduct.status ? 'True' : 'False'}</p>
          <p><b>Price:</b> {selectedProduct.price}</p>
          <p><b>Stock:</b> {selectedProduct.stock}</p>
          <p><b>Created at:</b> {moment(selectedProduct.created_at).tz('Asia/Kolkata').format('Do MMMM YYYY')}</p>
        </div>
      ) : (
        <>
          <div className='filters'>
            <div className='filter-controls'>
              <div className='search-bar'>
                <input 
                  id="search-input"
                  type="text" 
                  placeholder="Search products" 
                  onChange={handleFilterChange} 
                />
              </div>
              <div className='status-filter'>
                <label>Status:</label>
                <select onChange={handleStatusChange} value={statusFilter}>
                  <option value="All">All</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              </div>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
          />
        </>
      )}
    </div>
  );
}

export default ShowProducts;
