var express = require("express");
var router = express.Router();
const { createUserValidation } = require("../../Middleware/input-validation");
const {
  registerValidation,
  loginValidation,
  updateUserValidation,
} = require("../../Middleware/input-validation");
const { authenticateJWT } = require("../../Middleware/authentication");

const { upload } = require("../../Middleware/file");

router.get("/", (req, res) => {
  return res.send({
    project: "API v1 Web Service Praktikum Back-End",
  });
});

var userApi = require("../../api/controller/UserController");

// User
router.get("/user", userApi.get);
router.get("/user/:id", userApi.getById);
router.post("/user", createUserValidation, userApi.create);
router.put("/user/:id", authenticateJWT, updateUserValidation, userApi.update);
router.delete("/user/:id", userApi.delete);

router.post("/user/login", loginValidation, userApi.login);

router.put(
  "/user/foto-profil/:id",
  authenticateJWT,
  upload("uploads").single("file"),
  userApi.updateFotoProfil
);

module.exports = router;
