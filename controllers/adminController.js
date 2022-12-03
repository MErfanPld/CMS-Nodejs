const Blog = require("../models/Blog");
const { formatDate } = require("../utils/jalali");
const { get500 } = require("./errorController");

exports.getDashboard = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });

    res.render("admin/blogs", {
      pageTitle: "بخش مدیریت | داشبورد",
      path: "/dashboard",
      layout: "./layouts/adminLayout",
      fullname: req.user.fullname,
      blogs,
      formatDate,
    });
  } catch (err) {
    console.log(err);
    get500(req, res);
  }
};

exports.getAddPost = async (req, res) => {
  res.render("admin/addPost", {
    pageTitle: "بخش مدیریت | ساخت پست جدید",
    path: "/dashboard/add-post",
    layout: "./layouts/adminLayout",
    fullname: req.user.fullname,
  });
};

exports.createPost = async (req, res) => {
  const errorArr = [];

  try {
    await Blog.postValidation(req.body);
    await Blog.create({ ...req.body, user: req.user.id });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    err.inner.forEach((e) => {
      errorArr.push({
        name: e.path,
        message: e.message,
      });
    });
    res.render("admin/addPost", {
      pageTitle: "بخش مدیریت | ساخت پست جدید",
      path: "/dashboard/add-post",
      layout: "./layouts/adminLayout",
      fullname: req.user.fullname,
      errors: errorArr,
    });
  }
};
