const Blog = require("../models/blog");
const blogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createBlog = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title).toLowerCase();
  const { slug } = req.body;
  const blog = await Blog.findOne({ slug });

  if (blog) {
    const tempBlog = await Blog.find({
      slug: { $regex: slug },
    });
    const existSlug = tempBlog?.map((item) => item.slug);
    const existSlugLength = existSlug?.length;
    if (existSlugLength > 0) {
      req.body.slug = `${slug}(${existSlugLength})`;
    } else {
      req.body.slug = `${slug}(1)`;
    }
  } else {
    req.body.slug = slug;
  }

  const newBlog = await Blog.create(req.body);

  // }
  return res.status(200).json({
    success: newBlog ? true : false,
    data: newBlog ? newBlog : "Something went wrong",
    mes: newBlog ? "Data created successfully" : "Data created failed",
  });
});
const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findById(bid)
    .populate("blogCategory")
    .populate("author", "firstname lastname avatar");
  blog.views += 1;
  await blog.save();
  return res.status(200).json({
    success: blog ? true : false,
    data: blog ? blog : "data not found",
    mes: blog ? "data found successfully" : "data not found",
  });
});
const getBlogBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const blog = await Blog.findOne({ slug })
    .populate("blogCategory")
    .populate("author", "firstname lastname avatar");

  if (
    !blog ||
    blog === null ||
    blog === undefined ||
    blog === "" ||
    blog.length === 0
  ) {
    throw new Error("Data not found");
  } else {
    blog.views += 1;
    await blog.save();

    return res.status(200).json({
      mes: blog ? "Get data successfully" : "Get data failed",
      success: blog ? true : false,
      data: blog ? blog : "Data not found",
    });
  }
});
const getAllBlog = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["sort", "page", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatedQueries = JSON.parse(queryString);
  if (queries?.title === "") {
    delete formatedQueries.title;
  }
  if (queries?.title) {
    delete formatedQueries.title;
    formatedQueries.$text = { $search: `\`"${queries.title}"\`` };
  }
  let queryCommand = Blog.find(formatedQueries)
    .populate("blogCategory")
    .populate("author", "firstname lastname avatar");

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
  const limit = parseInt(req.query.limit) || 0;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await Blog.find(formatedQueries).countDocuments();
    if (counts === 0)
      return res.status(200).json({ mes: "No data", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Blog.find(formatedQueries).countDocuments();
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
const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title).toLowerCase();
  }
  const { slug } = req.body;
  const blogSlug = await Blog.findOne({ slug });

  if (blogSlug) {
    const tempBlog = await Blog.find({
      slug: { $regex: slug },
    });

    if (tempBlog.length >= 1) {
      const tempSlug = tempBlog.find(
        (el) => el._id.toString() === bid.toString()
      )?.slug;
      if (tempSlug) {
        req.body.slug = tempSlug;
      } else {
        const existSlug = tempBlog?.map((el) => el.slug);
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

  const blog = await Blog.findByIdAndUpdate(bid, req.body, {
    new: true,
  })
    .populate("blogCategory")
    .populate("author", "firstname lastname avatar");
  if (!blog) throw new Error("data not found");
  await blog.save();

  return res.status(200).json({
    success: blog ? true : false,
    data: blog,
    mes: blog ? "Data updated successfully" : "Data updated failed",
  });
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndRemove(bid)
    .populate("blogCategory")
    .populate("author", "firstname lastname avatar");
  return res.status(200).json({
    success: blog ? true : false,
    mes: blog ? "data deleted successfully" : "data deleted failed",
    dataDeleted: blog,
  });
});

module.exports = {
  createBlog,
  getBlog,
  getBlogBySlug,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
