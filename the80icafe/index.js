const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars  = require('express-handlebars');
const port = 3000
const route = require('./router')
const db = require('./config/db')
const methodOverride = require('method-override')
// const Middleware = require('./middleware/Middleware')
const Handlebars = require('handlebars')

// Connect DB
db.connect();

const app = express();
app.use(express.static('partials'))
app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({
    extended : true
}))
app.use(express.json())
app.use(methodOverride('_method'))


// app.use(Middleware)

// HTTP logger
app.use(morgan('combined'))
// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a,b) => a + b,
        handleSort: (name,sort)=>{
        //     return `<div class="nav-item dropdown">
        //     <a
        //       class="nav-link dropdown-toggle"
        //       href="#"
        //       id="navbarDropdown"
        //       role="button"
        //       data-toggle="dropdown"
        //       aria-haspopup="true"
        //       aria-expanded="false"
        //     >
        //       Sắp xếp
        //     </a>
        //     <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        //       <a class="dropdown-item" href="?_sort&column=${name}&type=asc">Sắp
        //         xếp tăng dần <i class="fas fa-sort-amount-up-alt"></i>
        //       </a>
        //       <div class="dropdown-divider"></div>
        //       <a class="dropdown-item" href="?_sort&column=${name}&type=desc">Sắp
        //         xếp giảm dần
        //         <i class="fas fa-sort-amount-down-alt"></i></a>
        //     </div>
        //   </div>`
        const sortType = name === sort.column ? sort.type : 'default'
        const icons = {
            default : 'fas fa-sort',
            asc : 'fas fa-sort-amount-up-alt',
            desc: 'fas fa-sort-amount-down'
        }
        const type = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        }
        const icon = icons[sortType];
        const  typeCurrent= type[sortType];
        const href = Handlebars.escapeExpression(`?_sort&column=${name}&type=${typeCurrent}`)
        result = `<a href="${href}">
        <i class="${icon}"></i></a>`  
        return new Handlebars.SafeString(result);   
        }
        
    }
}));
app.set('view engine', 'hbs');
app.set('views' ,path.join(__dirname, 'resources', 'views'))


route(app)



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

