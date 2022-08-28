const express = require("express");
const sign = require("jwt-encode");
const unsign = require("jwt-decode");
const { v4: uuid } = require("uuid");

const addressV1 = express.Router();

const { User } = require("../models/user.models");
const { authVerify } = require("../middlewares/auth.middleware");
