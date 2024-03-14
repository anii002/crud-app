import React from 'react';
import List from './components/List';
import Table from './components/Table';
import Modal from './components/Modal';

function App() {
  return (
    <div className='container'>
      <h1>CRUD APPLICATION</h1>
      <div className='row'>
        <List />
        <Table />
      </div>
      <Modal />
    </div>
  );
}

export default App;
