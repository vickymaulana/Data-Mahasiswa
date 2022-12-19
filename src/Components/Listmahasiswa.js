import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const ListMahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [editingMahasiswa, setEditingMahasiswa] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/mahasiswa')
      .then(res => {
        setMahasiswa(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleEdit = (mahasiswa) => {
    setEditingMahasiswa(mahasiswa);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedMahasiswa = {
      id: editingMahasiswa.id,
      nama: formData.get('nama'),
      npm: formData.get('npm'),
      prodi: formData.get('prodi'),
    };
    axios.put(`http://localhost:3001/api/mahasiswa/${editingMahasiswa.id}`, updatedMahasiswa)
      .then(res => {
        console.log(res.data);
        if (window.confirm('Data sudah benar di edit?')) {
          setEditingMahasiswa(null);
          setShowModal(false);
          // refresh data
          axios.get('http://localhost:3001/api/mahasiswa')
            .then(res => {
              setMahasiswa(res.data.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus data?')) {
      axios.delete(`http://localhost:3001/api/mahasiswa/${id}`)
        .then(res => {
          console.log(res.data);
          // refresh data
          axios.get('http://localhost:3001/api/mahasiswa')
            .then(res => {
              setMahasiswa(res.data.data);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // gak dicari kalo gak ketemu : false
    let isNotFound = true;
    for (let i = 0; i < mahasiswa.length; i++) {
      if (mahasiswa[i].nama.toLowerCase().includes(searchTerm.toLowerCase())) {
        isNotFound = false;
        break;
      }
    }
    // Cari Kalo Ketemu : true
    if (!isNotFound) {
      const sortedMahasiswa = mahasiswa.sort((a, b) => {
        if (a.nama.toLowerCase().includes(searchTerm.toLowerCase())) {
          return -1;
        } else {
          return 1;
        }
      });
      setMahasiswa(sortedMahasiswa);
    }
  }
  
  
  const filteredMahasiswa = mahasiswa.filter(mhs => mhs.nama.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCheckboxClick = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(studentId => studentId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  }

  const handleDeleteSelected = () => {
    if (selectedStudents.length > 0) {
      if (window.confirm('Yakin ingin menghapus data terpilih?')) {
        selectedStudents.forEach(id => {
          axios.delete(`http://localhost:3001/api/mahasiswa/${id}`)
            .then(res => {
              console.log(res.data);
              // refresh data
              axios.get('http://localhost:3001/api/mahasiswa')
                .then(res => {
                  setMahasiswa(res.data.data);
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    } else {
      alert('Tidak ada data yang dipilih');
    }
  }
  

  return (
    <>
    <h3>Daftar Mahasiswa</h3>
    <div className="form-group">
    <input type="text" className="form-control" placeholder="Cari nama mahasiswa" onChange={handleSearch} />
    </div>
    <table className="table table-striped">
    <thead>
    <tr>
    <th>Pilih</th>
    <th>No</th>
    <th>Nama</th>
    <th>NPM</th>
    <th>Prodi</th>
    <th>Aksi</th>
    </tr>
    </thead>
    <tbody>
    {filteredMahasiswa.map((mhs, index) => (
    <tr key={mhs.id}>
    <td>
    <td>
    <input type="checkbox" onClick={() => handleCheckboxClick(mhs.id)} />
        </td>
    </td>
    <td>{index + 1}</td>
    <td>{mhs.nama}</td>
    <td>{mhs.npm}</td>
    <td>{mhs.prodi}</td>
    <td>
    <button className="btn btn-primary mr-2" onClick={() => handleEdit(mhs)}>Edit</button>
    <button className="btn btn-danger" onClick={() => handleDelete(mhs.id)}>Hapus</button>
    </td>
    </tr>
    ))}
    </tbody>
    </table>
    <button className="btn btn-danger" onClick={handleDeleteSelected}>Hapus yang dicentang</button>
    <Modal show={showModal} onHide={handleCloseModal}>
<Modal.Header closeButton>
<Modal.Title>Edit Mahasiswa</Modal.Title>
</Modal.Header>
<Modal.Body>
<form onSubmit={handleSubmit}>
<div className="form-group">
<label htmlFor="nama">Nama</label>
<input type="text" className="form-control" id="nama" name="nama" defaultValue={editingMahasiswa && editingMahasiswa.nama} />
</div>
<div className="form-group">
<label htmlFor="npm">NPM</label>
<input type="text" className="form-control" id="npm" name="npm" defaultValue={editingMahasiswa && editingMahasiswa.npm} />
</div>
<div className="form-group">
<label htmlFor="prodi">Prodi</label>
<input type="text" className="form-control" id="prodi" name="prodi" defaultValue={editingMahasiswa && editingMahasiswa.prodi} />
</div>
<button type="submit" className="btn btn-primary">Simpan</button>
</form>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleCloseModal}>
Cancel
</Button>
</Modal.Footer>
</Modal>
</>
);
}

export default ListMahasiswa;