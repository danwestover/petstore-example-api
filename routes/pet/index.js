"use strict";
const fastify = require("fastify")();
fastify.register(require("@fastify/sensible"));

let pets = require("../../data/pets.json");

module.exports = async function (fastify, opts) {
  // add a new pet to the store
  fastify.post("/", async function (request, reply) {
    const newPet = JSON.parse(request.body);
    for (let pet of pets) {
      if (newPet.id == pet.id) {
        console.log(pets);
        reply.statusCode = 409;
        reply.send(`Pet with id ${newPet.id} already exists.`);
        return;
      }
    }
    pets.push(newPet);

    return pets;
  });

  // update an existing pet
  fastify.put("/:petId", async function (request, reply) {
    const { petId } = request.params;
    const petNewInfo = JSON.parse(request.body);

    if (petId.match(/^[0-9]+$/) == null) {
      reply.statusCode = 400;
      reply.send("invalid pet ID");
      return;
    }

    let updatePet = pets.findIndex((pet) => pet.id == petId);

    if (updatePet < 0) {
      reply.statusCode = 404;
      reply.send("Pet not found");
    }

    pets[updatePet] = petNewInfo;
    return petNewInfo;
  });

  // get pet by id
  fastify.get("/:petId", async function (request, reply) {
    const { petId } = request.params;

    console.log(typeof petId);

    if (petId.match(/^[0-9]+$/) == null) {
      reply.statusCode = 400;
      reply.send("invalid pet ID");
      return;
    }

    for (var pet of pets) {
      if (pet.id == petId) {
        return pet;
      }
    }
    reply.statusCode = 404;
    reply.send("pet not found");
    return;
  });

  // delete pet by id
  fastify.delete("/:petId", async function (request, reply) {
    const { petId } = request.params;

    if (pets.length == 0) {
      reply.send("No pets to delete.");
    }

    if (!pets.find((pet) => pet.id == petId)) {
      reply.statusCode = 400;
      reply.send("Invalid pet value");
    }

    pets = pets.filter((pet) => {
      if (pet.id != petId) {
        return pet;
      }
    });
    return pets;
  });
};
