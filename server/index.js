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
app.use(jsonMiddleware, staticMiddleware);

app.get('/api/category/byType/:type', (req, res, next) => {
  const type = req.params.type;
  if (!type) {
    throw new ClientError(400, 'Type is a required field');
  }
  const sql = `
  select *
  from "inventory"
  where "type" = $1
  `;
  const params = [type];
  db.query(sql, params)
    .then(result => {
      const itemsData = result.rows;
      if (!itemsData) {
        throw new ClientError(401, `Cannot find Item with type of ${type}`);
      } else {
        res.status(201).json(itemsData);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/category/getAll', (req, res, next) => {
  const sql = `
select "type"
  from "inventory"
  group by "type"
`;
  db.query(sql)
    .then(result => {
      const categoryData = result.rows;
      res.status(201).json(categoryData);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/bestSeller', (req, res, next) => {
  const sql = `
  select *
  from "bestSellers"
  join "inventory" using ("itemId")
  `;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/addTo/openOrders', (req, res, next) => {
  const itemId = parseInt(req.body.itemId, 10);
  const price = parseInt(req.body.price, 10);
  if (req.body.orderId) {
    const orderId = parseInt(req.body.orderId, 10);
    const sql = `
  insert into "orderItems" ("itemId","orderId")
  values ($1,$2)
  returning *
  `;
    const params = [itemId, orderId];
    db.query(sql, params)
      .then(result => {
        res.status(201).json(result.rows);
      }).catch(err => {
        console.error(err);
        next(err);
      });
  } else {
    const sql = `
  insert into "orderItems" ("itemId","orderId")
  values ($1,$2)
  returning *
  `;
    const params = [itemId, orderId];
    db.query(sql, params)
      .then(result => {
        res.status(201).json(result.rows);
      }).catch(err => {
        console.error(err);
        next(err);
      });
  }
});

app.get('/api/orderItems/orderId', (req, res, next) => {
  const sql = `
  select max("orderId")
  from "orders"
  `;
  db.query(sql)
    .then(result => {
      if (result.rows[0].max === null) {
        res.status(201).json([{ max: 1 }]);
      } else {

        res.status(201).json(result.rows);
      }
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

app.get('/api/currentOrder/:localStorageId', (req, res, next) => {
  const orderId = req.params.localStorageId;
  if (orderId === undefined || orderId.length < 0) {
    throw new ClientError(400, 'Local Storage Id is a required field');
  }
  const sql = `
  select *
  from "orderItems"
  join "inventory" using ("itemId")
  where "orderId" = $1
  `;
  const params = [orderId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.patch('/api/deleteItem', (req, res, next) => {
  const orderItemsId = parseFloat(req.body.orderItemsId, 10);
  if (!Number.isInteger(orderItemsId) || orderItemsId === undefined) {
    throw new ClientError(401, 'Order Items Id is a required field');
  }
  const sql = `
  delete from "orderItems"
  where "orderItemsId" = $1
  returning *
  `;
  const params = [orderItemsId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });

});

app.patch('/api/orders/complete', (req, res, next) => {
  const orderId = parseInt(req.body.orderId, 10);
  if (!Number.isInteger(orderId) || orderId < 0) {
    throw new ClientError(400, 'OrderId must be a positive integer');
  }
  const sql = `
  update "orders"
  set "isComplete" = 'true'
  where "orderId" = $1
  returning *
  `;
  const params = [orderId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

app.post('/api/customers/orders', (req, res, next) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const phone = req.body.phone.toString();
  const currentOrder = req.body.orderId;
  const total = req.body.total;
  const orderArray = req.body.orderArray;
  let newCustomerId = null;
  const isNotComplete = false;

  if (!lastName || !firstName || !phone) {
    throw new ClientError(400, 'firstName, lastName and phone are required fields');
  }
  if (phone.length < 7) {
    throw new ClientError(401, 'Phone must be at least 7 numbers in length');
  }
  const sql = `
  insert into "customers" ("firstName","lastName","phone")
  values ($1,$2,$3)
  returning "customerId"
`;
  const params = [firstName, lastName, phone];
  db.query(sql, params)
    .then(result => {
      newCustomerId = result.rows[0].customerId;
      const postsql = `
  insert into "orders" ("orderId","customerId","isComplete","total","orderArray")
  values ($1,$2,$3,$4,$5)
  returning *
  `;
      const postParams = [currentOrder, newCustomerId, isNotComplete, total, orderArray];
      db.query(postsql, postParams)
        .then(result => {

          res.status(201).json(result.rows);
        }).catch(err => {
          console.error(err);
          next(err);
        });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

app.patch('/api/category/updateItem', (req, res, next) => {
  const itemId = parseInt(req.body.itemId, 10);
  if (!Number.isInteger(itemId) || itemId < 0) {
    throw new ClientError(400, 'Item Id must be a positive integer');
  }
  const { name, description } = req.body;
  const price = parseInt(req.body.price, 10);
  const stock = parseInt(req.body.stock, 10);
  if (!name || !description || !price || !stock || !Number.isInteger(price) || !Number.isInteger(stock)) {
    throw new ClientError(400, 'Name, Description, Price and Stock are Required Fields');
  }
  const sql = `
update "inventory"
set "name" = $1, "description" = $2, "price" = $3, "stock" = $4
where "itemId" = $5
returning *
`;
  const params = [name, description, price, stock, itemId];
  db.query(sql, params)
    .then(result => {
      const updatedRow = result.rows;
      if (updatedRow.length === 0) {
        throw new ClientError(404, `Cannot find itemId with the Id ${itemId}`);
      } else {
        res.status(201).json(updatedRow);
      }
    })
    .catch(err => next(err));
});

app.get('/api/getDirections', (req, res, next) => {
  const sql = `
   select *
   from "directions"
   `;
  db.query(sql)
    .then(result => { res.status(201).json(result.rows); }
    )
    .catch(err => next(err));
});

app.get('/api/getAll/orders', (req, res, next) => {
  const sql = `
  select *
  from "orders"
  join "customers" using("customerId")
  where "isComplete" = 'false'
  `;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/newUser', (req, res, next) => {
  const sql = `
  insert into "orders" ("customerId","isComplete","total","orderArray")
  values  ('989','false','20',ARRAY ['{"itemId":43,"orderId":3,"orderItemsId":13,"type":"Cofee(Ice)","name":"Honey Almond Milk Cold Brew","description":"Cold Brew lightly sweetened with honey and topped off with almond milk for a balanced taste in every delicious sip.","price":5,"stock":900,"img":"https://globalassets.starbucks.com/assets/21f012c25a714d81b211a19094fb90cc.jpg?impolicy=1by1_wide_1242"}','{"itemId":44,"orderId":3,"orderItemsId":14,"type":"Cofee(Ice)","name":"Irish Cream Cold Brew","description":"Everything and more you ever wanted in a sippable, dreamy holiday drink: Starbucks® Cold Brew swirled with Irish cream syrup, and then topped with a cloud of vanilla sweet cream cold foam and a hint of cocoa.","price":6,"stock":560,"img":"https://globalassets.starbucks.com/assets/3abfc4b26c144afd9dd4eec001f0f252.jpg?impolicy=1by1_wide_1242"}','{"itemId":52,"orderId":3,"orderItemsId":15,"type":"Cofee(Ice)","name":"Honey Almond Milk Nitro Cold Brew","description":"Nitro Cold Brew lightly sweetened with honey and topped off with almond milk for a balanced taste of energy throughout.","price":5,"stock":750,"img":"https://globalassets.starbucks.com/assets/4e0fc8e18163403dbecc55d465ccab95.jpg?impolicy=1by1_wide_1242"}','{"itemId":95,"orderId":3,"orderItemsId":16,"type":"Breakfast","name":"Potato, Cheddar & Chive Bake","description":"A mixture of potatoes, Cheddar cheese, spinach, onions and a touch of chives with cage-free eggs baked until golden brown. This combination of protein and carbs: a savory all-in-one meal sure to take you to your happy place.","price":4,"stock":850,"img":"https://globalassets.starbucks.com/assets/e7c85116cb934a76bb809c191fe03b5d.jpg?impolicy=1by1_wide_1242"}']),
  ('299','false','18',ARRAY ['{"itemId":2,"orderId":4,"orderItemsId":17,"type":"Coffee","name":"Blonde Roast","description":"Lightly roasted coffee that''s soft, mellow and flavorful. Easy-drinking on its own and delicious with milk, sugar or flavored with vanilla, caramel or hazelnut.","price":5,"stock":1000,"img":"https://globalassets.starbucks.com/assets/abb4f97948c948c28ea2dcaf933c4f6b.jpg?impolicy=1by1_wide_1242"}','{"itemId":4,"orderId":4,"orderItemsId":18,"type":"Coffee","name":"Dark Roast Coffee","description":"This full-bodied dark roast coffee with bold, robust flavors showcases our roasting and blending artistry—an essential blend of balanced and lingering flavors.","price":5,"stock":600,"img":"https://globalassets.starbucks.com/assets/0279f9c5fa5941d2a65dd183d7a0b386.jpg?impolicy=1by1_wide_1242"}','{"itemId":37,"orderId":4,"orderItemsId":20,"type":"Tea","name":"Emperor’s Tea","description":"This gently smoky, softly sweet green tea—cultivated at 3,500 feet and shrouded in ethereal clouds and mist—is tasty no matter what language you say it in.","price":4,"stock":800,"img":"https://globalassets.starbucks.com/assets/1a84d455abd84ac3b356c6523fce9ac8.jpg?impolicy=1by1_wide_1242"}','{"itemId":38,"orderId":4,"orderItemsId":19,"type":"Tea","name":"Matcha Green Tea Latte","description":"Smooth and creamy matcha sweetened just right and served with steamed milk. This favorite will transport your senses to pure green delight.","price":4,"stock":650,"img":"https://globalassets.starbucks.com/assets/8b1b6d808cca4787afd2b30cf8dd5676.jpg?impolicy=1by1_wide_1242"}']),
  ('3999','false','12', ARRAY ['{"itemId":41,"orderId":5,"orderItemsId":24,"type":"Tea","name":"Mint Majesty","description":"A blend of mint and a pinch of lemon verbena creates a refreshing flavor that''s supercool for a caffeine-free herbal tea.","price":5,"stock":680,"img":"https://globalassets.starbucks.com/assets/cf7469c84a444e4f9a341f8023558c77.jpg?impolicy=1by1_wide_1242"}','{"itemId":42,"orderId":5,"orderItemsId":23,"type":"Tea","name":"Peach Tranquility","description":"A sweet fusion of peach, candied pineapple, chamomile blossoms, lemon verbena and rose hips come together in this caffeine-free herbal tea. Sip back and relax.","price":5,"stock":985,"img":"https://globalassets.starbucks.com/assets/f3ecda7d7510434c9ed2b3167dcb4466.jpg?impolicy=1by1_wide_1242"}','{"itemId":104,"orderId":5,"orderItemsId":25,"type":"Bakery","name":"Plain Bagel","description":"Our classic soft, chewy and thick New York–style bagel: whether toasted or not, or with a smear of cream cheese or not, each bite tastes of authentic-baked goodness.","price":2,"stock":950,"img":"https://globalassets.starbucks.com/assets/2362e79aa0ab4c37a930956c67ab557a.jpg?impolicy=1by1_wide_1242"}'])
  `;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {

});
