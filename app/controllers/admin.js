const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var user_model = require('../models/user');
var post_model = require('../models/posts');
var helper = require('../helpers/helper');



router.get('/', function (req, res) {
    if (!req.session.user) {
        res.redirect('/admin/signin');
    }
    else {

        var data = post_model.getAllPosts();
        data.then(function (posts) {
            res.render('./admin/home', { data: { posts: posts } });
        }).catch(function (error) {
            res.render('./admin/home', { data: { error: "Failed to load posts" } });
        });
    }

});

router.get('/signup', function (req, res) {
    res.render('signup', { data: {} });
});


router.post('/signup', function (req, res) {
    var user = req.body;




    if (user.password != user.repassword && user.password != "") {
        res.render('signup', { data: { error: "Passwords do not match" } });
    }

    //sucessfully added user

    if (user.password == user.repassword) {

        let password = user.password;

        password = helper.hash_password(password);



        user = {
            email: user.email,
            password: password,
            first_name: user.firstname,
            last_name: user.lastname
        }

        var result = user_model.addUser(user);

        if (!result) {
            res.render('signup', { data: { error: "Error while adding user" } });

        } else {
            res.render('signup', { data: { success: "User added successfully" } });


        }

    }

});

router.get('/signin', function (req, res) {
    res.render('signin', { data: {} });
});

router.post('/signin', function (req, res) {
    var user = req.body;


    var result = user_model.getUserByEmail(user.username);


    result.then(function (users) {
        var data = users[0];
        if (data) {
            var isMatch = helper.compare_password(user.password, data.password);


            if (isMatch) {
                req.session.user = result;
                res.redirect('/admin');


            } else {
                res.render('signin', { data: { error: "Password does not match" } });
            }

        } else {
            res.render('signin', { data: { error: "Email does not exist" } });
        }

    });

});

router.get('/post/new', function (req, res) {
    if (!req.session.user) {
        res.redirect('/admin/signin');
    }
    else {
        res.render('./admin/post/new', { data: {} });
    }
});

router.post('/post/new', function (req, res) {
    var data = req.body;



    var post = {
        title: data.title,
        content: data.content,
        author: data.author,
        created_at: new Date(),
        updated_at: new Date()

    }

    var result = post_model.addPost(post);

    if (!result) {
        res.render('./admin/post/new', { data: { error: "Error while adding post" } });
    }
    else {
        res.render('./admin/post/new', { data: { success: "Post added successfully" } });
    }

});


router.get('/post/edit/:id', function (req, res) {
    if (!req.session.user) {
        res.redirect('/admin/signin');
    }
    else {

        var id = req.params.id;
        var post = post_model.getPostById(id);



        post.then(function (posts) {
            var post = posts[0];
            res.render('./admin/post/edit', { data: { post: post } });
        }).catch(function (error) {
            res.render('./admin/post/edit', { data: { error: "Failed to load post" } });
        });
    }
});

router.post('/post/edit/:id', function (req, res) {
    var id = req.params.id;
    var data = req.body;

    var post = {
        title: data.title,
        content: data.content,
        author: data.author,
        updated_at: new Date()
    }


    var result = post_model.updatePost(post, id);


    if (!result) {
        res.render('./admin/post/edit', { data: { error: "Failed to load post", post: post } });
    }
    else {

        res.render('./admin/post/edit', { data: { success: "Update successfully", post: post } });

    }

});


router.get('/post/delete/:id', function (req, res) {
    if (!req.session.user) {
        res.redirect('/admin/signin');
    }
    else {

        var id = req.params.id;
        var result = post_model.deletePost(id);

        if (!result) {
            res.render('./admin/home', { data: { error: "Failed to delete post" } });
        }
        else {
            res.redirect('/admin');
        }
    }
});




module.exports = router;
