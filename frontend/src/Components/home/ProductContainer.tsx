import { Fragment, useEffect, useState } from "react";
import "../../css/Home.css";
import { ProductQuery } from "../../providers/queries/Product.query";

import { LineChart } from "@mui/x-charts";

export default function ProductContainer() {
  type Product = {
    _id: string;
    DisplayId: string;
    Title: string;
    Price: number;
    Quantity: string;
    Stock: number;
    Category: string;
    SubCategory: string;
    Description: string;
    Visible: string;
    LimitLowStock: number;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [outOfStock, setOutOfStock] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await ProductQuery.getAll();
      if (res) {
        setProducts(res.products);
        setAvailableProducts(
          res.products.filter(
            (pro: { Visible: string; Stock: number }) =>
              pro.Visible === "true" && pro.Stock !== 0
          )
        );
        setLowStock(
          res.products.filter(
            (pro: { Stock: number; LimitLowStock: number }) =>
              pro.Stock <= pro.LimitLowStock && pro.Stock !== 0
          )
        );
        setOutOfStock(
          res.products.filter((pro: { Stock: number }) => pro.Stock === 0)
        );
      } else {
        console.log("No data found");
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="product-container">
      <h4>Products Activity</h4>
      <div className="counts-block">
        <div className="card">
          <div className="icon"></div>
          <div>
            <h3>Total Products</h3>
            <h2>{products.length}</h2>
          </div>
        </div>
        <div className="card">
          <div className="icon"></div>
          <div>
            <h3>Available Products</h3>
            <h2>{availableProducts.length}</h2>
          </div>
        </div>
        <div className="card">
          <div className="icon"></div>
          <div>
            <h3>Low Stcoks</h3>
            <h2>{lowStock.length}</h2>
          </div>
        </div>
        <div className="card">
          <div className="icon"></div>
          <div>
            <h3>Out of Stocks</h3>
            <h2>{outOfStock.length}</h2>
          </div>
        </div>
      </div>
      <div className="product-activity-section">
        <div className="product-display-card">
          <div className="heading-product-display">Total Products</div>
          {products.map((product, index) => (
            <Fragment key={index}>
              <div
                style={
                  product.Visible === "false"
                    ? {
                        borderBottom: "1px solid red",
                        position: "relative",
                        top: "22px",
                      }
                    : {}
                }
              ></div>
              <div className="product-display-data">
                <div>{product.DisplayId}</div>
                <div>{product.Title}</div>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="product-display-card">
          <div className="heading-product-display">Available Products</div>
          {availableProducts.map((product, index) => (
            <div className="product-display-data" key={index}>
              <div>{product.DisplayId}</div>
              <div>{product.Title}</div>
            </div>
          ))}
        </div>
        <div className="product-display-card">
          <div className="heading-product-display">Low Stocks</div>
          {lowStock.map((product, index) => (
            <div className="product-display-data" key={index}>
              <div>{product.DisplayId}</div>
              <div>{product.Title}</div>
            </div>
          ))}
        </div>
        <div className="product-display-card">
          <div className="heading-product-display">
            Out Of Stock <span>Refill</span>
          </div>
          {outOfStock.map((product, index) => (
            <div className="product-display-data" key={index}>
              <div>{product.DisplayId}</div>
              <div>{product.Title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="product-graph-both">
        <div className="product-graph">
          <LineChart
            className="line-chart"
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "Total Products",
                  "Available Products",
                  "Low Stocks",
                  "Out of Stocks",
                ],
                label: "Products",
                fill: "#fff",

                labelStyle: {
                  fill: "#fff",
                },
                tickLabelStyle: {
                  fill: "#fff",
                },
              },
            ]}
            series={[
              {
                data: [
                  products.length,
                  availableProducts.length,
                  lowStock.length,
                  outOfStock.length,
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
