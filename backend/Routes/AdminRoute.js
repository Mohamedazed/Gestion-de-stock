import express from 'express';
import db from "../utils/db.js";
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';

const salt = 10;
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadImage = multer({ storage: storage });



// Signup route
router.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });
        const values = [
            req.body.name,
            req.body.email,
            hash
        ];

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.json({ Error: 'Error inserting data' });
            }
            return res.json({ Status: 'Success' });
        });
    });
});

// Login route
router.post('/login', (req, res)=>{
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

// Logout route
// router.post('/login', (req, res) => {
//     const sql = 'SELECT * FROM login WHERE email = ? ';
//     db.query(sql, [req.body.email], (err, data) => {
//       if (err) {
//         return res.json({ loginStatus: false, Error: "Query error" });
//       }
//       if (data.length > 0) {
//         const email = data[0].email;
//         const token = jwt.sign(
//           { role: "login", email: email, id: data[0].id },
//           "jwt_secret_key",
//           { expiresIn: "1d" }
//         );
//         // Set the token as a cookie
//         res.cookie('token', token);
//         // Send JSON response with login status true
//         return res.json({ loginStatus: true });
//       } else {
//         // Send JSON response with login status false and error message
//         return res.json({ loginStatus: false, Error: "Wrong email or password" });
//       }
//     });
//   });
  

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});

// Profile routes
router.get('/profile/name/:name', (req, res) => {
    const name = req.params.name;
    const sql = "SELECT id, image FROM login WHERE name = ?";
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.json({ Status: false, Error: "Query Error" });
        }
        if (result.length === 0) {
            return res.json({ Status: false, Error: "User not found" });
        }
        const user = result[0];
        const userId = user.id;
        const image = user.image;
        return res.json({ Status: true, UserId: userId, Image: image });
    });
});

router.get('/profile/id/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM login WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

router.put('/profile/edit/:id', uploadImage.single('image'), (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    let image = req.file ? req.file.filename : '';
    const sql = `UPDATE login SET name = ?, image = ? WHERE id = ?`;
    db.query(sql, [name, image, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});

//////////////categories

router.get('/categories', (req, res) => {
    const sql = "SELECT * FROM categories";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json({ result });
    })
    
});

router.post('/categories/create', (req, res)=>{
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
router.get('/show/:id', (req, res) => {
    const sql = "SELECT * FROM categories WHERE id = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json({ result });
    })
});

router.put('/edit/:id', (req, res) => {
    const sql = "UPDATE categories SET `name`=?, `created_date`=? WHERE id = ?";
    const id = req.params.id;

    db.query(sql,[req.body.name, req.body.created_date, id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json({ result });
    })
});

router.get('/cat_count', (req, res) => {
    const sql = "select count(id) as nbCat from categories";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete/:id' , (req, res) => {
    const sql = "DELETE FROM categories WHERE id = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json({ result });
    })
});

// Route to search categories by ID and name
router.get('/categories/search', (req, res) => {
    const { id, name } = req.query;
    let sql = "SELECT * FROM categories WHERE 1";

    if (id) { sql += ` AND id = '${id}'`;}
    if (name) { sql += ` AND name LIKE '%${name}%'`;}

    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error searching for categories" });
        return res.json({ result });
    });
});

router.get("/products-by-category/:categoryName", (req, res) => {
    const { categoryName } = req.params;
    const sql = `
        SELECT p.*, c.name AS category_name 
        FROM products AS p
        INNER JOIN categories AS c ON p.Categorie = c.name
        WHERE c.name = ?`;
    
    db.query(sql, [categoryName], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        
        return res.json({ result });
    });
});



