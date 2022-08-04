const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No such post.' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User
          // attributes: ['name'],
        },
        {
          model: Comment,
          // attributes: ['name'],
        },
      ],
    
    });

    const post = postData.get({ plain: true });
    // res.status(200).json(post);
    console.log(post)
    res.render('comment', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/view/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User
          // attributes: ['name'],
        },
        {
          model: Comment,
          // attributes: ['name'],
        },
      ],
    
    });

    const post = postData.get({ plain: true });
    // res.status(200).json(post);
    console.log(post)
    res.render('post', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/edit/:id', async (req, res) => {
  try {

    const postData = await Post.update( 
      {
        title: req.body.title,
        body: req.body.body
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    console.log(postData)
    if (!postData) {
      res.status(404).json({ message: 'No such post.' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
