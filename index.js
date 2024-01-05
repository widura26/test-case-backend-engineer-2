const express = require('express');
const dotenv = require('dotenv');
const categoryRoutes = require('./routes/categoryRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const assetRoutes = require('./routes/assetRoutes.js');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use([
    categoryRoutes,
    productRoutes,
    assetRoutes,
]);

app.listen(process.env.PORT, () => {
    console.log('server listern');
});