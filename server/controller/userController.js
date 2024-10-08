const bcrypt = require("bcrypt");
const models = require("../model");
const jsonwebtoken = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const {
    name,
    email,
    password,
    userType,
    location,
    specialization,
    adress,
    workingHours,
    phone,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const user = await models.User.create({
      name,
      email,
      password: hashedPassword,
      userType,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    if (userType === "doctor") {
      const profile = await models.Profile.create({
        userId: user.id,
        specialization,
        adress,
        workingHours,
        phone,
      });
    }
    res.status(200).json({ message: "Successful added" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحين",
      });
    }

    const authSuccess = await bcrypt.compare(password, user.password);
    if (!authSuccess) {
      return res.status(401).json({
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحين",
      });
    }
    const token = jsonwebtoken.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      accessToken: token,
    });
  } catch (error) {}
};

exports.me = (req, res, next) => {
  const user = req.currentUser;
  res.json(user);
};

exports.getProfile = async (req, res, next) => {
  try {
    const result = await models.User.findOne({
      where: { id: req.currentUser.id },
      include: [{ model: models.Profile, as: "profile" }],
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  const {
    name,
    latitude,
    longitude,
    userType,
    specialization,
    adress,
    workingHours,
    phone,
  } = req.body;

  try {
    if (name) {
      await models.User.update(
        {
          name,
          latitude,
          longitude,
        },
        { where: { id: req.currentUser.id } }
      );

      if (userType === "doctor") {
        await models.Profile.update(
          {
            specialization,
            adress,
            workingHours,
            phone,
          },
          { where: { userId: req.currentUser.id } }
        );
      }

      const updatedresult = await models.User.findOne({
        where: { id: req.currentUser.id },
        include: [{ model: models.Profile, as: "profile" }],
        attributes: { exclude: ["password"] },
      });

      res.status(200).json(updatedresult);
    } else {
      res.status(400).json({ message: "Name can not be empty" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  const { confirmation } = req.body;
  try {
    if (confirmation) {
      const user = await models.User.findOne({ where: { id: req.currentUser.id, } });
      if (user.userType === "doctor") {
        await models.Profile.destroy({
          where: {
            userId: req.currentUser.id,
          },
        });
      }
      await models.User.destroy({
        where: {
          id: req.currentUser.id,
        },
      });
      res.status(200).json({ message: "Deletion Done" });
    }
    res.status(400).json({ message: "Please confirm that your are aware of the action" });
  } catch (error) {
    res.status(500).json(error);
  }
};
