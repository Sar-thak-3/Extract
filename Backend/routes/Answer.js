const express = require("express");
const router = express.Router();
const Folders = require("../models/Folders");

router.post("/searchquery", async (req, res) => {
  const query = req.body.searchquery;
  // const response = await Folders.find({"images": {"extracted": }})

  // const response = await Folders.aggregate([{$unwind: "$images"},{$match: {"images.extracted":"Where are aravalis located?"}}])
  const response = await Folders.aggregate([{$unwind: "$images"},{$addFields: {results: {$regexMatch: {input: "$images.extracted" , regex: /loca/}}}},{$match: {results: true}},{$sort: {"images.date": -1}},{$skip: 0},{$limit: 5}])

  console.log(response);
  res.status(200).send("Good");
});

module.exports = router;