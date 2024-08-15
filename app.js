const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static(path.join(__dirname, '/upload')));

// Routers
const userrouter = require('./router/UserRouter');
const productrouter = require('./router/ProductRouter');
const adminrouter = require('./router/AdminRouter');
const addrouter = require('./router/AddRouter');
const { orderrouter } = require('./router/OrderRouter');
const wishlistrouter = require('./router/WishListRouter');
const Categorierouter = require('./router/CategoriesRouter');
const reviwerouter = require('./router/ReviewRouter');
const payrouter = require('./router/PaymentRouter');
const Addressrouter = require('./router/AddressRouter');

// Config and Initialization
const connectDB = require('./config/db');
const DefaultAdmin = require('./config/DefaultAdmin');

// Connect to database and initialize admin user
connectDB().then(() => {
  DefaultAdmin();
});  

// Use routes
app.use('/user', userrouter);
app.use('/product', productrouter);
app.use('/admin', adminrouter);
app.use('/cart', addrouter);
app.use('/order', orderrouter);
app.use('/wish', wishlistrouter);
app.use('/Categories', Categorierouter);
app.use('/reviwe', reviwerouter);
app.use('/pay', payrouter);
app.use('/addres', Addressrouter);

// Start server
app.listen(2000, () => {
  console.log('Server is running on port 2000');
});
