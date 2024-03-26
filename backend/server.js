import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';

const salt = 10;
// const upload = multer({ dest: 'uploads/' });

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
                req.id = decoded.id;
                next()
            }
        })
    }
}

app.get('/', verifyUser, (req,res)=>{
    return res.json({Status: "Success", name: req.name, id:req.id});
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

///////////////profile

// app.get('/profil/:name', (req, res) => {
//     const name = req.params.name; // Use req.params to get the parameter from the URL
//     const sql = "SELECT id FROM login WHERE name = ?";
//     db.query(sql, [name], (err, result) => {
//         if (err) {
//             console.error('Error querying the database:', err);
//             return res.json({ Status: false, Error: "Query Error" });
//         }
//         if (result.length === 0) {
//             return res.json({ Status: false, Error: "User not found" });
//         }
//         // Assuming the result is an array with a single object containing the user ID
//         const userId = result[0].id;
//         return res.json({ Status: true, UserId: userId });
//     });
// });
app.get('/profil/:name', (req, res) => {
    const name = req.params.name; // Use req.params to get the parameter from the URL
    const sql = "SELECT id, image FROM login WHERE name = ?";
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.json({ Status: false, Error: "Query Error" });
        }
        if (result.length === 0) {
            return res.json({ Status: false, Error: "User not found" });
        }
        // Assuming the result is an array with a single object containing the user ID and image
        const user = result[0];
        const userId = user.id;
        const image = user.image;
        return res.json({ Status: true, UserId: userId, Image: image });
    });
});


app.get('/profile/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM login WHERE id = ?";
    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

app.put('/profile/edit/:id',uploadImage.single('image'), (req, res) => {
    const id = req.params.id;
    const { name } = req.body; 
    let image = req.file ? req.file.filename : '';
    const sql = `UPDATE login 
        SET name = ?, image = ? 
        WHERE id = ?`;
    db.query(sql, [name, image, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err});
        return res.json({Status: true, Result: result});
    });
});


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