///////////////products
router.get('/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

// router.post('/products/create', uploadImage.single('productImage'), (req, res) => {
//     const { name, category, price, quantity, supplier } = req.body;
//     const productImage = req.file.path; // Path to the uploaded file

//     // Fetch the code_supplier based on the supplier's name
//     const getSupplierCodeSql = "SELECT Code_Supplier FROM suppliers WHERE Name = ?";
//     db.query(getSupplierCodeSql, [supplier], (err, result) => {
//         if (err) {
//             console.error('Error fetching supplier code:', err);
//             return res.status(500).json({ error: 'Error creating product' });
//         }
        
//         // Check if the supplier exists
//         if (result.length === 0) {
//             return res.status(400).json({ error: 'Supplier not found' });
//         }

//         const codeSupplier = result[0].Code_Supplier;

//         // Insert the product into the database
//         const insertProductSql = "INSERT INTO products (`name`, `categorie`, `prix`, `quantite`, `code_supplier`, `date_ajout`, `product_image`) VALUES (?, ?, ?, ?, ?, NOW(), ?)";
//         const values = [name, category, price, quantity, codeSupplier, productImage];

//         db.query(insertProductSql, values, (err, result) => {
//             if (err) {
//                 console.error('Error creating product:', err);
//                 return res.status(500).json({ error: 'Error creating product' });
//             }

//             // Insert a new record into the purchases table
//             const insertPurchaseSql = "INSERT INTO purchases (Code_Product, Categorie, Prix, Quantite, Date_Ajout, Code_Supplier, Product_Image, name, prix_sale, supplier) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)";
//             const purchaseValues = [result.insertId, category, price, quantity, codeSupplier, productImage, name, price, supplier];

//             db.query(insertPurchaseSql, purchaseValues, (err, purchaseResult) => {
//                 if (err) {
//                     console.error('Error creating purchase:', err);
//                     return res.status(500).json({ error: 'Error creating purchase' });
//                 }
//                 return res.status(200).json({ message: 'Product and purchase created successfully' });
//             });
//         });
//     });
// });

router.post('/products/create', uploadImage.single('productImage'), (req, res) => {
    const { name, category, price, quantity, supplier, prix_sale } = req.body;
    const productImage = req.file.path; 

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
        const insertProductSql = "INSERT INTO products (`name`, `categorie`, `prix`, `quantite`, `code_supplier`, `date_ajout`, `product_image`, `prix_sale`) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)";
        const values = [name, category, price, quantity, codeSupplier, productImage, prix_sale];

        db.query(insertProductSql, values, (err, result) => {
            if (err) {
                console.error('Error creating product:', err);
                return res.status(500).json({ error: 'Error creating product' });
            }

            // Insert a new record into the purchases table
            const insertPurchaseSql = "INSERT INTO purchases (Code_Product, Categorie, Prix, Quantite, Date_Ajout, Code_Supplier, Product_Image, name, prix_sale, supplier) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)";
            const purchaseValues = [result.insertId, category, price, quantity, codeSupplier, productImage, name, prix_sale, supplier];

            db.query(insertPurchaseSql, purchaseValues, (err, purchaseResult) => {
                if (err) {
                    console.error('Error creating purchase:', err);
                    return res.status(500).json({ error: 'Error creating purchase' });
                }
                return res.status(200).json({ message: 'Product and purchase created successfully' });
            });
        });
    });
});


