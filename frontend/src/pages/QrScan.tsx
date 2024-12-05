import React from "react";
import "../css/qrScan.css";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { QrQuery } from "../providers/queries/Qr.query";
import { useNavigate } from "react-router-dom";

function QrScan() {
  const navigate = useNavigate();
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
  let detected = false;
  const [qrData, setQrData] = React.useState<Product[]>([]);
  const handleOnScan = async (detectedCodes: IDetectedBarcode[]) => {
    const code = detectedCodes[0].rawValue;
    if (detectedCodes.length > 0) {
      console.log("Ddsdnksndkjdncdncj");

      const res = await QrQuery.qrGetPro(code);
      detected = true;
      console.log(detected);
      navigate('/home')

      console.log(res);
      if (res) {
        setQrData(res.product);
      } else {
        console.log("No data found");
      }
    }
  };
  return (
    <div className="qr-scan">
      <h1>Inventory Mangement System</h1>
      <div className="scanner">
        <h3>Qr Scan</h3>
        <h5>Scan The Qr Code</h5>
        {qrData ? (
          <Scanner
            onScan={handleOnScan}
            styles={{
              container: { width: "200px" },
            }}
          />
        ) : (
          <h1>Product Not Found</h1>
        )}
      </div>
    </div>
  );
}

export default QrScan;
