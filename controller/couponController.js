const couponmangement = require("../models/couponmangement");

const create_coupon = async (req, res, next) => {
  try {
    let coupon = new couponmangement({
      offer_name: req.body.offer_name,
      coupon_name: req.body.coupon_name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      discount_Percentage: req.body.discount_Percentage,
      discount_amount: req.body.discount_amount,
      isactive: req.body.isactive,
    });
    await coupon.save();
    res.json({
      message: "coupon created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error",
    });
  }
};

const update_coupon = async (req, res, next) => {
  try {
    let couponid = req.body.couponid;
    let update_coupon = {
      offer_name: req.body.offer_name,
      coupon_name: req.body.coupon_name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      discount_Percentage: req.body.discount_Percentage,
      discount_amount: req.body.discount_amount,
      isactive: req.body.isactive,
    };
    await couponmangement.findByIdAndUpdate(couponid, { $set: update_coupon });

    res.json({
      message: "coupon updated",
    });
  } catch (error) {
    res.json({
      message: "error",
    });
  }
};
const get_id = async (req, res, next) => {
  try {
    var byid = {
      _id: req.params.id,
    };
    let get = await couponmangement.findById(byid);
    res.json({ get });
  } catch (error) {
    res.json({
      message: "error",
    });
  }
};
const delete_id = async (req, res, next) => {
  try {
    let couponid = req.body.couponid;
    couponmangement.findByIdAndDelete(couponid);
    res.json({
      message: "coupon deleted successfully",
    });
  } catch (error) {
    res.json({
      message: "error",
    });
  }
};

const searchcoupon = async (req, res, next) => {
  const { search, isactive } = req.query;
  let paramSearch = {};
  if (search) {
    paramSearch.$or = [
      {
        offer_name: {
          $regex: search,
          $options: "i"
        },
      },
      {
        coupon_name: {
          $regex: search,
          $options: "i"
        },
      },
    ];
  }
  if (isactive) paramSearch.isactive = isactive;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;

  const results = {};
  if (start > 0) {
    results.previous = {
      page: page - 1,
    };
  }

  results.coupons = await couponmangement
    .find(paramSearch)
    .sort({ offerName: 1 })
    .skip(start)
    .limit(limit);


  if (end < (await couponmangement.countDocuments())) {
    results.next = {
      page: page + 1,
    };
  }
  if (!results.coupons) {
    return res.json({ error: "No results found" });
  }
  return res.json(results);
};
module.exports = {
  create_coupon,
  update_coupon,
  get_id,
  delete_id,
  searchcoupon,
};
