const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
      
      const commentData = await Comment.findAll({
        // include: [
        //   {
        //     model: Post,
        //     model: Comment,
        //     attributes: ['title'],
        //   },
        // ],
      });
  
      const comments = commentData.map((comment) => comment.get({ plain: true }));
  
      // Pass serialized data and session flag into template
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

module.exports = router;