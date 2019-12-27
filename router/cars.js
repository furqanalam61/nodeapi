
const express = require('express');

const router = express.Router();
const Car = require('../models/Car');
router.get('/', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students";
    res.send("blankPage of cars.");
});

router.get('/getCars', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students/getStudents" not "localhost:3000/getStudents";
    const allCars = await Car.find();
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allCars);
});

router.post('/newCar', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students/newStudent" not "localhost:3000/newStudent";
    //req.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', '*');
    const car1 = new Car(req.body);
    console.log('car', car1);
    const result = await car1.save();
    if (result) {
        res.send({
            message: "Car inserted successfully."
        });
    }
    res.send("Save a new car will here.");
});

router.get('/carId', async (req, res)=>{
    console.log(req.params.carId);
    const car = await Car.findById(req.params.carId);
    res.json(car);
});


router.patch('/:carId', async (req, res)=>{
    console.log('id body', req.body);
    console.log('id recieve', req.params.carId);
    var car = req.body;
    const updatedCar = await Car.updateOne(
        { _id: req.params.carId},
        { $set: car });
    res.send(updatedCar);
});

router.delete('/:deleteCar', async (req, res) => {
    try {
        console.log('body ' + req.body);
        const result = await Car.remove({ _id: req.params.deleteCar});
        if (result) {
            res.send({
                massage: 'Car deleted Successfully.'
            });
        }
    } catch (ex) {
        console.log('ex', ex);
        res.send({message: 'Error'}).status(401);
    }
});

module.exports = router;
