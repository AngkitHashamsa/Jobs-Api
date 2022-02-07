const express = require("express");
const router = express.Router();

const {
  // dashBoard,
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

// router.route("/dashboard").get(dashBoard);

router.route("/getAllJobs").get(getAllJobs);
router.route("/getJob/:id").get(getJob);
router.route("/createJob").post(createJob);
router.route("/updateJob/:id").patch(updateJob);
router.route("/deleteJob/:id").delete(deleteJob);

module.exports = router;