app.get('/cat_count', (req, res) => {
    const sql = "select count(id) as nbCat from categories";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

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
    const { id, name } = req.query;
    let sql = "SELECT * FROM categories WHERE 1";

    if (id) { sql += ` AND id = '${id}'`;}
    if (name) { sql += ` AND name LIKE '%${name}%'`;}

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
    const { id, name, category, supplier } = req.query;
    let sql = "SELECT * FROM products WHERE 1";

    if (id) {
        sql += ` AND Code_Product = '${id}'`;
    }
    if (name) {
        sql += ` AND name LIKE '%${name}%'`;
    }
    if (category) {
        sql += ` AND Categorie LIKE '%${category}%'`;
    }
    if (supplier) {
        const getSupplierCodeSql = "SELECT Code_Supplier FROM suppliers WHERE Name = ?";
        db.query(getSupplierCodeSql, [supplier], (err, result) => {
            if (err || result.length === 0) {
                return res.status(400).json({ Error: 'Supplier not found' });
            }
            const supplierCode = result[0].Code_Supplier;
            sql += ` AND Code_Supplier = '${supplierCode}'`;

            db.query(sql, (err, result) => {
                if (err) return res.status(500).json({ Error: 'Error searching for products' });
                return res.json({ result });
            });
        });
        return;
     }

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

app.post('/suppliers/create', uploadImage.single('image'), (req, res) => {
    const sql = "INSERT INTO Suppliers (`Name`, `Phone`, `Email`, `Adresse`, `Company`,`image`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.Name,
        req.body.Phone,
        req.body.Email,
        req.body.Adresse,
        req.body.Company,
        req.file.path 
    ];
    db.query(sql, values, (err, result) => {
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


app.put('/suppliers/edit/:id', verifyUser, uploadImage.single('image'), (req, res) => {
    const id = req.params.id;
    const { Name, Phone, Email, Adresse, Company } = req.body;
    let image = req.file ? req.file.path : null;
    // Update the supplier in the database
    const sql = "UPDATE Suppliers SET Name=?, Phone=?, Email=?, Adresse=?, Company=? , image=? WHERE Code_Supplier=?";
    db.query(sql, [Name, Phone, Email, Adresse, Company, image, id], (err, result) => {
        if (err) {
            console.error('Error updating supplier:', err);
            return res.status(500).json({ error: 'Error updating supplier' });
        }
        return res.status(200).json({ message: 'Supplier updated successfully' });
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

app.get('/supp_count', (req, res) => {
    const sql = "select count(Code_Supplier) as nbSupp from suppliers";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

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
/////////////////Employees
app.get("/employes",verifyUser, (req, res) => {
    const sql = "SELECT * FROM Employes";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

app.get('/employee_count', (req, res) => {
    const sql = "select count(Code_Employee) as employee from Employes";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

app.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from Employes";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

app.post('/employes/create', uploadImage.single('image'), (req, res) => {
    const { name, email, password, address, salary, type_id } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const newEmployee = {
        Name: name,
        Email: email,
        Phone: password,
        Adresse: address,
        salary: salary,
        image: imagePath,
        type_id: type_id
    };
    const sql = "INSERT INTO employes SET ?";
    
    db.query(sql, newEmployee, (err, result) => {
        if (err) {
            console.error("Error creating employee:", err);
            return res.json({ Status: false, Error: "Error creating employee" });
        }
        return res.json({ Status: true, Message: "Employee created successfully" });
    });
});

app.put('/employes/edit/:id', uploadImage.single('image'), (req, res) => {
    const id = req.params.id;
    const { Name, Email, Phone, Adresse, salary, type_id } = req.body;
    let image = req.file ? req.file.path : null;
    const sql = `UPDATE employes 
        set Name = ?, Email = ?, Phone= ? , salary = ?, Adresse = ?, type_id = ? ,image = ?
        Where Code_Employee = ?`
        const values = [Name, Email, Phone, Adresse, salary, type_id, image, id];
    db.query(sql,values, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

app.get('/employes/:id', verifyUser, (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employes WHERE Code_Employee = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});


app.get('/employees/search', (req, res) => {
    const { code, name , salary} = req.query;
    let sql = "SELECT * FROM Employes WHERE 1";

    if (code) {
        sql += ` AND Code_Employee = '${code}'`;
    }
    if (name) {
        sql += ` AND Name LIKE '%${name}%'`;
    }
    if (salary) {
        sql += ` AND salary LIKE '${salary}'`;
    }

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error searching for employees:", err);
            return res.status(500).json({ Status: false, Error: "Error searching for employees" });
        }
        return res.json({ Status: true, result });
    });
});

////////////////types
// Route to get all types
app.get('/employees/types', (req, res) => {
    const sql = "SELECT * FROM types";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

app.delete('/employes/types/delete/:id', verifyUser, (req, res) => {
    const sql = "DELETE FROM types WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error deleting supplier" });
        return res.json({ result });
    });
});

app.get('/employees/types/search', (req, res) => {
    const { name } = req.query;
    let sql = "SELECT * FROM types WHERE 1";

    if (name) {
        sql += ` AND name LIKE '%${name}%'`;
    }

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error searching for employees:", err);
            return res.status(500).json({ Status: false, Error: "Error searching for employees" });
        }
        return res.json({ Status: true, result });
    });
});

// Route to get a specific type by ID
app.get('/employees/types/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM types WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

// Route to edit a type
app.put('/employees/types/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const sql = "UPDATE types SET `name`=? WHERE id = ?";
    db.query(sql, [name, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

app.post('/types/create', (req, res) => {
    const { name, created_date } = req.body;
    const sql = "INSERT INTO types (`name`, `created_date`) VALUES (?, ?)";
    db.query(sql, [name, created_date], (err, result) => {
        if (err) {
            console.error('Error creating type:', err);
            return res.status(500).json({ error: 'Error creating type' });
        }
        return res.status(200).json({ message: 'Type created successfully' });
    });
});

app.get('/types_count', (req, res) => {
    const sql = "select count(id) as nbType from types";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

// Export the Express app
export default app;
//////////////
app.listen(8081, () => {
    console.log("Server is running ...");
  });

