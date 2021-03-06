const db = require("../models");
const config = require("../config/auth.config");
const User = db.utilisateur;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    phone: req.body.phone,
    gender: req.body.gender,
    status: req.body.status,
    username: req.body.username,
    email: req.body.email,
    image: req.body.image,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(utilisateur => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          utilisateur.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        utilisateur.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(utilisateur => {
      if (!utilisateur) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        utilisateur.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var status = utilisateur.status
      if (status === false) {
        return res.status(401).send({
          accessToken: null,
          message: "Votre Compte a été banni!"
        });
      }

      var token = jwt.sign({ id: utilisateur.user_id }, config.secret, {
        expiresIn: 7200 // 2 hours (seconds)
      });

      var authorities = [];
      utilisateur.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: utilisateur.user_id,
          username: utilisateur.username,
          email: utilisateur.email,
          status: utilisateur.status,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
