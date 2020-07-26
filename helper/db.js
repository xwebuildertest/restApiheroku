const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://mooves:123asd123@cluster0.mm3oe.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    const db = mongoose.connection;
    db.on("open", () => {
        console.log("MongoDb Onlayn Ulandik");
    })
    db.on('error', (err) => {
        console.log("Mongoda qayerdadir Hatolik bor", err);
    })
}