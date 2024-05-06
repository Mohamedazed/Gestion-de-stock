// import express from 'express';
// import bcrypt from 'bcrypt';
// import db from "../utils/db.js";
// import jwt from 'jsonwebtoken';

// const router = express.Router();
// const saltRounds = 10;

// router.post('/signupEmployee', (req, res) => {
//     const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";

//     bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
//         if (err) return res.json({ Error: "Error hashing password" });
//         const values = [
//             req.body.name,
//             req.body.email,
//             hash
//         ];

//         db.query(sql, [values], (err, result) => {
//             if (err) {
//                 console.error('Database error:', err);
//                 return res.json({ Error: 'Error inserting data' });
//             }
//             return res.json({ Status: 'Success' });
//         });
//     });
// });

// // router.post('/signupEmployee', (req, res) => {
// //     const { name, email, password } = req.body;
// //     if (!name || !email || !password) {
// //         return res.status(400).json({ Status: 'Error', Error: 'Missing required fields' });
// //     }
// //     bcrypt.hash(password, saltRounds, (err, hash) => {
// //         if (err) {
// //             console.log(err);
// //             res.status(500).json({ Status: 'Error', Error: 'Error hashing password' });
// //         } else {
// //             db.query(
// //                 'INSERT INTO employes (Name, Email, salary) VALUES (?, ?, ?)',
// //                 [name, email, 0], // Set default salary to 0, you may change it as needed
// //                 (error, result) => {
// //                     if (error) {
// //                         console.log(error);
// //                         res.status(500).json({ Status: 'Error', Error: 'Error creating employee account' });
// //                     } else {
// //                         db.query(
// //                             'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
// //                             [name, email, hash],
// //                             (error, result) => {
// //                                 if (error) {
// //                                     console.log(error);
// //                                     res.status(500).json({ Status: 'Error', Error: 'Error creating user account' });
// //                                 } else {
// //                                     res.status(201).json({ Status: 'Success', Message: 'Employee account created successfully' });
// //                                 }
// //                             }
// //                         );
// //                     }
// //                 }
// //             );
// //         }
// //     });
// // });
// router.get('/Employee', (req, res) => {
//     const sql = 'SELECT * FROM users';    db.query(sql, (err, result) => {
//         if(err) return res.json({Message: "Error inside server"});
//         return res.json({ result });
//     })
    
// });


// // router.post("/loginEmployee", (req, res) => {
// //     const { email, password } = req.body;
// //     if (!email || !password) {
// //         return res.status(400).json({ Status: 'Error', Error: 'Email and password are required' });
// //     }
// //     const sql = 'SELECT * FROM users WHERE email = ?';
// //     db.query(sql, [email], (err, data) => {
// //         if (err) {
// //             console.error(err);
// //             return res.status(500).json({ Status: 'Error', Error: 'Error retrieving user account' });
// //         }
// //         if (data.length === 0) {
// //             return res.status(404).json({ Status: 'Error', Error: 'User not found' });
// //         }
// //         const hashedPasswordFromDB = data[0].password;
// //         console.log("Received email:", email);
// //         console.log("Received password:", password);
// //         console.log("Hashed password from DB:", hashedPasswordFromDB);
// //         console.log("Length of received password:", password.length);
// //         console.log("Length of hashed password from DB:", hashedPasswordFromDB.length);
// //         if (password === hashedPasswordFromDB) {
// //             const name = data[0].name;
// //             const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
// //             res.cookie('token', token);
// //             return res.json({ Status: 'Success', Message: 'Login successful' });
// //         } else {
// //             return res.status(401).json({ Status: 'Error', Error: 'Incorrect password' });
// //         }
// //     });
// // });


// router.post("/loginEmployee", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     if (!email || !password) {
//         return res.status(400).json({ Error: 'Email and password are required' });
//     }

//     const sql = 'SELECT * FROM users WHERE email = ?';
//     db.query(sql, [email], async (err, data) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ Error: 'Error retrieving user account' });
//         }

//         if (data.length === 0) {
//             return res.status(404).json({ Error: 'User not found' });
//         }

//         const hashedPasswordFromDB = data[0].password;

//         bcrypt.compare(password, hashedPasswordFromDB, (compareErr, result) => {
//             if (compareErr) {
//                 console.error('Comparison error:', compareErr);
//                 return res.status(500).json({ Error: 'Error comparing passwords' });
//             }

//             console.log("Received password:", password);
//             console.log("Hashed password from DB:", hashedPasswordFromDB);
//             console.log("Comparison result:", result);

//             if (result) {
//                 const name = data[0].name;
//                 const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
//                 res.cookie('token', token);
//                 return res.json({ Status: 'Success', Message: 'Login successful' });
//             } else {
//                 return res.status(401).json({ Error: 'Incorrect password' });
//             }
//         });
//     });
// });



// export { router as EmployeeRouter };

// EmployeRoute.js

import express from 'express';
import db from "../utils/db.js";
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';

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

// router.post('/signupEmployee', (req, res) => {
//     const { name, email, password } = req.body;

