const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");
const getAllJobs = async (req, res) => {
  // console.log(req);
  const { userId } = req.user;
  // console.log(userId);
  const job = await Job.find({ createdBy: userId }).sort("createdAt");
  // console.log(job);
  res.status(StatusCodes.OK).json({ msg: "success", status: 1, job });
};
const getJob = async (req, res) => {
  // console.log(req.params);
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job Id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "success", status: 1, job });
};

const createJob = async (req, res) => {
  // const { userId, name } = req.user;
  // const { company, position, status } = req.body;
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "successfully added", status: 1, job });
};

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position, status },
  } = req;
  console.log(company, position, status);

  if (!company || !position) {
    throw new BadRequestError("Company or position cannot be empty");
  }

  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job Id ${jobId}`);
  }
  // console.log(jobId, userId);
  res.status(StatusCodes.OK).send({ msg: "Update Success", status: 1, job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndRemove({ createdBy: userId, _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job Id ${jobId}`);
  }
  res.status(StatusCodes.OK).send({ msg: "Deleted Successfully", status: 1 });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
