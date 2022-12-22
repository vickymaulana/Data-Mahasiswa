import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
            <img src="logo192.png" className="card-img-top" alt="..." />
              <h5 className="card-title">DATABASE MAHASISWA</h5>
              <p className="card-text">Free Database Mahasiswa React JS</p>
              <a href="input-data" className="btn btn-primary">Input Data</a>
              <a href="list-mahasiswa" className="btn btn-primary">List Mahasiswa</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
