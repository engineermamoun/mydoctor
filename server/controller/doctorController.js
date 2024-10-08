const Sequelize = require("sequelize");

const model = require("../model");

const Op = Sequelize.Op;

exports.index = async (req, res, next) => {
  let {
    name,
    page = 1,
    limit = 2,
    userType = "doctor",
    specialization,
  } = req.query;
  const offset = (page - 1) * limit;
  // search by the user type(doctor|normal) , by the user name, by the user specialization
  const searchQuery = {
    ...(userType && { userType: userType }),
    ...(name && { name: { [Op.iLike]: `%${name.replace(" ", "")}%` } }),
    ...(specialization && {
      "$profile.specialization$": { [Op.iLike]: specialization },
    }),
  };

  try {
    const { count, rows: doctors } = await model.User.findAndCountAll({
      where: searchQuery,
      include: [{ model: model.Profile, as: "profile" }],
      attributes: { exclude: ["password"] },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      totalPages,
      count,
      currentPage: parseInt(page),
      data: doctors,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
