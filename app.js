const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 8080, () => {
    console.log('server is running on port 8080');
})

const posts = [
    {
        slug: 'first-post',
        title: 'first post',
        body: 'very long body',
    },
    {
        slug: 'second-post',
        title: 'second post',
        body: 'another very long body',
    },
    {
        slug: 'test',
        title: 'test',
        body: 'hmmmmmmmmmmmmmmmmmmmmmmmmmm, i guess you can win them all.'
    }
]


app.get('/', (req, res) => {

    res.render('home', {posts: posts});

});

app.get('/contact', (req, res) => {

    console.log(posts);
    res.render('contact');

});

app.get('/about', (req, res) => {

    res.render('about');

});

app.get('/posts/create', (req, res) => {

    res.render('form');

});

app.post('/posts', (req, res) => {

    const title = req.body.title;
    const body = req.body.body;
    const slug = title.toLowerCase().replace(/ /g, '-');

    const post = {
        slug: slug,
        title: title,
        body: body,
    };

    posts.push(post);
    res.redirect('/');

});

app.get('/posts/:postSlug', (req, res) => {

    posts.forEach(post => {

        if (post.slug === req.params.postSlug) {
            res.render('post', {post: post});
        }

    });

    res.Status(404).send('not found');
});

