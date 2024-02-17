import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const salt = 10;

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

app.options('*', cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stock_management',
  });

const verifyUser = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "You are not authentificated"});
    }else{
        jwt.verify(token, "jwt-secret-key", (err, decoded)=>{
            if(err){
                return res.json({Error: "Token is not okey"});
            }else{
                req.name = decoded.name;
                next()
            }
        })
    }
}

app.get('/', verifyUser, (req,res)=>{
    return res.json({Status: "Success", name: req.name});
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash)=>{
        if(err) return res.json({Error: "Error for hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.json({ Error: 'Inserting data Error in server' });
              }
              return res.json({ Status: 'Success' });
        })
    })
    })

app.post('/login', (req, res)=>{
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data)=>{
        if(err) return res.json({Error: "Login error in server"});
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response)=>{
                if(err) return res.json({Error: "Password compare error"});
                if(response){
                    const name = data[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                }else{
                    return res.json({Error: "Password not matched"});
                }
            })
        }else{
            return res.json({Error: "No email existed"});
        }
    })
})

app.get('/logout', (req,res)=>{
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

// //////////////categories

app.get('/categories', verifyUser, (req, res) => {
    const sql = "SELECT * FROM categories";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json({ result });
    })
    
});

app.post('/categories/create', (req, res)=>{
    const sql = "INSERT INTO categories (`name`,`created_date`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.created_date
    ]
    db.query(sql, [values], (err, result)=>{
        if(err) return res.json({err});
        return res.json({ result });
    })
})
app.get('/show/:id', verifyUser, (req, res) => {
    const sql = "SELECT * FROM categories WHERE id = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json({ result });
    })
});

app.put('/edit/:id', verifyUser, (req, res) => {
    const sql = "UPDATE categories SET `name`=?, `created_date`=? WHERE id = ?";
    const id = req.params.id;

    db.query(sql,[req.body.name, req.body.created_date, id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json({ result });
    })
});

app.delete('/delete/:id' , (req, res) => {
    const sql = "DELETE FROM categories WHERE id = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json({ result });
    })
});
///////////////products
// Get all products
app.get('/products',verifyUser, (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

// Create a new product
app.post('/products/create', verifyUser, (req, res) => {
    const { name, category, price, quantity, supplier, created_date, Product_Image } = req.body;

    // First, fetch the supplier's code based on the supplier's name
    const getSupplierCodeSql = "SELECT Code_Supplier FROM suppliers WHERE Name = ?";
    db.query(getSupplierCodeSql, [supplier], (err, supplierResult) => {
        if (err) return res.json({ Error: "Error fetching supplier code" });
        const supplierCode = supplierResult[0].Code_Supplier;

        // Next, insert the new product into the database
        const insertProductSql = "INSERT INTO products (`name`, `categorie`, `prix`, `quantite`, `Code_Supplier`, `Date_Ajout`, `Product_Image`) VALUES (?)";
        const values = [name, category, price, quantity, supplierCode, created_date,Product_Image];
        db.query(insertProductSql, values, (err, result) => {
            if (err) return res.json({ Error: "Error creating product" });
            return res.json({ Status: 'Success' });
        });
    });
});


// Get a specific product by ID
app.get('/products/show/:id', verifyUser, (req, res) => {
    const sql = `
        SELECT p.*, s.Name as supplierName 
        FROM products p
        JOIN suppliers s ON p.Code_Supplier = s.Code_Supplier
        WHERE p.Code_Product = ?
    `;
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

// Route to edit a product
app.put('/products/edit/:id', verifyUser, (req, res) => {
    const productId = req.params.id;
    const { name, category, price, quantity, supplier } = req.body;

    // First, fetch the supplier's code based on the supplier's name
    const getSupplierCodeSql = "SELECT Code_Supplier FROM suppliers WHERE Name = ?";
    db.query(getSupplierCodeSql, [supplier], (err, supplierResult) => {
        if (err) return res.json({ Error: "Error fetching supplier code" });
        const supplierCode = supplierResult[0].Code_Supplier;

        // Next, update the product record with the new details
        const updateProductSql = `
            UPDATE products 
            SET name=?, categorie=?, prix=?, quantite=?, Code_Supplier=?
            WHERE Code_Product=?
        `;
        const values = [name, category, price, quantity, supplierCode, productId];
        db.query(updateProductSql, values, (err, result) => {
            if (err) return res.json({ Error: "Error updating product" });
            return res.json({ Status: 'Success' });
        });
    });
});



// Delete a product
app.delete('/products/delete/:id', verifyUser, (req, res) => {
    const sql = "DELETE FROM products WHERE Code_Product = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});
////////////////suppliers
// Route to get all suppliers
app.get('/suppliers', verifyUser, (req, res) => {
    const sql = "SELECT * FROM Suppliers";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

// Route to create a new supplier
app.post('/suppliers/create', (req, res) => {
    const sql = "INSERT INTO Suppliers (`Name`, `Phone`, `Email`, `Adresse`, `Company`) VALUES (?)";
    const values = [
        req.body.Name,
        req.body.Phone,
        req.body.Email,
        req.body.Adresse,
        req.body.Company
    ];
    db.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: "Error creating supplier" });
        return res.json({ result });
    });
});

app.get('/suppliers/show/:id', verifyUser, (req, res) => {
    const sql = "SELECT * FROM Suppliers WHERE Code_Supplier = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

app.put('/suppliers/edit/:id', verifyUser, (req, res) => {
    const sql = "UPDATE Suppliers SET `Name`=?, `Phone`=?, `Email`=?, `Adresse`=?, `Company`=? WHERE Code_Supplier = ?";
    const id = req.params.id;
    const values = [
        req.body.Name,
        req.body.Phone,
        req.body.Email,
        req.body.Adresse,
        req.body.Company,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: "Error updating supplier" });
        return res.json({ result });
    });
});

app.delete('/suppliers/delete/:id', verifyUser, (req, res) => {
    const sql = "DELETE FROM Suppliers WHERE Code_Supplier = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error deleting supplier" });
        return res.json({ result });
    });
});

// Export the Express app
export default app;


//////////////
  


app.listen(8081, () => {
    console.log("Server is running ...");
  });