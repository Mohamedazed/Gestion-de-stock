import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';

const salt = 10;
const upload = multer({ dest: 'uploads/' });

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
//////
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadImage = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));
/////
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

app.delete('/delete/:id',verifyUser , (req, res) => {
    const sql = "DELETE FROM categories WHERE id = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json({ result });
    })
});

// Route to search categories by ID and name
app.get('/categories/search', verifyUser, (req, res) => {
    // Extract ID and name from query parameters
    const { id, name } = req.query;
    
    // SQL query to search for categories
    let sql = "SELECT * FROM categories WHERE 1";

    // Check if ID parameter is provided
    if (id) {
        sql += ` AND id = '${id}'`;
    }
    // Check if name parameter is provided
    if (name) {
        sql += ` AND name LIKE '%${name}%'`;
    }

    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error searching for categories" });
        return res.json({ result });
    });
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
app.post('/products/create', uploadImage.single('productImage'), (req, res) => {
    const { name, category, price, quantity, supplier } = req.body;
    const productImage = req.file.path; // Path to the uploaded file

    // Fetch the code_supplier based on the supplier's name
    const getSupplierCodeSql = "SELECT Code_Supplier FROM suppliers WHERE Name = ?";
    db.query(getSupplierCodeSql, [supplier], (err, result) => {
        if (err) {
            console.error('Error fetching supplier code:', err);
            return res.status(500).json({ error: 'Error creating product' });
        }
        
        // Check if the supplier exists
        if (result.length === 0) {
            return res.status(400).json({ error: 'Supplier not found' });
        }

        const codeSupplier = result[0].Code_Supplier;

        // Insert the product into the database
        const insertProductSql = "INSERT INTO products (`name`, `categorie`, `prix`, `quantite`, `code_supplier`, `date_ajout`, `product_image`) VALUES (?, ?, ?, ?, ?, NOW(), ?)";
        const values = [name, category, price, quantity, codeSupplier, productImage];

        db.query(insertProductSql, values, (err, result) => {
            if (err) {
                console.error('Error creating product:', err);
                return res.status(500).json({ error: 'Error creating product' });
            }
            return res.status(200).json({ message: 'Product created successfully' });
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

// // Route to edit a product
app.put('/products/edit/:id', verifyUser, (req, res) => {
    const id = req.params.id;
    const values = [
        req.body.name,
        req.body.Categorie,
        req.body.Prix,
        req.body.Quantite,
        req.body.supplierName,
        id
    ];
    
    // Fetch the supplier's code based on the supplier's name
    const getSupplierCodeSql = "SELECT Code_Supplier FROM suppliers WHERE Name = ?";
    db.query(getSupplierCodeSql, [req.body.supplierName], (err, supplierResult) => {
        if (err) return res.json({ Error: "Error fetching supplier code" });
        
        // Ensure that a supplier code is found
        if (supplierResult.length === 0) {
            return res.status(400).json({ Error: "Supplier not found" });
        }
        
        // Extract the supplier code from the result
        const supplierCode = supplierResult[0].Code_Supplier;

        // Update the product record with the new details
        const updateProductSql = "UPDATE products SET `name`=?, `categorie`=?, `prix`=?, `quantite`=?, `Code_Supplier`=? WHERE Code_Product = ?";
        db.query(updateProductSql, [...values.slice(0, 4), supplierCode, ...values.slice(5)], (err, result) => {
            if (err) return res.json({ Message: "Error updating product" });
            return res.json({ result });
        });
    });
});
// app.put('/products/edit/:id', verifyUser, uploadImage.single('productImage'), (req, res) => {
//     const id = req.params.id;
//     const values = [
//         req.body.name,
//         req.body.categorie,
//         req.body.prix,
//         req.body.quantite,
//         req.body.supplier,
//         id
//     ];

//     let updateProductSql;
//     let sqlParams;

//     if (req.file) {
//         // If a new image is uploaded
//         updateProductSql = "UPDATE products SET `name`=?, `categorie`=?, `prix`=?, `quantite`=?, `Code_Supplier`=?, `Product_Image`=? WHERE Code_Product = ?";
//         sqlParams = [...values.slice(0, 4), req.file.path, ...values.slice(5)];
//     } else {
//         // If no new image is uploaded
//         updateProductSql = "UPDATE products SET `name`=?, `categorie`=?, `prix`=?, `quantite`=?, `Code_Supplier`=? WHERE Code_Product = ?";
//         sqlParams = [...values.slice(0, 4), ...values.slice(5)];
//     }

//     // Fetch the supplier's code based on the supplier's name
//     const getSupplierCodeSql = "SELECT Code_Supplier FROM suppliers WHERE Name = ?";
//     db.query(getSupplierCodeSql, [req.body.supplier], (err, supplierResult) => {
//         if (err) return res.json({ Error: "Error fetching supplier code" });

//         // Ensure that a supplier code is found
//         if (supplierResult.length === 0) {
//             return res.status(400).json({ Error: "Supplier not found" });
//         }

//         // Extract the supplier code from the result
//         const supplierCode = supplierResult[0].Code_Supplier;

//         // Update the product record with the new details
//         db.query(updateProductSql, [...sqlParams.slice(0, 4), supplierCode, ...sqlParams.slice(5)], (err, result) => {
//             if (err) return res.json({ Message: "Error updating product" });
//             return res.json({ result });
//         });
//     });
// });

// Delete a product
app.delete('/products/delete/:id', verifyUser, (req, res) => {
    const sql = "DELETE FROM products WHERE Code_Product = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

// Route to search products by ID, name, category, and supplier
app.get('/products/search', verifyUser, (req, res) => {
    // Extract parameters from query string
    const { id, name, category, supplier } = req.query;

    // SQL query to search for products
    let sql = "SELECT * FROM products WHERE 1";

    // Check if id parameter is provided
    if (id) {
        sql += ` AND Code_Product = '${id}'`;
    }
    // Check if name parameter is provided
    if (name) {
        sql += ` AND name LIKE '%${name}%'`;
    }
    // Check if category parameter is provided
    if (category) {
        sql += ` AND Categorie LIKE '%${category}%'`;
    }
    // Check if supplier parameter is provided
    if (supplier) {
        // Fetch the Code_Supplier based on the supplier's name
        const getSupplierCodeSql = "SELECT Code_Supplier FROM suppliers WHERE Name = ?";
        db.query(getSupplierCodeSql, [supplier], (err, result) => {
            if (err || result.length === 0) {
                return res.status(400).json({ Error: 'Supplier not found' });
            }
            const supplierCode = result[0].Code_Supplier;
            sql += ` AND Code_Supplier = '${supplierCode}'`;

            // Execute the final query
            db.query(sql, (err, result) => {
                if (err) return res.status(500).json({ Error: 'Error searching for products' });
                return res.json({ result });
            });
        });
        return; // Return to avoid executing the final query outside the callback
    }

    // Execute the final query if no supplier parameter is provided
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Error: 'Error searching for products' });
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

// Route to search suppliers by code and name
app.get('/suppliers/search', verifyUser, (req, res) => {
    // Extract code and name from query parameters
    const { code, name } = req.query;
    
    // SQL query to search for suppliers
    let sql = "SELECT * FROM Suppliers WHERE 1";

    // Check if code parameter is provided
    if (code) {
        sql += ` AND Code_Supplier = '${code}'`;
    }
    // Check if name parameter is provided
    if (name) {
        sql += ` AND Name LIKE '%${name}%'`;
    }

    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error searching for suppliers" });
        return res.json({ result });
    });
});


// Export the Express app
export default app;
//////////////
app.listen(8081, () => {
    console.log("Server is running ...");
  });

