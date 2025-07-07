const License = require("../models/license");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createLicense = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title).toLowerCase();
  const { slug } = req.body;
  const license = await License.findOne({ slug });

  if (license) {
    const tempLicense = await License.find({ slug: { $regex: slug } });
    const existSlug = tempLicense?.map((item) => item.slug);
    const existSlugLength = existSlug?.length;
    if (existSlugLength > 0) {
      req.body.slug = `${slug}(${existSlugLength})`;
    } else {
      req.body.slug = `${slug}(1)`;
    }
  } else {
    req.body.slug = slug;
  }

  const newLicense = await License.create(req.body);

  // }
  return res.status(200).json({
    success: newLicense ? true : false,
    data: newLicense ? newLicense : "Something went wrong",
    mes: newLicense ? "License created successfully" : "License created failed",
  });
});
const getLicense = asyncHandler(async (req, res) => {
  const { lid } = req.params;
  const license = await License.findById(lid);
  return res.status(200).json({
    success: license ? true : false,
    data: license ? license : "license not found",
    mes: license ? "license found successfully" : "license not found",
  });
});
const getLicenseBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const license = await License.findOne({ slug });

  if (
    !license ||
    license === null ||
    license === undefined ||
    license === "" ||
    license.length === 0
  ) {
    throw new Error("Song not found");
  } else {
    return res.status(200).json({
      mes: license ? "Get license successfully" : "Get license failed",
      success: license ? true : false,
      data: license,
    });
  }
});
const getAllLicense = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["sort", "page", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatedQueries = JSON.parse(queryString);
  if (queries?.title) {
    delete formatedQueries.title;
    formatedQueries.$text = { $search: `\`"${queries.title}"\`` };
  }

  let queryCommand = License.find(formatedQueries);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  } else {
    queryCommand = queryCommand.sort("-createdAt");
  }
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  } else {
    queryCommand = queryCommand.select("-__v");
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || undefined;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await License.find(formatedQueries).countDocuments();
    if (counts === 0)
      return res.status(200).json({ mes: "No data", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await License.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      skip,
      data: response ? response : "data not found",
      mes: response ? "Data found successfully" : "Data not found",
    });
  });
});
const updateLicense = asyncHandler(async (req, res) => {
  const { lid } = req.params;

  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title).toLowerCase();
  const { slug } = req.body;
  const licenseSlug = await License.findOne({ slug });

  if (licenseSlug) {
    const tempLicense = await License.find({ slug: { $regex: slug } });

    if (tempLicense.length >= 1) {
      const tempSlug = tempLicense.find(
        (el) => el._id.toString() === lid.toString()
      )?.slug;
      if (tempSlug) {
        req.body.slug = tempSlug;
      } else {
        const existSlug = tempLicense?.map((el) => el.slug);
        const existNumberHighest = existSlug
          ?.map((slug) => slug.replace(/[^0-9]/g, ""))
          .sort((a, b) => b - a)[0];
        if (existNumberHighest) {
          const replaceNumber = Number(existNumberHighest) + 1;
          req.body.slug = `${slug}(${replaceNumber}})`;
        } else {
          req.body.slug = `${slug}(1)`;
        }
      }
    }
  } else {
    req.body.slug = slug;
  }

  const license = await License.findByIdAndUpdate(lid, req.body, { new: true });
  if (!license) throw new Error("data not found");
  await license.save();

  return res.status(200).json({
    success: license ? true : false,
    data: license,
    mes: license ? "Data updated successfully" : "Data updated failed",
  });
});
const deleteLicense = asyncHandler(async (req, res) => {
  const { lid } = req.params;
  const license = await License.findByIdAndRemove(lid);
  return res.status(200).json({
    success: license ? true : false,
    mes: license ? "data deleted successfully" : "data deleted failed",
    dataDeleted: license,
  });
});

module.exports = {
  createLicense,
  getLicense,
  getLicenseBySlug,
  getAllLicense,
  updateLicense,
  deleteLicense,
};
