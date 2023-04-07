const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const engine = handlebars.engine
const path = require('path')
const routes = require('./routes')
const db = require('./config/database/connection')
const SortMiddleware = require('./middleware/SortMiddleware')
const methodOverride = require('method-override')
const { render } = require('node-sass')
const app = express()
const port = 3000

// connect database (MongoDB)
db.connection()
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())

// use morgan to check http request
app.use(morgan('combined'))

//use express-handlebars
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            // Function to do basic mathematical operation in handlebar
            math: function (lvalue, operator, rvalue) {
                lvalue = parseFloat(lvalue)
                rvalue = parseFloat(rvalue)
                return {
                    '+': lvalue + rvalue,
                    '-': lvalue - rvalue,
                    '*': lvalue * rvalue,
                    '/': lvalue / rvalue,
                    '%': lvalue % rvalue,
                }[operator]
            },
            sortable: function (field,sort) {
                let sortType = field === sort.column ? sort.type : 'default'

                let renderSortDefault = {
                    path: `?_sort&column=${field}&type=asc`,
                    icon: 'fa-solid fa-sort'
                }

                let renderSort = {}
                Object.assign(renderSort,renderSortDefault)

                if(sort.enable)
                {
                    if(sortType=== 'default')
                    {
                          Object.assign(renderSort,renderSortDefault)
                    }else if(sortType=== 'asc')
                    {
                        Object.assign(renderSort,{
                            path:`?_sort&column=${field}&type=desc`,
                            icon: 'fa-solid fa-arrow-up-wide-short'
                        })
                    }else
                    {
                        //type is desc
                        Object.assign(renderSort,{
                            path:`?_sort&column=${field}&type=asc`,
                            icon: 'fa-solid fa-arrow-up-short-wide '
                        })
                    }
                }
                return `<a href="${renderSort.path}"><i class="${renderSort.icon}"></i></a>`
            }
        },
    })
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resource', 'views'))
//init static file
app.use(express.static('./public'))
// override with POST having ?_method
app.use(methodOverride('_method'))
//custom sortMiddleware
app.use(SortMiddleware)

routes(app)

app.listen(port, () => {
    console.log(`This app listening on port ${port}`)
})
