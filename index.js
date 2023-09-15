const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

var tarefas = ["Arrumar o quarto", "ir à academia"];

app.post("/", (req, res) => {
  tarefas.push(req.body.tarefa);
  res.render("index", { tarefasList: tarefas });
});

app.get("/", (req, res) => {
  res.render("index", { tarefasList: tarefas });
});

app.get("/deletar/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);

  if (idToDelete >= 0 && idToDelete < tarefas.length) {
    tarefas.splice(idToDelete, 1);
    res.render("index", { tarefasList: tarefas });
  } else {
    res.status(404).send("Tarefa não encontrada"); // Handle invalid id
  }
});

app.listen(5000, () => {
  console.log("server rodando!");
});
