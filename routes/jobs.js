const express = require("express");
const router = express.Router();

// const dashBoard = async((req, res) => {
//   res.status(200).send("Success yeaah");
// });

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
router.route("/updateJob").patch(updateJob);
router.route("/deleteJob").delete(deleteJob);

module.exports = router;