//     // Check if all required fields are provided
//     if (!name || !email || !password) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     // Insert employee data into the 'employes' table
//     const sql1 = "INSERT INTO employes (Name, Email, salary) VALUES (?, ?, ?)";
//     db.query(sql1, [name, email, 0], (err1, result1) => {
//         if (err1) {
//             console.error('Error inserting data into employes table:', err1);
//             return res.status(500).json({ error: 'Error inserting data' });
//         }

//         // Insert user data into the 'users' table
//         const sql2 = "INSERT INTO users (`name`, `email`, `password`) VALUES (?, ?, ?)";
//         db.query(sql2, [name, email, password], (err2, result2) => {
//             if (err2) {
//                 console.error('Error inserting data into users table:', err2);
//                 return res.status(500).json({ error: 'Error inserting data' });
//             }

//             return res.status(201).json({ status: 'Success' });
//         });
//     });
// });

// router.post("/loginEmployee", (req, res) => {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//         return res.status(400).json({ error: "Email and password are required" });
//     }

//     // Check if the employee exists in the database
//     const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
//     db.query(sql, [email, password], (err, data) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ error: 'Error fetching data' });
//         }

//         if (data.length === 0) {
//             return res.status(404).json({ error: "Employee not found or invalid credentials" });
//         }

//         const user = data[0];
//         return res.status(200).json({ status: "Success",  name: user.name });
//     });
// });

const saltRounds = 10;
 router.post('/signupEmployee', (req, res) => {
     const { name, email, password } = req.body;
     if (!name || !email || !password) {
         return res.status(400).json({ Status: 'Error', Error: 'Missing required fields' });
     }
     bcrypt.hash(password, saltRounds, (err, hash) => {
         if (err) {
             console.log(err);
             res.status(500).json({ Status: 'Error', Error: 'Error hashing password' });
         } else {
             db.query(
                 'INSERT INTO employes (Name, Email, salary) VALUES (?, ?, ?)',
                 [name, email, 0], // Set default salary to 0, you may change it as needed
                 (error, result) => {
                     if (error) {
                         console.log(error);
                         res.status(500).json({ Status: 'Error', Error: 'Error creating employee account' });
                     } else {
                         db.query(
                             'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                             [name, email, hash],
                             (error, result) => {
                                 if (error) {
                                     console.log(error);
                                     res.status(500).json({ Status: 'Error', Error: 'Error creating user account' });
                                 } else {
                                     res.status(201).json({ Status: 'Success', Message: 'Employee account created successfully' });
                                 }
                             }
                         );
                     }
                 }
             );
         }
     });
 });

router.post("/loginEmployee", (req, res) => {
    const sql = "SELECT * from users Where email = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
          const email = result[0].email;
          const token = jwt.sign(
            { name: "users", email: email, id: result[0].id },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie('token', token)
          return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error:"wrong email or password" });
        }
      });
    });

router.post('/logoutEmploye', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});

// Profile routes
router.get('/profile/name/:name', (req, res) => {
    const name = req.params.name;
    const sql = "SELECT id, image FROM users WHERE name = ?";
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
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

router.put('/profile/edit/:id', uploadImage.single('image'), (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    let image = req.file ? req.file.filename : '';
    const sql = `UPDATE users SET name = ?, image = ? WHERE id = ?`;
    db.query(sql, [name, image, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/sale', (req, res) => {
    const sql = "SELECT * FROM sales ORDER BY sale_date DESC LIMIT 5";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ result });
    });
});

// Route to fetch total money of purchases in the last month
router.get('/last_month_purchases_total', (req, res) => {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const startDate = `${lastMonth.getFullYear()}-${(lastMonth.getMonth() + 1).toString().padStart(2, '0')}-01`;
    const endDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-01`;
  
    const sql = `
      SELECT SUM(Quantite*prix_sale) AS totalPurchases
      FROM purchases
      WHERE Date_Ajout >= ? AND Date_Ajout < ?
    `;
    db.query(sql, [startDate, endDate], (err, result) => {
      if (err) {
        console.error('Error fetching total purchases in last month:', err);
        return res.status(500).json({ error: 'Error fetching total purchases in last month' });
      }
      const totalPurchases = result[0].totalPurchases || 0;
      return res.json({ totalPurchases });
    });
  });
  
  // Route to fetch total money of sales in the last month
  router.get('/last_month_sales_total', (req, res) => {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const startDate = `${lastMonth.getFullYear()}-${(lastMonth.getMonth() + 1).toString().padStart(2, '0')}-01`;
    const endDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-01`;
  
    const sql = `
      SELECT SUM(total_price) AS totalSales
      FROM sales
      WHERE sale_date >= ? AND sale_date < ?
    `;
    db.query(sql, [startDate, endDate], (err, result) => {
      if (err) {
        console.error('Error fetching total sales in last month:', err);
        return res.status(500).json({ error: 'Error fetching total sales in last month' });
      }
      const totalSales = result[0].totalSales || 0;
      return res.json({ totalSales });
    });
  });
  

export { router as EmployeeRouter };