// Get a specific product by ID
router.get('/products/show/:id', (req, res) => {
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
// router.put('/products/edit/:id', (req, res) => {
//     const id = req.params.id;
//     const values = [
//         req.body.name,
//         req.body.Categorie,
//         req.body.Prix,
//         req.body.Quantite,
//         req.body.supplierName,
//         id
//     ];
    
//     // Fetch the supplier's code based on the supplier's name
//     const getSupplierCodeSql = "SELECT Code_Supplier FROM suppliers WHERE Name = ?";
//     db.query(getSupplierCodeSql, [req.body.supplierName], (err, supplierResult) => {
//         if (err) return res.json({ Error: "Error fetching supplier code" });
        
//         // Ensure that a supplier code is found
//         if (supplierResult.length === 0) {
//             return res.status(400).json({ Error: "Supplier not found" });
//         }
        
//         // Extract the supplier code from the result
//         const supplierCode = supplierResult[0].Code_Supplier;

//         // Update the product record with the new details
//         const updateProductSql = "UPDATE products SET `name`=?, `categorie`=?, `prix`=?, `quantite`=?, `Code_Supplier`=? WHERE Code_Product = ?";
//         db.query(updateProductSql, [...values.slice(0, 4), supplierCode, ...values.slice(5)], (err, result) => {
//             if (err) return res.json({ Message: "Error updating product" });
//             return res.json({ result });
//         });
//     });
// });

// Route to edit a product
router.put('/products/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, Categorie, Prix, Quantite, prix_sale, supplierName } = req.body;

    // Fetch the supplier's code based on the supplier's name
    const getSupplierCodeSql = "SELECT Code_Supplier FROM suppliers WHERE Name = ?";
    db.query(getSupplierCodeSql, [supplierName], (err, supplierResult) => {
        if (err) {
            console.error('Error fetching supplier code:', err);
            return res.status(500).json({ error: 'Error updating product' });
        }

        // Ensure that a supplier code is found
        if (supplierResult.length === 0) {
            return res.status(400).json({ error: 'Supplier not found' });
        }

        // Extract the supplier code from the result
        const supplierCode = supplierResult[0].Code_Supplier;

        // Update the product record with the new details
        const updateProductSql = "UPDATE products SET `name`=?, `categorie`=?, `prix`=?, `quantite`=?, `Code_Supplier`=?, `prix_sale`=? WHERE Code_Product = ?";
        const values = [name, Categorie, Prix, Quantite, supplierCode, prix_sale, id];

        db.query(updateProductSql, values, (err, result) => {
            if (err) {
                console.error('Error updating product:', err);
                return res.status(500).json({ error: 'Error updating product' });
            }
            
            return res.status(200).json({ message: 'Product updated successfully' });
        });
    });
});


// Delete a product
router.delete('/products/delete/:id', (req, res) => {
    const sql = "DELETE FROM products WHERE Code_Product = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

// Route to search products by ID, name, category, and supplier
router.get('/products/search', (req, res) => {
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

router.get('/prod_count', (req, res) => {
    const sql = "select count(Code_Product) as nbSupp from products";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

////////////////suppliers
// Route to get all suppliers
router.get('/suppliers', (req, res) => {
    const sql = "SELECT * FROM Suppliers";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

router.post('/suppliers/create', uploadImage.single('image'), (req, res) => {
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


router.get('/suppliers/show/:id', (req, res) => {
    const sql = "SELECT * FROM Suppliers WHERE Code_Supplier = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});


router.put('/suppliers/edit/:id', uploadImage.single('image'), (req, res) => {
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

router.delete('/suppliers/delete/:id', (req, res) => {
    const sql = "DELETE FROM Suppliers WHERE Code_Supplier = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error deleting supplier" });
        return res.json({ result });
    });
});

router.get('/supp_count', (req, res) => {
    const sql = "select count(Code_Supplier) as nbSupp from suppliers";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

// Route to search suppliers by code and name
router.get('/suppliers/search', (req, res) => {
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
router.get("/employes", (req, res) => {
    const sql = `
        SELECT e.*, t.name AS type_name 
        FROM employes AS e
        INNER JOIN types AS t ON e.type_id = t.id`;
    
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});


router.get('/employee_count', (req, res) => {
    const sql = "select count(Code_Employee) as employee from Employes";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from Employes";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.post('/employes/create', uploadImage.single('image'), (req, res) => {
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

router.put('/employes/edit/:id', uploadImage.single('image'), (req, res) => {
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

router.get('/employes/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employes WHERE Code_Employee = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

router.delete('/employes/delete/:id', (req, res) => {
    const sql = "DELETE FROM employes WHERE Code_Employee = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

router.get('/employees/search', (req, res) => {
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

router.get('/emp_count', (req, res) => {
    const sql = "select count(Code_Employee) as nbSupp from Employes";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

////////////////types
// Route to get all types
router.get('/employees/types', (req, res) => {
    const sql = "SELECT * FROM types";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

router.get("/types/:id", (req, res) => {
    const typeId = req.params.id;
    const sql = "SELECT name FROM types WHERE id = ?";
    
    db.query(sql, [typeId], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        if (result.length === 0) {
            return res.json({ Message: "Type not found" });
        }
        const typeName = result[0].name;
        return res.json({ type_name: typeName });
    });
});

router.delete('/types/delete/:id', (req, res) => {
    const sql = "DELETE FROM types WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error deleting supplier" });
        return res.json({ result });
    });
});

router.get('/employees/types/search', (req, res) => {
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
router.get('/employees/types/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM types WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

// Route to edit a type
router.put('/employees/types/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const sql = "UPDATE types SET `name`=? WHERE id = ?";
    db.query(sql, [name, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

router.post('/types/create', (req, res) => {
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

router.get('/types_count', (req, res) => {
    const sql = "select count(id) as nbType from types";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employees/by-type/:typeId', (req, res) => {
    const typeId = req.params.typeId;
    const query = `
        SELECT * FROM employes WHERE type_id = ?;
    `;
    db.query(query, [typeId], (err, results) => {
        if (err) {
            console.error('Error fetching employees by type:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ employees: results });
        }
    });
});
//////////////carts

router.get('/cart', (req, res) => {
    const sql = "SELECT * FROM cart";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

// Route to add a product to the cart
router.post('/cart/add', uploadImage.single('image'), (req, res) => {
    const { name, product_id, price, quantity, created_at,image } = req.body;
    // const imagePath = req.file ? req.file.path : null;
    // Check if the product ID and quantity are provided
    if (!product_id || !quantity) {
        return res.status(400).json({ error: 'Product ID, quantity are required' });
    }

    // Check if the product exists
    const getProductSql = "SELECT * FROM products WHERE Code_Product = ?";
    db.query(getProductSql, [product_id], (err, productResult) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ error: 'Error adding product to cart' });
        }

        // Check if the product exists in the database
        if (productResult.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = productResult[0];
        const availableQuantity = product.quantite;

        // Check if the requested quantity exceeds the available quantity
        if (quantity > availableQuantity) {
            return res.status(400).json({ error: 'Requested quantity exceeds available quantity' });
        }
        
        // Insert the product into the cart table
        const insertCartSql = "INSERT INTO cart ( `name`, `product_id`, `price`, `quantity`, `created_at`, `image`) VALUES (?, ?, ?, ?,? , ?)";
        db.query(insertCartSql, [ name, product_id, price, quantity, created_at, image], (err, result) => {
            if (err) {
                console.error('Error adding product to cart:', err);
                return res.status(500).json({ error: 'Error adding product to cart' });
            }
            return res.status(200).json({ message: 'Product added to cart successfully' });
        });
    });
});

router.delete('/cart/delete/:id', (req, res) => {
    const sql = "DELETE FROM cart WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

/////////////sales
router.get('/sale', (req, res) => {
    const sql = "SELECT * FROM sales";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

router.post('/sales', (req, res) => {
    const cartItems = req.body;
  
    // Calculate total price for each product
    cartItems.forEach(item => {
        item.totalPrice = item.quantity * item.price;
    });
    // Loop through each cart item
    cartItems.forEach(item => {
      const { product_id, name, price, quantity, totalPrice } = item;
      const sale_date = new Date().toISOString();
  
      // Insert a new record into the sales table
      db.query('INSERT INTO sales (product_id, name, price, quantity, total_price, sale_date) VALUES (?, ?, ?, ?, ?, ?)', [product_id, name, price, quantity, totalPrice, sale_date], (error, result) => {
        if (error) {
          console.error('Error confirming product:', error);
          return res.status(500).json({ error: 'Error confirming product' });
        }
  
        // Update product quantity in the products table
        db.query('UPDATE products SET Quantite = Quantite - ? WHERE Code_Product = ?', [quantity, product_id], (error, result) => {
          if (error) {
            console.error('Error updating product quantity:', error);
            return res.status(500).json({ error: 'Error updating product quantity' });
          }
  
          // Delete the product from the cart
          db.query('DELETE FROM cart WHERE product_id = ?', [product_id], (error, result) => {
            if (error) {
              console.error('Error deleting product from cart:', error);
              return res.status(500).json({ error: 'Error deleting product from cart' });
            }
          });
        });
      });
    });
  
    res.status(200).json({ message: 'Products confirmed successfully' });
  });

  router.get('/sales/search', (req, res) => {
    const { name } = req.query;
    let sql = "SELECT * FROM sales WHERE 1";

    if (name) {
        sql += ` AND name LIKE '%${name}%'`;
    }

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error searching for sales:", err);
            return res.status(500).json({ Status: false, Error: "Error searching for sales" });
        }
        return res.json({ Status: true, result });
    });
});

router.get('/sales_count', (req, res) => {
    const sql = "select count(id) as nbSupp from sales";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/sale/delete/:id', (req, res) => {
    const sql = "DELETE FROM sales WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

router.get('/top_selling_products/:selectedMonth', (req, res) => {
    const selectedMonth = req.params.selectedMonth;
    const sql = `
      SELECT s.product_id, p.name, SUM(s.quantity) AS totalQuantity, SUM(s.total_price) AS totalSales, p.product_image
      FROM sales s
      JOIN purchases p ON s.product_id = p.Code_Product
      WHERE MONTH(s.sale_date) = ?
      GROUP BY s.product_id
      ORDER BY totalQuantity DESC
      LIMIT 3
    `;
    db.query(sql, [selectedMonth], (err, result) => {
      if (err) {
        console.error('Error fetching top selling products:', err);
        return res.status(500).json({ error: 'Error fetching top selling products' });
      }
      return res.json({ topSellingProducts: result });
    });
  });


router.get('/months', (req, res) => {
    const sql = "SELECT DISTINCT MONTH(sale_date) AS month FROM sales";
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching months:', err);
        return res.status(500).json({ error: 'Error fetching months' });
      }
      const months = result.map(row => row.month);
      return res.json({ months });
    });
  });
  
  router.get('/daily_revenue', (req, res) => {
    const sql = `
      SELECT DATE(sale_date) AS day, SUM(total_price) AS revenue
      FROM sales
      GROUP BY DATE(sale_date)
    `;
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching daily revenue:', err);
        return res.status(500).json({ error: 'Error fetching daily revenue' });
      }
      return res.json({ dailyRevenue: result });
    });
  });  
  
  

////////////////purchases
router.get('/purchases', (req, res) => {
    const sql = "SELECT * FROM purchases";
    db.query(sql, (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

router.get('/purchases/search', (req, res) => {
    const { name } = req.query;
    let sql = "SELECT * FROM purchases WHERE 1";

    if (name) {
        sql += ` AND name LIKE '%${name}%'`;
    }

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Error: 'Error searching for products' });
        return res.json({ result });
    });
});

router.get('/purch_count', (req, res) => {
    const sql = "select count(Code_Product) as nbSupp from purchases";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

////////total
// Products
router.get('/total_products', (req, res) => {
    const sql = "SELECT COUNT(*) AS totalProducts FROM products";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching total products:', err);
            return res.status(500).json({ error: 'Error fetching total products' });
        }
        return res.json({ totalProducts: result[0].totalProducts });
    });
});

// Employees
router.get('/total_employees', (req, res) => {
    const sql = "SELECT COUNT(*) AS totalEmployees FROM employes";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching total employees:', err);
            return res.status(500).json({ error: 'Error fetching total employees' });
        }
        return res.json({ totalEmployees: result[0].totalEmployees });
    });
});

// Sales
router.get('/total_sales', (req, res) => {
    const sql = "SELECT COUNT(*) AS totalSales FROM sales";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching total sales:', err);
            return res.status(500).json({ error: 'Error fetching total sales' });
        }
        return res.json({ totalSales: result[0].totalSales });
    });
});

// Suppliers
router.get('/total_suppliers', (req, res) => {
    const sql = "SELECT COUNT(*) AS totalSuppliers FROM suppliers";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching total suppliers:', err);
            return res.status(500).json({ error: 'Error fetching total suppliers' });
        }
        return res.json({ totalSuppliers: result[0].totalSuppliers });
    });
});


// export default router;
export { router as adminRouter };
