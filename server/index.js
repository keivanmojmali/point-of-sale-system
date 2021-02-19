require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const jsonMiddleware = express.json();
app.use(jsonMiddleware,staticMiddleware);


app.get(`/api/category/byType/:type`,(req,res,next)=>{
  const type = req.params.type;
  if (!type) {
    throw new ClientError(400,'Type is a required field')
  };
  const sql = `
  select *
  from "inventory"
  where "type" = $1
  `;
  const params = [type];
  db.query(sql,params)
  .then(result=>{
    const itemsData = result.rows;
    if(!itemsData) {
      throw new ClientError(401, `Cannot find Item with type of ${type}`)
    } else {
      res.status(201).json(itemsData)
    }
  })
  .catch(err=>{
    next(err);
  })
})


app.get('/api/category/getAll', (req, res, next) => {
const sql = `
select "type"
  from "inventory"
  group by "type"
`;
db.query(sql)
.then(result=>{
  const categoryData = result.rows;
  res.status(201).json(categoryData);
})
.catch(err=>{
  next(err);
});
})


app.get('/api/bestSeller',(req,res,next)=>{
  const sql = `
  select *
  from "bestSellers"
  join "inventory" using ("itemId")
  `
  db.query(sql)
  .then(result=>{
    res.status(201).json(result.rows)
  })
  .catch(err=>next(err))
})


app.post(`/api/addTo/openOrders`,(req,res,next)=>{
  const itemId = parseInt(req.body.itemId, 10);
  const price = parseInt(req.body.price,10);
  if(req.body.orderId){
    const orderId = parseInt(req.body.orderId, 10);
    const sql = `
  insert into "orderItems" ("itemId","orderId")
  values ($1,$2)
  returning *
  `;
    const params = [itemId, orderId]
    db.query(sql, params)
      .then(result => {
        res.status(201).json(result.rows)
      }).catch(err => {
        console.error(err)
        next(err)})
  } else {
    const sql = `
  insert into "orderItems" ("itemId","orderId")
  values ($1,$2)
  returning *
  `;
    const params = [itemId,orderId]
    db.query(sql, params)
      .then(result => {
        res.status(201).json(result.rows)
      }).catch(err =>{
        console.error(err)
        next(err)})
  }
})


app.get('/api/orderItems/orderId',(req,res,next)=>{
  const sql = `
  select max("orderId")
  from "orders"
  `;
  db.query(sql)
  .then(result=>{
    if(result.rows[0].max === null) {
      res.status(201).json([{max:1}])
    }else {

      res.status(201).json(result.rows)
    }
  })
  .catch(err=>{
    console.error(err)
    next(err)});
})


app.get('/api/currentOrder/:localStorageId', (req, res, next) => {
  let orderId = req.params.localStorageId;
  if(orderId === undefined || orderId.length < 0){
    throw new ClientError(400,'Local Storage Id is a required field')
  };
  const sql = `
  select *
  from "orderItems"
  join "inventory" using ("itemId")
  where "orderId" = $1
  `;
  const params = [orderId]
  db.query(sql,params)
  .then(result=>{
    res.status(201).json(result.rows)
  })
  .catch(err=>{
    next(err)
  })
})


 app.patch('/api/deleteItem',(req,res,next)=>{
  const orderItemsId = parseFloat(req.body.orderItemsId,10);
  if(!Number.isInteger(orderItemsId) || orderItemsId === undefined) {
    throw new ClientError(401,'Order Items Id is a required field')
  }
  const sql = `
  delete from "orderItems"
  where "orderItemsId" = $1
  returning *
  `
  const params = [orderItemsId]
  db.query(sql,params)
  .then(result=>{
    res.status(201).json(result.rows)
  })
  .catch(err=>{
    console.error(err)
    next(err)
  })

 })


app.patch(`/api/orders/complete`,(req,res,next)=>{
  const orderId = parseInt(req.body.orderId,10);
  if(!Number.isInteger(orderId) || orderId < 0){
    throw new ClientError(400,'OrderId must be a positive integer')
  }
  const sql = `
  update "orders"
  set "isComplete" = 'true'
  where "orderId" = $1
  returning *
  `;
  const params = [orderId]
  db.query(sql,params)
  .then(result=>{
    res.status(201).json(result.rows)
  })
  .catch(err=>{
      console.error(err)
    next(err)});
})


app.post(`/api/customers/orders`,(req,res,next)=>{
const firstName = req.body.fName;
const lastName = req.body.lName;
const phone = req.body.phone.toString();
const currentOrder = req.body.orderId;
const total = req.body.total;
const orderArray = req.body.orderArray;
let newCustomerId = null;
const isNotComplete = false;

if(!lastName || !firstName || !phone){
  throw new ClientError(400,'firstName, lastName and phone are required fields')
}
if(phone.length < 7){
  throw new ClientError(401,'Phone must be at least 7 numbers in length')
}
const sql = `
  insert into "customers" ("firstName","lastName","phone")
  values ($1,$2,$3)
  returning "customerId"
`;
const params = [firstName,lastName,phone];
db.query(sql,params)
.then(result=>{
  console.log('aaaaaaaaaaaaaaaaaaaaa',result.rows)
  newCustomerId = result.rows[0].customerId;
  const postsql = `
  insert into "orders" ("orderId","customerId","isComplete","total","orderArray")
  values ($1,$2,$3,$4,$5)
  returning *
  `;
  const postParams = [currentOrder,newCustomerId,isNotComplete,total,orderArray]
  db.query(postsql,postParams)
  .then(result=>{

    res.status(201).json(result.rows)
  }).catch(err=>{
    console.error(err)
    next(err)})
})
.catch(err=>{
  console.error(err)
  next(err);
})
})


app.patch(`/api/category/updateItem`, (req,res,next) => {
  const itemId = parseInt(req.body.itemId,10);
  if(!Number.isInteger(itemId) || itemId < 0) {
    throw new ClientError(400,'Item Id must be a positive integer')
  };
const {name, description} = req.body;
const price = parseInt(req.body.price,10);
const stock = parseInt(req.body.stock,10);
if(!name || !description || !price || !stock || !Number.isInteger(price) || !Number.isInteger(stock)) {
  throw new ClientError(400,'Name, Description, Price and Stock are Required Fields');
};
const sql = `
update "inventory"
set "name" = $1, "description" = $2, "price" = $3, "stock" = $4
where "itemId" = $5
returning *
`;
const params = [name, description, price, stock, itemId];
db.query(sql,params)
.then(result=>{
  const updatedRow = result.rows;
  if(updatedRow.length === 0){
    throw new ClientError(404,`Cannot find itemId with the Id ${itemId}`);
  } else {
    res.status(201).json(updatedRow);
  }
})
.catch(err=>next(err));
})

app.get('/api/getDirections',(req,res,next)=>{
   const sql = `
   select *
   from "directions"
   `
   db.query(sql)
   .then(result=>
    {res.status(201).json(result.rows)}
    )
    .catch(err=>next(err))
})

app.get('/api/getAll/orders',(req,res,next)=>{
  const sql = `
  select *
  from "orders"
  join "customers" using("customerId")
  where "isComplete" = 'false'
  `
  db.query(sql)
  .then(result=>{
    res.status(201).json(result.rows)
  })
  .catch(err=>next(err))
})


app.use(errorMiddleware);


app.listen(process.env.PORT, () => {

});
