const express = require('express'), 
app = express(),
mongoose = require('mongoose'), 
userRoutes = require('./routes/userRoutes.js');
productRoutes = require('./routes/productRoutes.js')

// to print incoming requests from mongoose in the terminal
mongoose.set('debug',true)
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const cors = require('cors')
app.use(cors())

require('dotenv').config({ path: './.env' });

// connecting to mongo and checking if DB is running
async function connecting(){
try {
    await mongoose.connect('mongodb://127.0.0.1/ECommerceDelivery')
    console.log('Connected to the DB')
} catch ( error ) {
    console.log('ERROR: Seems like your DB is not running, please start it up !!!');
}
}
connecting()
// end of connecting to mongo and checking if DB is running

app.use('/payment', require('./routes/payment.route.js'));
app.use('/Login', userRoutes);
app.use('/Products', productRoutes);
const path = require('path');
// we need to import 'path' module from node.js

app.use('/assets', express.static(path.join(__dirname, 'static')))


app.listen(3030, () => console.log(`listening on port 3030`))