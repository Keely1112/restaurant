const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index',{restaurant: restaurantList.results})
})

app.get('/search', (req, res) => {
  const restaurant = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.keyword) || restaurant.category.toLowerCase().includes(req.query.keyword)
  })
  res.render('index',{ restaurant: restaurant, keyword: req.query.keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurants = restaurantList.results.find(restaurant => restaurant.id === Number(req.params.restaurant_id))
  res.render('show', { restaurants: restaurants })
})
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
})