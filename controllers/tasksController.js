const Task = require("./../models/task");
const asyncWrapper = require("./../middleware/async");
const {
  createCustomError,
  CustomAPIError,
} = require("./../errors/custom-error.js");

exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res
    .status(200)
    .json({ status: "success", tasksLength: tasks.length, data: { tasks } });
});

exports.getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    // const error = new Error("Not Found");
    // error.status = 404;
    // return next(error);
    // return res
    //   .status(404)
    // .json({ msg: `No task with the id ${req.params.id}` });
    return next(createCustomError(`No task with the id : ${req.params.id}`));
  }

  res.status(200).json({ task });
});

exports.createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

exports.updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with the id : ${req.params.id}`));
  }

  res.status(200).json({ task });
});

exports.deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ status: "success", msg: null });
});
