// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer ,LineChart,Line} from 'recharts';
// import { Navbar } from 'keep-react';

// export default function EmpHome() {
 
//   const [auth, setAuth] = useState(false);
//   const [message, setMessage] = useState('');
//   const [Name, setName] = useState('');
//   const location = useLocation();
//   const { state } = location;
//   const name = state ? state.name : '';

//   useEffect(() => {
//     if (name && !Name) {
//       setName(name);
//     }
//   }, [name, Name]);

//   const navigate = useNavigate();

//   const [totalProducts, setTotalProducts] = useState(0);
//   const [totalSales, setTotalSales] = useState(0);
//   const [totalSuppliers, setTotalSuppliers] = useState(0);
//   const [months, setMonths] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [topSellingProducts, setTopSellingProducts] = useState([]);
//   const [dailyRevenue, setDailyRevenue] = useState([]);

//   useEffect(() => {
//     fetchTotalProducts();
//     fetchTotalSales();
//     fetchTotalSuppliers();
//     fetchMonths();
//   }, []);

//   const fetchTotalProducts = () => {
//     axios.get('http://localhost:8081/total_products')
//       .then(response => {
//         setTotalProducts(response.data.totalProducts);
//       })
//       .catch(error => {
//         console.error('Error fetching total products:', error);
//       });
//   };

//   const fetchTotalSales = () => {
//     axios.get('http://localhost:8081/total_sales')
//       .then(response => {
//         setTotalSales(response.data.totalSales);
//       })
//       .catch(error => {
//         console.error('Error fetching total sales:', error);
//       });
//   };

//   const fetchTotalSuppliers = () => {
//     axios.get('http://localhost:8081/total_suppliers')
//       .then(response => {
//         setTotalSuppliers(response.data.totalSuppliers);
//       })
//       .catch(error => {
//         console.error('Error fetching total suppliers:', error);
//       });
//   };

//   useEffect(() => {
//     if (selectedMonth) {
//       fetchTopSellingProducts(selectedMonth);
//     }
//   }, [selectedMonth]);

//   useEffect(() => {
//     // Automatically select the last month when the component mounts
//     if (months.length > 0) {
//       setSelectedMonth(months[months.length - 1]);
//     }
//   }, [months])

//   const fetchMonths = () => {
//     axios.get('http://localhost:8081/months')
//       .then(response => {
//         setMonths(response.data.months);
//       })
//       .catch(error => {
//         console.error('Error fetching months:', error);
//       });
//   };

//   const fetchTopSellingProducts = (selectedMonth) => {
//     axios.get(`http://localhost:8081/top_selling_products/${selectedMonth}`)
//       .then(response => {
//         setTopSellingProducts(response.data.topSellingProducts);
//       })
//       .catch(error => {
//         console.error('Error fetching top selling products:', error);
//       });
//   };

//   useEffect(() => {
//     fetchDailyRevenue();
//   }, []);

//   const fetchDailyRevenue = () => {
//     axios.get('http://localhost:8081/daily_revenue')
//       .then(response => {
//         const formattedData = response.data.dailyRevenue.map(entry => ({
//           day: new Date(entry.day).toLocaleDateString(),
//           revenue: entry.revenue
//         }));
//         setDailyRevenue(formattedData);
//       })
//       .catch(error => {
//         console.error('Error fetching daily revenue:', error);
//       });
//   };

//   const formatNumber = (value) => {
//     if (value >= 1000000) {
//       return `${(value / 1000000).toFixed(1)}M`;
//     } else if (value >= 1000) {
//       return `${(value / 1000).toFixed(1)}K`;
//     } else {
//       return value;
//     }
//   };

//   const formatRevenue = (value) => {
//     if (value >= 1000000) {
//       return `${(value / 1000000).toFixed(1)}M DH`;
//     } else if (value >= 1000) {
//       return `${(value / 1000).toFixed(1)}K DH`;
//     } else {
//       return `${value} DH`;
//     }
//   };
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="custom-tooltip">
//           <p className="label">{`Date: ${payload[0].payload.day}`}</p>
//           <p className="label">{`Revenue: ${formatRevenue(payload[0].value)}`}</p>
//         </div>
//       );
//     }
//     return null;
//   };console.log('smiti',Name)
//   return (
//     <div className='container'>
//       <h1>Welcome, {Name}!</h1><Navbar name={Name}/>
//       <div className='d-flex justify-content-between gap-2 container'>
//         <div className='d-flex justify-content-between save border border-warning-subtle p-4 rounded-4 w-50 text-center my-2'>
//           <img src='/public/box.png' height='50px' className='rounded-5 p-1 me-3 border border-warning-subtle bg-warning-subtle ' alt="Products" />
//           <div>
//           <div className='d-flex'><h3>{totalProducts}</h3> <p>Products</p></div>
//           <Link to='/products' >View all</Link>
//           </div>
//         </div>
//         <div className='d-flex justify-content-between save border border-warning-subtle p-4 rounded-4 w-50 text-center my-2'>
//           <img src='/public/wallet.png' height='50px' className='rounded-5 p-1 me-3 border border-warning-subtle bg-warning-subtle ' alt="Sales" />
//           <div>
//           <div className='d-flex'><h3>{totalSales}</h3> <p> Sales</p></div>
//           <Link to='/sales'>View all</Link>
//           </div>
//         </div>
//         <div className='d-flex justify-content-between save border border-warning-subtle p-4 rounded-4 w-50 text-center my-2'>
//           <img src='/public/trolley.png' height='50px' className='rounded-5 p-1 me-3 border border-warning-subtle bg-warning-subtle ' alt="Suppliers" />
//           <div>
//           <div className='d-flex'><h3>{totalSuppliers}</h3> <p>  Suppliers</p></div>
//           <Link to='/suppliers'>View all</Link>
//           </div>
//         </div>
//       </div>
    

//       <div className='row'>

//         <div className='col-md-6 saveT border border-warning-subtle rounded-4 container' style={{width: '500px'}}>
//             <table className='table border-warning-subtle '>
//               <thead>
//                 <tr>
//                   <th colSpan='3' className='d-flex justify-content-between'>
//                     <b className='mt-1'>Top selling products</b>
//                     <div className="dropdown d-inline-block ">
//                       <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
//                         Select Month
//                       </button>
//                       <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                         {months.map(month => (
//                           <a key={month}>
//                             <button className="dropdown-item" onClick={() => setSelectedMonth(month)}>{month}</button>
//                           </a>
//                         ))}
//                       </div>
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className='d-flex justify-content-center gap-4 mt-4'>
//                 {topSellingProducts.map((product, index) => (
//                   <tr key={product.product_id} style={{ borderRight: index !== topSellingProducts.length - 1 ? '1px solid #FFF8DC' : 'none'}}>
//                     <div className='d-flex align-items-center '><img src={`http://localhost:8081/${product.product_image.replace(/\\/g, '/')}`} className='rounded-pill' alt={product.product_id} width='100px' height='100px'/></div>
//                     <div className='d-flex align-items-center'>{product.name}</div>
//                     <div className='d-flex align-items-center'><h2>{product.totalQuantity}</h2><p>Qte</p></div>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//         </div>

//         <div className='col-md-5 col-md-6 saveT border border-warning-subtle rounded-4 container ms-5' style={{width: '440px'}}>
//         <h4 className=''>Daily Revenue</h4>
      
//         <div style={{ width: '100%', height: 300 }}>
//           <ResponsiveContainer>
//             <BarChart
//               data={dailyRevenue}
//               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day">
//                 {/* <Label value="Date" position="insideBottom" offset={0} /> */}
//               </XAxis>
//               <YAxis tickFormatter={formatNumber}>
//                 {/* <Label value="Revenue (DH)" angle={-90} position="insideLeft" offset={0} /> */}
//               </YAxis>
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Bar dataKey="revenue" fill="orange" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { BarChart, Bar,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer ,PieChart,Pie, Cell} from 'recharts';

