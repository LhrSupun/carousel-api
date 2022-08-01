const express = require("express");
const bodyParser = require("body-parser");
const { slides } = require("./carousel");
const cors = require("cors");
const mongoose = require("mongoose");
const Carousel = require("./models/Carousel");

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connectionURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test`;

/* eslint-enable */
mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // eslint-disable-next-line
  console.log("We are Connected!");
});

app.post("/api/slides", (req, res) => {
  try {
    const { title, image, subTitle } = req.body;

    const slide = new Carousel({
      title,
      image,
      subTitle,
    });
    slide.save();
    return res.status(201).json(slide);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// Function to handle the root path
app.get("/api/carousel", async function (req, res) {
  try {
    const noOfSlides = Number(req.query.slides);

    if (noOfSlides > 10) {
      return res.status(400).send("Max 10 slides");
    }

    const slidesToReturn = slides.slice(0, noOfSlides);

    // Return the Slides to the frontend

    return res.status(200).json(slidesToReturn);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get("/api/view-carousel", async function (req, res) {
  try {
    const slidesToReturn = await Carousel.find();

    console.log(slidesToReturn);
    // Return the Slides to the frontend

    return res.status(200).json(slidesToReturn);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.listen(3600, function () {
  console.log("Server is listening on port 3600");
});
