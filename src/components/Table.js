import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleEdit, handleDelete, handleAdd } from "../Reduce/crudSlice";
import Swal from "sweetalert2";

const Table = () => {
  const data = useSelector((state) => state.lists.data);
  const dispatch = useDispatch();

  const deleteList = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleDelete(id));
        Swal.fire("Deleted!", "Item has been deleted.", "success");
      }
    });
  };

  return (
    <div className="col-md-9">
      <table className="table ">
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
                  className="btn btn-info"
                  onClick={() => dispatch(handleEdit(item))}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => deleteList(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={() => dispatch(handleAdd())}>
        Add Item
      </button>
    </div>
  );
};

export default Table;
