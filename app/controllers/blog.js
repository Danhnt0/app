var express = require('express');
var router = express.Router();
var post_model = require('../models/posts');

router.get('/', function (req, res) {
    if (!req.session.user) {
        res.redirect('/admin/signin');
    }
    else {

        var data = post_model.getAllPosts();
        data.then(function (posts) {
            res.render('blog/index', { data: { post: posts } });
        }).catch(function (error) {
            res.render('blog/index', { data: { error: "Failed to load posts" } });
        });
    }

});

router.get('/post/:id', function (req, res) {
    if (!req.session.user) {
        res.redirect('/admin/signin');
    }
    else {

        var data = post_model.getPostById(req.params.id);
        data.then(function (posts) {
            var post = posts[0];
            res.render('blog/post', { data: { post: post } });
        }).catch(function (error) {
            res.render('blog/post', { data: { error: "Failed to load post" } });
        });
    }

});

router.get('/about', function (req, res) {
    if (!req.session.user) {
        res.redirect('/admin/signin');
    }
    res.render('blog/about', { data: {} });
});

router.get('/contact', function (req, res) {
    if (!req.session.user) {
        res.redirect('/admin/signin');
    }
    res.render('blog/contact', { data: {} });
});






module.exports = router;