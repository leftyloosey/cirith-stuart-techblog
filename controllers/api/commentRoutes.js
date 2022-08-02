const router = require('express').Router();
const { Comment } = require('../../models');
const { Post } = require('../../models');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {
      
      const commentData = await Comment.findAll({
        include: [
          {
            model: User,
            // attributes: ['name'],
          },
          {
            model: Post,
            // attributes: ['name'],
          },
        ],
      });
  
      const comments = commentData.map((comment) => comment.get({ plain: true }));
  
      // res.render('homepage', { 
      //   users, 
      //   logged_in: req.session.logged_in 
      // });
      res.status(200).json(commentData)
    } catch (err) {
      console.log(err)
      res.status(500).json("why u no"+err);
    }
  });

  router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
         
      });
      console.log("NEW COMMENT", newComment)
      res.status(200).json(newComment);
      // res.render('comment', {
      //   ...comment,
      //   logged_in: req.session.logged_in
      // });
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [
          {
            model: User,
            // attributes: ['name'],
          },
          {
            model: Post,
            // attributes: ['name'],
          },
        ],
      });
  
      const comment = commentData.get({ plain: true });
      res.status(200).json(comment);
      // console.log(comment)
      // res.render('comment', {
      //   ...comment,
      //   logged_in: req.session.logged_in
      // });
    } catch (err) {
      console.log("this error")
      res.status(500).json(err);
    }
  });

module.exports = router;