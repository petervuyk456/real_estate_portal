const router = require("express").Router();
let Property = require("../models/property.model");

router.route("/").get((req, res) => {
  Property.find()
    .then((properties) => res.json(properties))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const address = req.body.address;
  const date = Date.parse(req.body.date);

  const newProperty = new Property({
    username,
    address,
    date,
  });

  newProperty
    .save()
    .then(() => res.json("Property added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Property.findById(req.params.id)
    .then(() => res.json(property))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Property.findByIdAndDelete(req.params.id)
    .then(() => res.json("Property deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Property.findById(req.params.id)
    .then((property) => {
      property.username = req.body.username;
      property.address = req.body.address;
      property.date = Date.parse(req.body.date);

      property
        .save()
        .then(() => res.json("Property updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
