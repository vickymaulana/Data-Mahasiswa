const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost', // host server MySQL Anda
  user: 'root', // username MySQL Anda
  password: '', // password MySQL Anda
  database: 'mahasiswa' // nama database yang akan digunakan
});

connection.connect(err => {
    if(err) {
      return err;
    }
  });
  
  app.get('/api/mahasiswa', (request, response) => {
    connection.query('SELECT * FROM datamahasiswa', (err, result) => {
      if(err) {
        return response.send(err);
      } else {
        return response.json({
          data: result
        })
      }
    });
  });
  
  app.post('/api/add', (request, response) => {
    const {nama, npm, prodi} = request.body;
    const INSERT_QUERY = `INSERT INTO datamahasiswa (nama, npm, prodi) VALUES ('${nama}', '${npm}', '${prodi}')`;
    connection.query(INSERT_QUERY, (err, result) => {
      if(err) {
        return response.send(err);
      } else {
        return response.send('Berhasil menambah data mahasiswa');
      }
    });
  });

  app.put('/api/mahasiswa/:id', (request, response) => {
    const {id} = request.params;
    const {nama, npm, prodi} = request.body;
    const UPDATE_QUERY = `UPDATE datamahasiswa SET nama = '${nama}', npm = '${npm}', prodi = '${prodi}' WHERE id = ${id}`;
    connection.query(UPDATE_QUERY, (err, result) => {
      if(err) {
        return response.send(err);
      } else {
        return response.send('Berhasil mengupdate data mahasiswa');
      }
    });
  });

  app.delete('/api/mahasiswa/:id', (request, response) => {
    const { id } = request.params;
    const DELETE_QUERY = `DELETE FROM datamahasiswa WHERE id = ${id}`;
    connection.query(DELETE_QUERY, (err, result) => {
      if (err) {
        return response.send(err);
      } else {
        return response.send('Berhasil menghapus data mahasiswa');
      }
    });
  });
  
  app.post('/login', (req, res) => {
  // Ambil data username dan password dari permintaan
  const username = req.body.username;
  const password = req.body.password;

  // Query database untuk mencari data login
  const query = `SELECT * FROM vm_login WHERE username = '${username}' AND password = '${password}'`;
  connection.query(query, (error, results) => {
    if (error) {
      // Jika terjadi error, kirim response error
      res.status(500).json({ error: error.message });
    } else if (results.length > 0) {
      // Jika data ditemukan, kirim response success
      res.json({ success: true });
    } else {
      // Jika data tidak ditemukan, kirim response error
      res.status(401).json({ error: 'Username atau password salah' });
    }
  });
});
  
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });