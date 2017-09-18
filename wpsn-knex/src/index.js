// 통신을 주로하는 영역
const express = require('express')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const flash = require('connect-flash')
const csurf = require('csurf')

const query = require('./query')
// const knex = require('./knex')

// middleware는 순서에 영향을 받는다.
const app = express()
const urlencodedMiddleware = bodyParser.urlencoded({ extended: false })
const csrfMiddleware = csurf()

app.use(cookieSession({
  name: 'session',
  keys: ['mysecret']
}))
app.use(urlencodedMiddleware)
app.use(csrfMiddleware)
app.use(flash())

app.set('view engine', 'ejs')


// git add
function authMiddleware(req, res, next) {
  if(req.session.id){
    query.getUserById(req.session.id)
      .then(matched => {
        req.user = matched
        res.locals.user = matched  // ejs, pug를 쓴다면 이렇게 넣어줘야한다.
        next()
      })
  }else {
    res.redirect('/login')
  }
}

app.get('/', authMiddleware, (req, res) => {
  query.getUrlEntriesByUserId(req.user.id)
    .then(rows => {
      res.render('index.ejs', {rows, csrfToken: req.csrfToken()})
    })
})

app.get('/login', (req, res) => {
  res.render('login.ejs', {errors: req.flash('error'), csrfToken: req.csrfToken()})
})

app.post('/login', (req, res) => {
  query.getUserById(req.body.username)
    .first()
    .then(matched => {
      // compareSync(원래 pwd, bcrypt pwd)
      if (matched && bcrypt.compareSync(req.body.password, matched.password)){
        req.session.id = matched.id // 값은 cookie에 저장된다.
        res.redirect('/')
      }else {
        // session에 정보를 저장한다. 정보를 저장했으니 redirect를 해야한다.
        req.flash('error', 'id or password is not mathced')
        // res.status(400)
        // res.send('400 Bad request')
        res.redirect('/login')
      }
    })
})

app.post('/logout', (req,res) => {
  req.session = null;
  res.redirect('/login')
})

// authMiddleware를 사용하지 않는다면 req.user에 아무런 정보가 들어가지 않는다.
app.post('/url_entry', authMiddleware, (req, res) => {
  const long_url = req.body.long_url
  // 데이터 저장
  query.createUrlEntry(long_url, req.user.id)
    .then( () => {
      res.redirect('/')
    })
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

// app.get('/:id', (req, res, next) => {
//   query.getUrlById(req.params.id)
//     .then(urlEntry => {
//       if(urlEntry){
//         query.saveClickCountById(urlEntry.id, urlEntry.click_count+1)
//           .then(() => {
//             res.redirect(urlEntry.long_url) // 301 moved~~ 영원히 이동한다 (브라우저에 저장) , 302 브라우저에 저장안하고 다시보낸다.
//             // res.redirect(301, entry.long_url)를 해야하지만 사람들이 얼마나 클릭했는지 확인하기 위해서 301을 뺐다.
//           })
//       }else {
//         next()
//       }
//     })
// })

app.get('/:id', (req, res, next) => {
  query.getUrlById(req.params.id)
    .then(urlEntry => {
      if(urlEntry){
        query.incrementClickCountById(urlEntry.id) // Atomic Update를 적용한 상태이다.
          .then(() => {
            res.redirect(urlEntry.long_url) // 301 moved~~ 영원히 이동한다 (브라우저에 저장) , 302 브라우저에 저장안하고 다시보낸다.
            // res.redirect(301, entry.long_url)를 해야하지만 사람들이 얼마나 클릭했는지 확인하기 위해서 301을 뺐다.
          })
      }else {
        next()
      }
    })
})


app.get('/register', (req, res) => {
  res.render('register.ejs', {csrfToken: req.csrfToken()})
})

app.post('/register', (req, res) => {
  query.createUser(req.body.id, req.body.password)
    .then(() => {
      // 로그인
      req.session.id = req.body.id
      res.redirect('/')
    })
})

app.listen(3000, () => {
  console.log('listening...')
})
