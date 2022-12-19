import React, { Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

class Inputmahasiswa extends Component {
  state = {
    nama: '',
    npm: '',
    prodi: '',
    showModal: false,
    error: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.npm) {
      this.setState({ error: true });
      toast.error('NPM harus diisi');
    } else {
      this.setState({ error: false });
      this.handleShowModal();
    }
  };

  handleSubmitData = () => {
    if (!this.state.error) {
      const data = {
        nama: this.state.nama,
        npm: this.state.npm,
        prodi: this.state.prodi
      };

      axios.post('http://localhost:3001/api/add', data).then(response => {
        console.log(response.data);
        this.setState({
          nama: '',
          npm: '',
          prodi: ''
        });
        toast('Data berhasil di input');
        this.handleCloseModal();
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="bg-light p-5">
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi</Modal.Title>
          </Modal.Header>
          <Modal.Body>Apakah data sudah benar?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Batal
            </Button>
            <Button variant="primary" onClick={this.handleSubmitData}>
              Ya
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="form-group col-md-5">
          <label>Nama:</label>
          <input type="text" className="form-control" name="nama" value={this.state.nama} onChange={this.handleChange} />
        </div>
        <div className="form-group col-md-5">
          <label>NPM:</label>
          <input type="text" className="form-control" name="npm" value={this.state.npm} onChange={this.handleChange} />
        </div>
        <div className="form-group col-md-5">
          <label>Prodi:</label>
          <input type="text" className="form-control" name="prodi" value={this.state.prodi} onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <ToastContainer />
      </form>
    );
  }
}  

<ToastContainer
  position="bottom-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>

export default Inputmahasiswa;
