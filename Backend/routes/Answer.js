const express = require("express");
const router = express.Router();
const Folders = require("../models/Folders");

router.post("/searchquery", async (req, res) => {
  let query = req.body.searchquery;
  const regex = new RegExp(`${query}`,"i");
  if(!regex){
    res.status(201).json({success: true,response: []})
  }
  // console.log(regex)
  // const response = await Folders.find({"images": {"extracted": }})
  // const response = await Folders.aggregate([{$unwind: "$images"},{$match: {"images.extracted":"Where are aravalis located?"}}])
  const response = await Folders.aggregate([{$unwind: "$images"},{$addFields: {results: {$regexMatch: {input: "$images.extracted" , regex: regex}}}},{$match: {results: true}},{$sort: {"images.date": -1}},{$skip: 0},{$limit: 5}])
  let resp = []
  response.forEach((r)=>{
    let obj = {
      id: r.images._id,
      text: r.images.extracted
    }
    resp.push(obj);
  })

  console.log(resp);
  res.status(200).json({success: true,response: resp});
});

router.post("/allsearchquery", async (req, res) => {
  let query = req.body.searchquery;
  const regex = new RegExp(`${query}`,"i");
  console.log(regex);
  if(!regex){
    res.status(201).json({success: true,response: []})
  }
  const response = await Folders.aggregate([{$unwind: "$images"},{$addFields: {results: {$regexMatch: {input: "$images.extracted" , regex: regex}}}},{$match: {results: true}},{$sort: {"images.date": -1}},{$skip: 0},{$limit: 5}])
  
  console.log(response);
  res.status(200).json({success: true,answers: response});
});

module.exports = router;