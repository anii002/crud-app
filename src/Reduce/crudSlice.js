import { createSlice } from '@reduxjs/toolkit';
import initialData from '../data';

export const crudSlice = createSlice({
  name: 'lists',
  initialState: {
    data: initialData,
    expandedItems: [],
    showModal: false,
    selectedItem: {},
  },
  reducers: {
    addList: (state, action) => {
      state.data = [...state.data, { ...action.payload, id: Date.now() }];
    },
    updateList: (state, action) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteList: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    handleToggleExpand: (state, action) => {
      const itemId = action.payload;
      state.expandedItems = state.expandedItems.includes(itemId)
        ? state.expandedItems.filter((item) => item !== itemId)
        : [...state.expandedItems, itemId];
    },
    handleEdit: (state, action) => {
      state.selectedItem = action.payload;
      state.showModal = true;
    },
    handleAdd: (state) => {
      state.selectedItem = {
        id: null,
        name: '',
        subMenu: [],
      };
      state.showModal = true;
    },
    handleCloseModal: (state) => {
      state.showModal = false;
      state.selectedItem = {};
    },
    handleSave: (state, action) => {
      const updatedItem = action.payload;
      if (updatedItem.id) {
        state.data = state.data.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      } else {
        state.data = [...state.data, { ...updatedItem, id: Date.now() }];
      }
      state.showModal = false;
      state.selectedItem = {};
    },
    handleDelete: (state, action) => {
      const itemId = action.payload;
      state.data = state.data.filter((item) => item.id !== itemId);
      state.showModal = false;
      state.selectedItem = {};
    },
    handleSubitemNameChange: (state, action) => {
      const { value, index } = action.payload;
      state.selectedItem.subMenu = state.selectedItem.subMenu.map(
        (subItem, i) => (i === index ? { ...subItem, name: value } : subItem)
      );
    },
    handleAddSubitem: (state) => {
      const newSubitem = {
        id: Date.now(),
        name: '',
        icon: '',
      };
      state.selectedItem.subMenu = [
        ...(state.selectedItem.subMenu || []),
        newSubitem,
      ];
    },
  },
});

export const {
  handleToggleExpand,
  handleEdit,
  handleAdd,
  handleCloseModal,
  handleSave,
  handleDelete,
  handleSubitemNameChange,
  handleAddSubitem,
  addList,
  updateList,
  deleteList,
} = crudSlice.actions;

export default crudSlice.reducer;
