// Possible Requires
require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('.error-middleware');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware,staticMiddleware);



//GET ALL OF THE INVENTORY IN A SPECIFIC CATEGORY
app.get(`/api/category/${type}`,(req,res,next)=>{
  const type = req.params.type;
  if (!type)) {
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
    if(!typeData) {
      throw new ClientError(401, `Cannot find Item with Item Id ${type}`)
    } else {
      res.status(201).json(typeData)
    }
  })
  .catch(err=>{
    next(err);
  })
})




//GET ALL CATEGORIES AND THEIR DATA - GROUPED BY THE TYPE
app.get('/api/category', (req, res, next) => {
//Add conditionals here if you have any
const sql = `
  select *
  from "inventory"
  group by "type"
`;

db.query(sql)
.then(result=>{
  const [categoryData] = result.rows;
  res.status(201).json(categoryData);
})
.catch(err=>{
  next(err);
});
})


//GET ALL THE ORDERS FROM THE CURRENT SHOPPING CART
//ORDERS TABLE WHERE ISCOMPLETE = FALSE
app.get('/api/orders/', (req, res, next)=>{
  //ADD ANY CONDITIONS HERE

  const sql = `
  select *
  from "orders"
  join "orderItems" using ("orderId")
  join "inventory" using ("itemId")
  group by "orderId"
  where "isComplete" = 'false'
  `;
  db.query(sql)
  .then(result=>{
    const ordersData = result.rows;
    res.status(201).json(ordersData);
  })
  .catch(err=>next(err));

})


//THIS WILL TAKE FROM INVENTORY AND POST INTO ORDERITEMS
//WITH THE SAME ORDERiD
app.post()




//THIS WILL INCREASE THE ORDER ID BY ONE ONCE THE CHECKOUT
//BUTTON HAS INITIATED IT
app.patch(`api/orderId/add/${orderId}`,(req,res,next)=>{
  const orderId = parseInt(req.params.orderId,10);
  if(!Number.isInteger(orderId) || orderId < 0) {
    throw new ClientError(400,'orderId must be a positive integer');
  }
  const newOrder = orderId + 1;
  const sql = `
  update "orderItems"
  set "orderId" = $1
  returning *
  `;
  const params = [newOrder];
  db.query(sql,params)
  .then(result=> {
    res.status(201).json(result.rows)
  })
  .catch(err=>next(err));
})

//THIS WILL GET THE CURRENT ORDER ID
app.get('api/orderItems/orderId',(req,res,next)=>{
  //ADD ANY CONDITIONS HERE
  const sql = `
  select "orderId"
  from "orderItems"
  `;
  db.query(sql)
  .then(result=>{
    res.status(201).json(result.rows)
  })
  .catch(err=>next(err));
})
















//THIS WILL CHANGE THE ISCOMPLETE ON THE ORDERS TABLE TO DONE
//WHEN THE USER CLICKS IT
app.path()


//THIS WILL UPDATE THE CLIENT INFORMATION ONCE THEY HAVE ENTERED IT
//INTO THE SYSTEM
app.post()







//THIS IS TO UPDATE AN SPECIFIC ITEM IN THE CATEGORY
app.patch(`/api/category/${itemId}`, (req,res,next) => {
  const itemId = parseInt(req.params.itemId,10);
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
  if(!updatedRow){
    throw new ClientError(404,`Cannot find itemId with the Id ${itemId}`);
  } else {
    res.status(201).json(updatedRow);
  }
})
.catch(err=>next(err));
})



app.use(errorMiddleware);


app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
