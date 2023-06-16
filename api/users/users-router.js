const express = require('express');
const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware');

const User = require('./users-model');
const Post = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
  .then(users =>{
    res.json(users)
  })
  .catch(next);
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert({ name: req.name })
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      next(err)
    })
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // console.log(req.user);
  // console.log(req.name);
  User.update(req.params.id, { name: req.name })
  .then(userUpdated => {
    res.json(userUpdated);
  })
  .catch(next);
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);
  console.log(req.text);
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'Error inside router crashed!',
    message: err.message
  });
})

// do not forget to export the router
module.exports = router;