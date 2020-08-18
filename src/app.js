const express = require("express");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } =request.body;

  const newRepository ={
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(newRepository);

  return response.status(200).json(newRepository);

});

app.put("/repositories/:id", (request, response) => {
  const { id }=request.params;
  const { title, url, techs }=request.body;
  
  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0){
    response.status(400).json('Error not especified');
  }

  repositories[index] = {
    ...repositories[index],
    title,
    url,
    techs
  };
  response.status(200).json(repositories[index]);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0){
    response.status(400).json('Error not especified');
  }

  repositories.splice(index, 1);

  response.status(204).json();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id }=request.params;
  
  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0){
    response.status(400).json('Error not especified');
  }

  repositories[index].likes++;
  response.status(200).json(repositories[index]);
});

module.exports = app;
