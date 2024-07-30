const express = require("express");
const PORT = 4020;
const knex = require("./db/knex");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const routerV1 = require("./routes/v1/index");

const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(morgan("tiny"));

// parsing the request bodys
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// inisialisasi router
app.use("/v1/", routerV1);

app.get("/", (req, res) => {
  res.end("Hello World!");
});

app.get("/ping", (req, res) => {
  res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.get("/test-html", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/test-json", (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        NIM: "202011420025",
        Nama: "Akbar Febrian",
        Prodi: "Teknik Informatika",
        Fakultas: "Teknik",
        No_Telepon: "08515542552",
        Alamat_Mahasiswa: "Kalibutuh Timur 3",
      },
    ],
  });
});

app.listen(PORT, () => {
  knex
    .raw("select 1=1 as test")
    .then((result) => {
      console.log("DB CONNECTION: ", result.rows[0].test);
    })
    .catch((err) => {
      console.log("ERROR DB:", err);
    });
  console.log("Server started listening on PORT : " + PORT);
});
