import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleSave,
  handleCloseModal,
} from "../Reduce/crudSlice";

const Modal = () => {
  const showModal = useSelector((state) => state.lists.showModal);
  const selectedItem = useSelector((state) => state.lists.selectedItem);
  const dispatch = useDispatch();
  const [localItem, setLocalItem] = useState(selectedItem);

  useEffect(() => {
    setLocalItem(selectedItem);
  }, [selectedItem]);

  const handleNameChange = (e) => {
    setLocalItem({ ...localItem, name: e.target.value });
  };

  const handleSubitemNameChangeLocal = (e, index) => {
    const updatedSubMenu = [...localItem.subMenu];
    updatedSubMenu[index] = { ...updatedSubMenu[index], name: e.target.value };
    setLocalItem({ ...localItem, subMenu: updatedSubMenu });
  };
  const handleAddSubitemLocal = () => {
    const newSubitem = {
      id: Date.now(),
      name: "",
      icon: "",
    };
    setLocalItem((prevLocalItem) => ({
      ...prevLocalItem,
      subMenu: [...prevLocalItem.subMenu, newSubitem],
    }));
  };

  const handleSaveLocal = () => {
    dispatch(handleSave(localItem));
    setLocalItem(selectedItem);
    handleCloseModal();
  };

  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? "block" : "none", overflow: "auto" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedItem.id ? "Edit" : "Add"} Item
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={() => {
                dispatch(handleCloseModal());
                setLocalItem(selectedItem);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={localItem.name || ""}
                  onChange={handleNameChange}
                />
              </div>
              {localItem.subMenu && (
                <div>
                  <h6>Subitems:</h6>
                  {localItem.subMenu.map((subItem, index) => (
                    <div key={subItem.id} className="form-group">
                      <label>Subitem {index + 1}:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={subItem.name}
                        onChange={(e) => handleSubitemNameChangeLocal(e, index)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddSubitemLocal}
                  >
                    Add Subitem
                  </button>
                </div>
              )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                dispatch(handleCloseModal());
                setLocalItem(selectedItem);
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveLocal}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
