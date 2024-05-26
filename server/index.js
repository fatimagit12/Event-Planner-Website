const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/users');
//const ProductModel = require('./models/products');

const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const ProductRoutes = require('./Router/ProductRoutes');
const app = express();
app.use(cors({
  origin: ['http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use(cookieParser());

connectDB();

app.use('/api', ProductRoutes); 

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "You already have been logged in with this account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword });

    res.json({ status: "OK" });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, role: user.role },
              "jwt-secret-key",
              { expiresIn: '1d' }
            );
            res.cookie('token', token);
            return res.json("Success");
          } else {
            return res.status(400).json({ error: "The Password is incorrect" });
          }
        });
      } else {
        return res.status(400).json({ error: "No record existed" });
      }
    })
    .catch(err => {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "Internal server error" });
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
