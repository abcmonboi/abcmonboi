const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createBlogCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title).toLowerCase();
  const { slug } = req.body;
  const blogCategory = await BlogCategory.findOne({ slug });

  if (blogCategory) {
    const tempBlogCategory = await BlogCategory.find({
      slug: { $regex: slug },
    });
    const existSlug = tempBlogCategory?.map((item) => item.slug);
    const existSlugLength = existSlug?.length;
    if (existSlugLength > 0) {
      req.body.slug = `${slug}(${existSlugLength})`;
    } else {
      req.body.slug = `${slug}(1)`;
    }
  } else {
    req.body.slug = slug;
  }

  const newBlogCategory = await BlogCategory.create(req.body);

  // }
  return res.status(200).json({
    success: newBlogCategory ? true : false,
    data: newBlogCategory ? newBlogCategory : "Something went wrong",
    mes: newBlogCategory ? "Data created successfully" : "Data created failed",
  });
});
const getBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const blogCategory = await BlogCategory.findById(bcid);
  return res.status(200).json({
    success: blogCategory ? true : false,
    data: blogCategory ? blogCategory : "data not found",
    mes: blogCategory ? "data found successfully" : "data not found",
  });
});
const getBlogCategoryBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const blogCategory = await BlogCategory.findOne({ slug });

  if (
    !blogCategory ||
    blogCategory === null ||
    blogCategory === undefined ||
    blogCategory === "" ||
    blogCategory.length === 0
  ) {
    throw new Error("Data not found");
  } else {
    blogCategory.views += 1;
    await blogCategory.save();
    
    return res.status(200).json({
      mes: blogCategory ? "Get data successfully" : "Get data failed",
      success: blogCategory ? true : false,
      data: blogCategory ? blogCategory : "Data not found",
    });
  }
});
const getAllBlogCategory = asyncHandler(async (req, res) => {
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

  let queryCommand = BlogCategory.find(formatedQueries);

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
    const counts = await BlogCategory.find(formatedQueries).countDocuments();
    if (counts === 0)
      return res.status(200).json({ mes: "No data", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await BlogCategory.find(formatedQueries).countDocuments();
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
const updateBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title).toLowerCase();
    }
  const { slug } = req.body;
  const blogCategorySlug = await BlogCategory.findOne({ slug });

  if (blogCategorySlug) {
    const tempBlogCategory = await BlogCategory.find({
      slug: { $regex: slug },
    });

    if (tempBlogCategory.length >= 1) {
      const tempSlug = tempBlogCategory.find(
        (el) => el._id.toString() === bcid.toString()
      )?.slug;
      if (tempSlug) {
        req.body.slug = tempSlug;
      } else {
        const existSlug = tempBlogCategory?.map((el) => el.slug);
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

  const blogCategory = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  if (!blogCategory) throw new Error("data not found");
  await blogCategory.save();

  return res.status(200).json({
    success: blogCategory ? true : false,
    data: blogCategory,
    mes: blogCategory ? "Data updated successfully" : "Data updated failed",
  });
});
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const blogCategory = await BlogCategory.findByIdAndRemove(bcid);
  return res.status(200).json({
    success: blogCategory ? true : false,
    mes: blogCategory ? "data deleted successfully" : "data deleted failed",
    dataDeleted: blogCategory,
  });
});

module.exports = {
  createBlogCategory,
  getBlogCategory,
  getBlogCategoryBySlug,
  getAllBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
