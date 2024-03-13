import React, { useState } from 'react';
import Swal from 'sweetalert2';

const initialData = [
  {
    id: 1,
    name: 'Mobile',
    subMenu: [
      {
        id: 2,
        name: 'MotoG',
        icon: '',
      },
      {
        id: 3,
        name: 'Apple',
        icon: '',
      },
      {
        id: 4,
        name: 'Samsung',
        icon: '',
      },
    ],
  },
  {
    id: 5,
    name: 'TV',
    subMenu: [
      {
        id: 6,
        name: 'Onida',
        icon: '',
      },
      {
        id: 7,
        name: 'Sansui',
        icon: '',
      },
      {
        id: 8,
        name: 'Sony',
        icon: '',
      },
    ],
  },
  {
    id: 9,
    name: 'Laptop',
    subMenu: [
      {
        id: 10,
        name: 'Dell',
        icon: '',
      },
      {
        id: 11,
        name: 'HP',
        icon: '',
      },
      {
        id: 12,
        name: 'Lenovo',
        icon: '',
      },
    ],
  },
  {
    id: 13,
    name: 'Appliances',
    subMenu: [
      {
        id: 14,
        name: 'Refrigerator',
        icon: '',
      },
      {
        id: 15,
        name: 'Washing Machine',
        icon: '',
      },
      {
        id: 16,
        name: 'Microwave',
        icon: '',
      },
    ],
  },
  {
    id: 17,
    name: 'Sports',
    subMenu: [
      {
        id: 18,
        name: 'Football',
        icon: '',
      },
      {
        id: 19,
        name: 'Basketball',
        icon: '',
      },
      {
        id: 20,
        name: 'Tennis',
        icon: '',
      },
    ],
  },
];

function App() {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [expandedItems, setExpandedItems] = useState([]);

  const handleSave = (updatedItem) => {
    setData((prevData) => {
      let updatedData;
      if (updatedItem.id) {
        updatedData = prevData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      } else {
        updatedData = [...prevData, { ...updatedItem, id: Date.now() }];
      }
      return updatedData;
    });

    handleCloseModal();
  };

  const handleDelete = (itemId) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((item) => item.id !== itemId));
        Swal.fire('Deleted!', 'Item has been deleted.', 'success');
      }
    });
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedItem({
      id: null,
      name: '',
      subMenu: [],
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem({});
  };

  const handleToggleExpand = (itemId) => {
    setExpandedItems((prevExpanded) =>
      prevExpanded.includes(itemId)
        ? prevExpanded.filter((item) => item !== itemId)
        : [...prevExpanded, itemId]
    );
  };

  const handleSubitemNameChange = (value, index) => {
    setSelectedItem((prevItem) => {
      const updatedSubmenu = [...(prevItem.subMenu || [])];
      updatedSubmenu[index] = { ...updatedSubmenu[index], name: value };
      return { ...prevItem, subMenu: updatedSubmenu };
    });
  };

  const handleAddSubitem = () => {
    setSelectedItem((prevItem) => {
      const newSubitem = {
        id: Date.now(),
        name: '',
        icon: '',
      };
      const updatedSubmenu = [...(prevItem.subMenu || []), newSubitem];
      return { ...prevItem, subMenu: updatedSubmenu };
    });
  };

  return (
    <div className='container'>
      <h1>CRUD APPLICATION</h1>
      <div className='row'>
        <div className='col-md-3'>
          <ul className='list-group'>
            {data.map((item) => (
              <li
                key={item.id}
                className={`list-group-item ${
                  expandedItems.includes(item.id) && 'active'
                }`}
                onClick={() => handleToggleExpand(item.id)}
              >
                {item.name}
                {item.subMenu && (
                  <ul
                    className={`list-group ${
                      expandedItems.includes(item.id)
                        ? 'd-block bg-light'
                        : 'd-none'
                    }`}
                  >
                    {item.subMenu.map((subItem) => (
                      <li
                        style={{ color: 'black' }}
                        key={subItem.id}
                        className='list-group-item'
                      >
                        {subItem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className='col-md-9'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className='btn btn-info'
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>{' '}
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='btn btn-success' onClick={handleAdd}>
            Add Item
          </button>
        </div>
      </div>

      <div
        className='modal'
        tabIndex='-1'
        role='dialog'
        style={{ display: showModal ? 'block' : 'none' }}
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                {selectedItem.id ? 'Edit' : 'Add'} Item
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                onClick={handleCloseModal}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-group'>
                  <label>Name:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={selectedItem.name || ''}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, name: e.target.value })
                    }
                  />
                </div>
                {selectedItem.subMenu && (
                  <div>
                    <h6>Subitems:</h6>
                    {selectedItem.subMenu.map((subItem, index) => (
                      <div key={subItem.id} className='form-group'>
                        <label>Subitem {index + 1}:</label>
                        <input
                          type='text'
                          className='form-control'
                          value={subItem.name}
                          onChange={(e) =>
                            handleSubitemNameChange(e.target.value, index)
                          }
                        />
                      </div>
                    ))}
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={handleAddSubitem}
                    >
                      Add Subitem
                    </button>
                  </div>
                )}
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => handleSave(selectedItem)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
