import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Event handler untuk menangani perubahan di form
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  // Event handler untuk menangani klik tombol login
  const handleSubmit = (event) => {
    event.preventDefault();

    // Kirim permintaan ke server menggunakan Axios
    axios.post('http://localhost:3001/login', formData)
      .then((response) => {
        if (response.data.success) {
          // Jika login berhasil, arahkan ke halaman home
          // Masih Under Progress
        } else {
          // Jika login gagal, tampilkan pesan error
          // Under Progress
        }
      })
      .catch((error) => {
        // Jika terjadi error pada permintaan, tampilkan pesan error
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleChange} />
      <input type="password" name="password" value={formData.password} onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
