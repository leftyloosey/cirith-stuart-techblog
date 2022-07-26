const router = require('express').Router();
const { User } = require('../../models');
const { Post } = require('../../models');
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
      
      const userData = await User.findAll({
        include: [
          {
            model: Post,
            // attributes: ['title'],
          },
          {
            model: Comment
          }
        ],
      });
  
      const users = userData.map((user) => user.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      // res.render('homepage', { 
      //   users, 
      //   logged_in: req.session.logged_in 
      // });
      res.status(200).json(userData)
    } catch (err) {
      console.log(err)
      res.status(500).json("why u no"+err);
    }
  });

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);

    })
      // res.json({ user: userData, message: 'You are now logged in!' });

  } catch (err) {
    console.log("didn't make it " + err)
    res.status(400).json(err);
  } 
});

router.post('/login', async (req, res) => {
  try {
    // const userData = await User.findOne({ where: { email: req.body.email } });
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
