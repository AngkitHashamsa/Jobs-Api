const getAllJobs = async (req, res) => {
  res.status(200).send("getAllJobs");
};
const getJob = async (req, res) => {
  res.status(200).send("getJob");
};
const createJob = async (req, res) => {
  res.status(200).send("createJob");
};
const updateJob = async (req, res) => {
  res.status(200).send("updateJob");
};
const deleteJob = async (req, res) => {
  res.status(200).send("deleteJob");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