export default function EmpHome() {
 
  const [data, setData] = useState([]);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [totalSale, setTotalSale] = useState(0);

  useEffect(() => {
    fetchTotalProducts();
    fetchTotalSales();
    fetchTotalSuppliers();
    fetchMonths();
    fetchTotalPurchases();
    fetchTotalSale();
  }, []);

  const fetchTotalPurchases = () => {
    axios.get('http://localhost:8081/employee/last_month_purchases_total')
      .then(response => {
        setTotalPurchases(response.data.totalPurchases);
      })
      .catch(error => {
        console.error('Error fetching total purchases:', error);
      });
  };

  const fetchTotalSale = () => {
    axios.get('http://localhost:8081/employee/last_month_sales_total')
      .then(response => {
        setTotalSale(response.data.totalSales);
      })
      .catch(error => {
        console.error('Error fetching total sales:', error);
      });
  };

  const fetchTotalProducts = () => {
    axios.get('http://localhost:8081/total_products')
      .then(response => {
        setTotalProducts(response.data.totalProducts);
      })
      .catch(error => {
        console.error('Error fetching total products:', error);
      });
  };

  const fetchTotalSales = () => {
    axios.get('http://localhost:8081/total_sales')
      .then(response => {
        setTotalSales(response.data.totalSales);
      })
      .catch(error => {
        console.error('Error fetching total sales:', error);
      });
  };

  const fetchTotalSuppliers = () => {
    axios.get('http://localhost:8081/total_suppliers')
      .then(response => {
        setTotalSuppliers(response.data.totalSuppliers);
      })
      .catch(error => {
        console.error('Error fetching total suppliers:', error);
      });
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchTopSellingProducts(selectedMonth);
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (months.length > 0) {
      setSelectedMonth(months[months.length - 1]);
    }
  }, [months])

  const fetchMonths = () => {
    axios.get('http://localhost:8081/months')
      .then(response => {
        setMonths(response.data.months);
      })
      .catch(error => {
        console.error('Error fetching months:', error);
      });
  };

  const fetchTopSellingProducts = (selectedMonth) => {
    axios.get(`http://localhost:8081/top_selling_products/${selectedMonth}`)
      .then(response => {
        setTopSellingProducts(response.data.topSellingProducts);
      })
      .catch(error => {
        console.error('Error fetching top selling products:', error);
      });
  };

  useEffect(() => {
    fetchDailyRevenue();
    fetchRecentSales();
  }, []);

  const fetchDailyRevenue = () => {
    axios.get('http://localhost:8081/daily_revenue')
      .then(response => {
        const formattedData = response.data.dailyRevenue.map(entry => ({
          day: new Date(entry.day).toLocaleDateString(),
          revenue: entry.revenue
        }));
        setDailyRevenue(formattedData);
      })
      .catch(error => {
        console.error('Error fetching daily revenue:', error);
      });
  };

  const formatNumber = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else {
      return value;
    }
  };

  const formatRevenue = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M DH`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K DH`;
    } else {
      return `${value} DH`;
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${payload[0].payload.day}`}</p>
          <p className="label">{`Revenue: ${formatRevenue(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  const fetchRecentSales = () => {
    axios.get('http://localhost:8081/employee/sale')
      .then(response => {
        setData(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching recent sales:', error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    renderChart(totalPurchases, totalSale);
  }, [totalPurchases, totalSale]);

  const renderChart = (purchases, sales) => {
    const ctx = document.getElementById('salesPurchasesChart');
    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Purchases', 'Sales'],
        datasets: [{
          label: 'Sales vs Purchases',
          data: [purchases, sales],
          backgroundColor: [
            'orange',
            'yellow',
          ],
          borderColor: [
            'orange',
            'yellow',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Sales vs Purchases Distribution Last Month'
          },
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  };

  return (
    <div className='container'>
      <div className='row gap-2 container'>
        <div className='col-sm d-flex justify-content-between save border border-warning-subtle p-4 rounded-4 w-50 text-center my-2'>
          <img src='/public/box.png' height='50px' className='rounded-5 p-1 me-3 border border-warning-subtle bg-warning-subtle ' alt="Products" />
          <div>
            <div className='d-flex'><h3>{totalProducts}</h3> <p>Products</p></div>
            <Link to='/employe/prodE' >View all</Link>
          </div>
        </div>
        <div className='col-sm d-flex justify-content-between save border border-warning-subtle p-4 rounded-4 w-50 text-center my-2'>
          <img src='/public/wallet.png' height='50px' className='rounded-5 p-1 me-3 border border-warning-subtle bg-warning-subtle ' alt="Sales" />
          <div>
            <div className='d-flex'><h3>{totalSales}</h3> <p> Sales</p></div>
            <Link to='/employe/prodE'>View all</Link>
          </div>
        </div>
        <div className=' col-sm d-flex justify-content-between save border border-warning-subtle p-4 rounded-4 w-50 text-center my-2'>
          <img src='/public/trolley.png' height='50px' className='rounded-5 p-1 me-3 border border-warning-subtle bg-warning-subtle ' alt="Suppliers" />
          <div>
            <div className='d-flex'><h3>{totalSuppliers}</h3> <p>  Suppliers</p></div>
            <Link to='/employe/SuppE'>View all</Link>
          </div>
        </div>
      </div>
      <div className='row'>

        <div className='col-md-6 saveT border border-warning-subtle rounded-4 w-50' style={{overflowX: 'auto'}}>
          <div className='table border-warning-subtle '>
            <div>
              <div colSpan='3' className='d-flex justify-content-between'>
                <b className='mt-1'>Top products</b>
                <div className="dropdown d-inline-block ">
                  <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Select Month
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {months.map(month => (
                      <a key={month}>
                        <button className="dropdown-item" onClick={() => setSelectedMonth(month)}>{month}</button>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-center gap-2 mt-4 ms-4 '>
              {topSellingProducts.map((product, index) => (
                <div key={product.product_id}  >
                  <div className='d-flex align-items-center'><img src={`http://localhost:8081/${product.product_image.replace(/\\/g, '/')}`} className='rounded-5' alt={product.product_id} width='50px' height='50px' /></div>
                  <div className='d-flex align-items-center'>{product.name}</div>
                  <div className='d-flex align-items-center'><h4>{product.totalQuantity}</h4><p>Qte</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='col-md-5 saveT border border-warning-subtle rounded-4 container ms-1 ' style={{width: '35%'}}>
          
          <canvas id="salesPurchasesChart" width="200" height="200" className='d-flex justify-content-center ms-1 mb-1'></canvas>
          </div>
      </div>
      <div className='saveT border border-warning-subtle rounded-4 container ms-2' style={{width: '95%'}}>
          <h4 className=''>Daily Revenue</h4>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={dailyRevenue}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis tickFormatter={formatNumber} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="revenue" fill="orange" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      
      <div className='saveT w-100 border border-warning-subtle rounded-4' style={{ overflowX: 'auto' ,marginLeft: '1%'}}>
      <table className='table table-hover border '>
          <thead className='bg-dark text-white'>
            <tr className='text-center'>
              <th className='bg-warning'>Id</th>
              <th className='bg-warning'>Name</th>
              <th className='bg-warning'>Prix</th>
              <th className='bg-warning'>Quantité</th>
              <th className='bg-warning'>Total Prix</th>
              <th className='bg-warning'>Date d'achat</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((prod, index) => (
              <tr key={prod.id} className='text-center'>
                <td className='p-3'>{prod.id}</td>
                <td className='p-3'>{prod.name}</td>
                <td className='p-3'>{prod.price} Dh</td>
                <td className='p-3'>{prod.quantity}</td>
                <td className='p-3'>{prod.total_price} Dh</td>
                <td className='p-3'>{formatDate(prod.sale_date)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className='text-center'>No sale available</td>
            </tr>
          )}
        </tbody>
        </table>
      </div>
    </div>
  )
}

