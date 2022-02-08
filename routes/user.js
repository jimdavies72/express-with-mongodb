const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// get all users = *
router.get("/allusers", async (req, res) => {
  const allUsers = await User.find({});
  if (allUsers.length <= 0) {
    res.status(404).json({ msg: `No users found` });
  } else {
    res.status(201).json({ msg: "All users", data: allUsers });
  }
});

// Get single user = *
router.get("/:id", async (req, res) => {
  try {
    const singleUser = await User.find({ _id: req.params.id });
    //console.log("SU D: ", typeof singleUser);
    if (singleUser.length <= 0) {
      res.status(404).json({ msg: `User: ${req.params.id} not found` });
    } else {
      res.status(201).json({ msg: "Single user", data: singleUser });
    }
  } catch (error) {
    if (req.params.id.length !== 24) {
      res.status(400).json({
        msg: `Id: ${req.params.id} is malformed and must be 24 characters in length`,
      });
    } else {
      console.log(error);
    }
  }
});

// create a user = *
router.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hashedPW = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    passwordHash: hashedPW,
  });
  await newUser.save();
  res.status(201).json({ msg: "New user added", data: newUser });
});

// update a single user = *
router.put("/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
    const options = { new: false };

    result = await User.updateOne(filter, update, options);

    if (result.matchedCount >= 1) {
      res.status(200).json({ msg: "User updated", data: req.body });
    } else {
      res.status(404).json({ msg: `User: ${req.params.id} not found` });
    }
  } catch (error) {
    if (req.params.id.length !== 24) {
      res.status(400).json({
        msg: `Id: ${req.params.id} is malformed and must be 24 characters in length`,
      });
    } else {
      console.log(error);
    }
  }
});

// delete a single user = *
router.delete("/:id", async (req, res) => {
  try {
    result = await User.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      res.status(404).json({ msg: `User: ${req.params.id} not found` });
    } else {
      res.status(200).json({ msg: `User: ${req.params.id} has been removed` });
    }
  } catch (error) {
    if (req.params.id.length !== 24) {
      res.status(400).json({
        msg: `Id: ${req.params.id} is malformed and must be 24 characters in length`,
      });
    } else {
      console.log(error);
    }
  }
});

// delete all users = *
router.delete("/", async (req, res) => {
  const truncateUsers = await User.deleteMany({});
  res.status(200).json({ msg: "All users have been removed" });
});

module.exports = router;
