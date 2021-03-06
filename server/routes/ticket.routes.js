
const express = require("express");
const multer = require('multer');

const controller = require("../controllers/ticket.controller");

module.exports = function (app) {


  var router = require("express").Router();

  router.post("/", controller.create);

  router.put("/:ticket_id", controller.update);

  router.get("/", controller.findAll);

  router.delete("/:ticket_id", controller.delete);

  router.get("/:ticket_id", controller.findOne);

  router.get("/creation", controller.connect);

  router.get("/statut/:statut", controller.findTicketByStatut);

  router.get("/statut/:statut/:user_id", controller.findTicketByStatutAndUser);

  router.get("/datecreation/dd/:statut/:attribuea", controller.findTicketByDateAndStatut);

  router.get("/user/:user_id", controller.findTicketByUser);

  router.get("/datecreation/dd", controller.findTicketByDate);


  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
      callBack(null, file.originalname)
    }
  })

  const upload = multer({ storage: storage })

  //let upload = multer({ dest: 'uploads/' })


  router.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send({ file: file.originalname });
  })
  app.use('/api/ticket/uploads', express.static('uploads'));
  app.use(express.static('uploads'));

  app.use('/api/ticket', router);

};