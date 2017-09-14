const express = require('express')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const query = require('./query')
//knex불러오기
//const knex = require('./knex')
const app = express()
const urlencodedMiddleware = bodyParser.urlencoded({ extended: false })
//미들웨어 정의
function authMiddleware(req, res, next){
  if(req.session.id){
  query.getUserById(req.session.id)
    .then(matched => {
        req.user = matched
        res.locals.user = matched
        next()
    })
  }else{
    res.redirect('/login')
  }
}

app.use(cookieSession({
  name: 'session',
  keys: ['mysecret']
}))
app.set('view engine', 'ejs')
/*
app.post('/login', urlencodedMiddleware, (req, res) => {
  const {username, password} = req.body
  query.user.login(username, password)
    .then(user => {
      if (user) {
        req.session.user_id = user.id
        res.redirect('/')
      } else {
        res.status('400')
        res.send('아이디 혹은 비밀번호가 일치하지 않습니다.')
      }
    })
  })
})*/

app.get('/', authMiddleware, (req, res) => {
   query.getEntryByUserId(req.user.id)
      .then(rows => {
       res.render('index.ejs',{rows})
      })
})

app.get('/login', (req,res) =>{
  res.render('login.ejs')
})

app.post('/login', urlencodedMiddleware,(req,res) => {
  query.getUser(req.body.username, req.body.password)
  .first()
  .then(matched => {
    if(matched){
      req.session.id = matched.id
      res.redirect('/')
    }else{
      res.status(400)
      res.send('400 not useer found')
    }
  })
})

app.post('/logout', (req,res) => {
  req.session = null
  res.redirect('/login')
})
/*app.get('/:short_url', (req, res) => {
  query.url_entry.getByShortUrl(req.params.short_url)
    .then(entry => {
      if (entry) {
        res.redirect(301, entry.long_url)
      } else {
        res.status(404)
        res.send('404 Not Found')
      }
    })
})
*/
app.listen(3000, () => {
  console.log('listening...')
})
