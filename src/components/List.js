import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleToggleExpand } from '../Reduce/crudSlice';

const List = () => {
  const data = useSelector((state) => state.lists.data);
  const expandedItems = useSelector((state) => state.lists.expandedItems);
  const dispatch = useDispatch();

  return (
    <div className='col-md-3'>
      <ul className='list-group'>
        {data.map((item) => (
          <li
            key={item.id}
            className={`list-group-item ${
              expandedItems.includes(item.id) && 'active'
            }`}
            onClick={() => dispatch(handleToggleExpand(item.id))}
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
  );
};

export default List;
