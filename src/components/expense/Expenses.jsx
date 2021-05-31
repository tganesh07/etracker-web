import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { ToastContainer } from 'react-toastify';
import { paginate } from '../../utils/Paginate';
import ListGroup from '../common/ListGroup';
import Pagination from '../common/Pagination';
import ExpenseTable from './ExpenseTable';
import http from '../../services/HttpService';
import config from '../../config.json';
import 'react-toastify/dist/ReactToastify.css';

const Expenses = ({ history }) => {
  const fileInput = useRef();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortColumn, setSortColumn] = useState({
    column: 'purchaseDate',
    order: 'desc'
  });
  const [pageSize] = useState(10);
  const [selectedFile, setSelectedFile] = useState('');

  // TODO: Move API calls to redux sagas
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    http.get('http://localhost:5000/expenses').then(response => {
      var categoryList = new Set();
      const apiResponse = response.data;

      categoryList.add('All Category');
      apiResponse.map(data =>
        categoryList.add(
          data['subCategory'] !== '' ? data['subCategory'] : 'Others'
        )
      );

      setData(apiResponse);
      setCategories([...categoryList]);
    });
  };

  const handlePageChange = pageNo => {
    setCurrentPage(pageNo);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    http
      .post('http://localhost:5000/upload/expenses', formData, {
        onUploadProgress: progressEvent => {
          console.log(
            'Upload Progress ' +
              Math.round(progressEvent.loaded / progressEvent.total) * 100 +
              '%'
          );
        }
      })
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  const handleFileSelect = event => {
    if (event.target.files && event.target.files.length > 0)
      setSelectedFile(event.target.files[0]);
  };

  const handleDelete = async expense => {
    try {
      const response = await http.delete(
        `${config.apiEndpoint}/${expense._id}`
      );
      console.log(response);
      fetchData();
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert('This expense has already been deleted');
    }
  };

  const filteredData =
    selectedCategory && selectedCategory !== 'All Category'
      ? data.filter(d => d['subCategory'] === selectedCategory)
      : data;

  const sortedData = _.orderBy(
    filteredData,
    [sortColumn.column],
    [sortColumn.order]
  );

  const expense = paginate(sortedData, currentPage, pageSize);

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setCurrentPage(1); // reset page number = 1 when a new category is selected.
  };

  const handleSort = column => {
    setSortColumn(column);
  };

  const handleAddExpense = () => {
    history.push('/addExpense');
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className='row'>
        <div className='col-2'>
          <ListGroup
            items={categories}
            onItemSelect={handleCategorySelect}
            selectedItem={selectedCategory}
          />
        </div>
        <div className='col'>
          <button className='btn btn-warning' onClick={handleAddExpense}>
            Add Expense
          </button>
          <input
            type='file'
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            ref={fileInput}
            accept='.jpg,.png,.jpeg,.heic,.HEIC'
          />
          <button
            style={{ margin: '10px' }}
            className='btn btn-outline-info'
            onClick={() => fileInput.current.click()}
          >
            Upload Expense
          </button>
          {selectedFile && (
            <button
              style={{ margin: '10px' }}
              className='btn btn-primary'
              onClick={handleUpload}
            >
              Upload
            </button>
          )}
          <ExpenseTable
            data={expense}
            onSort={handleSort}
            sortColumn={sortColumn}
            onDelete={handleDelete}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Pagination
              itemsCount={filteredData.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <p style={{ margin: '10px' }}>
              Showing {filteredData.length} expenses
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Expenses;
