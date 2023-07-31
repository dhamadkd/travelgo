const multer = require('multer');
const sharp = require('sharp');
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const slugify = require('slugify');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });


// CREATE TOUR CONTROLLER
exports.contact = catchAsync(async (req, res, next) => {

  // const filteredBody = filterObj(req.body, 'name', 'price', 'difficulty', 'maxGroupSize', 'summary', 'duration', 'description', 'startLocation','startDates');

  // if (req.files) filteredBody.imageCover = req.files.imageCover.filename;
  // if (req.files) filteredBody.image1 = req.files.image1.filename;
  // if (req.files) filteredBody.image2 = req.files.image2.filename;
  // if (req.files) filteredBody.image3 = req.files.image3.filename;
 
  // // 3) Update user doc
  // const doc = await Tour.create(filteredBody);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'dhama.dkd@gmail.com',
      pass: process.env.GMAIL_SECRET
    }
  });
  console.log('body object: ' +  JSON.stringify(req.body));
  const formString = "Name: " + req.body.name +  ", Phone: " + req.body.phone + " Email: " + req.body.email;
console.log('formString: ' + formString);


    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Deepak Kumar<dhama.dkd@gmail.com>', // sender address
      to: "contact@hookatrip.com", // list of receivers
      subject: "Travel Query", // Subject line
      text: formString, // plain text body
      html: "<b>" +  formString +  "</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);

  res.status(201).json({
    status: 'success',
    data: { data: info }
  });
})

// UPDATE TOUR CONTROLLER
exports.updateTour = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'name', 'price', 'difficulty', 'maxGroupSize', 'summary', 'duration', 'description', 'startLocation');

  if (req.files) filteredBody.imageCover = req.files.imageCover.filename;
  if (req.files) filteredBody.image1 = req.files.image1.filename;
  if (req.files) filteredBody.image2 = req.files.image2.filename;
  if (req.files) filteredBody.image3 = req.files.image3.filename;

  const doc = await Tour.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true
  });

  if (!doc) {
    return next(new AppError('No doc found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { doc }
  });
});

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}

exports.getAllTours = factory.getAll(Tour);
// exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.getTour = factory.getOne(Tour);

exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: stats
  });
})

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0 //id will no longer show up
      }
    },
    {
      $sort: { numTourStarts: -1 } //descending
    },
    {
      $limit: 12
    }
  ])

  res.status(200).json({
    status: 'success',
    data: plan
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  })
  return newObj;
}