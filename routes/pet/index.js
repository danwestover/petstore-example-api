'use strict'
const fastify = require('fastify')()
fastify.register(require('@fastify/sensible'))

const pets = require('../../data/pets.json');

console.log(pets);

module.exports = async function (fastify, opts) {
  // add a new pet to the store
  fastify.post('/', async function (request, reply) {
    // 200 - success
    // 405 - invalid input
    return 'this is a pet'
  })
  
  // update an existing pet
  fastify.put('/', async function (request, reply) {
    // 200 - success
    // 400 - invalid ID
    // 404 - pet not found
    // 405 - validation exception
    return 'this is a pet'
  })
  

  // find pets by status
  fastify.get('/findByStatus', async function (request, reply) {
    const { status } = request.query;
    // 200 success
    // 400 invalid status value
    return status;
  })

  // find pets by tags
  fastify.get('/findByTags', async function (request, reply) {
    // 200 success
    // 400 invalid tag value
    const { tags } = request.query;
    return [tags.split(',')];
  })

  // update pet with form data
  fastify.post('/:petId', async function (request, reply) {
    // 405 invalid input
    const { petId } = request.params;
    return petId;
  })

  // get pet by id
  fastify.get('/:petId', async function (request, reply) {
    // 200 success
    // 400 invalid ID
    // 404 pet not found
    const { petId } = request.params;
    return petId;
  })

  // delete pet by id
  fastify.delete('/:petId', async function (request, reply) {
    const { petId } = request.params;
    return petId;
  })

  fastify.post('/:petId/uploadImage', async function (request, reply) {
    return;
  })
}
