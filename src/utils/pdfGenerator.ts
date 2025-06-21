
export const generateSalesStatementPDF = (cropData: any, userData: any) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mandi Mithra - Sales Statement</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: #f5f5f5; padding: 20px; color: #333; }
        .invoice-container { max-width: 800px; margin: 0 auto; background: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #2e7d32, #4caf50); color: white; padding: 30px; text-align: center; position: relative; }
        .company-name { font-size: 32px; font-weight: bold; margin-bottom: 8px; letter-spacing: 1px; }
        .tagline { font-size: 16px; opacity: 0.9; font-style: italic; margin-bottom: 20px; }
        .statement-title { font-size: 18px; background: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 20px; display: inline-block; margin-top: 10px; }
        .invoice-info { padding: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; border-bottom: 2px solid #e0e0e0; }
        .info-section h3 { color: #2e7d32; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #4caf50; padding-bottom: 5px; }
        .info-item { margin-bottom: 8px; display: flex; justify-content: space-between; }
        .info-label { font-weight: 600; color: #555; }
        .info-value { color: #333; }
        .product-section { padding: 30px; }
        .product-header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        .product-name { font-size: 24px; font-weight: bold; color: #2e7d32; margin-bottom: 10px; }
        .profit-badge { background: linear-gradient(135deg, #4caf50, #45a049); color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 16px; display: inline-block; }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .metric-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #4caf50; }
        .metric-label { font-size: 14px; color: #666; margin-bottom: 8px; }
        .metric-value { font-size: 20px; font-weight: bold; color: #2e7d32; }
        .financial-summary { background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; }
        .financial-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e0e0e0; }
        .financial-row:last-child { border-bottom: none; background: #e8f5e8; margin: 10px -25px -25px -25px; padding: 20px 25px; border-radius: 0 0 8px 8px; font-weight: bold; font-size: 18px; }
        .financial-label { font-weight: 600; color: #555; }
        .financial-value { font-weight: bold; color: #2e7d32; }
        .expenses-section { margin-top: 30px; }
        .section-title { font-size: 20px; color: #2e7d32; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #4caf50; }
        .expenses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }
        .expense-item { background: white; border: 1px solid #e0e0e0; padding: 15px; border-radius: 6px; text-align: center; }
        .expense-label { font-size: 14px; color: #666; margin-bottom: 5px; }
        .expense-value { font-size: 16px; font-weight: bold; color: #333; }
        .footer { background: #2e7d32; color: white; padding: 20px 30px; text-align: center; }
        .footer-text { font-size: 14px; opacity: 0.9; }
        .generated-date { margin-top: 10px; font-size: 12px; opacity: 0.7; }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="header-content">
                <div class="company-name">MANDI MITHRA</div>
                <div class="tagline">Predict. Sell. Earn.</div>
                <div class="statement-title">SALES STATEMENT</div>
            </div>
        </div>
        <div class="invoice-info">
            <div class="info-section">
                <h3>Statement Details</h3>
                <div class="info-item">
                    <span class="info-label">Statement ID:</span>
                    <span class="info-value">#MS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Sale Date:</span>
                    <span class="info-value">${cropData.dateSold || new Date().toLocaleDateString()}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Generated Date:</span>
                    <span class="info-value">${new Date().toLocaleDateString()}</span>
                </div>
            </div>
            <div class="info-section">
                <h3>Farmer Information</h3>
                <div class="info-item">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${userData?.name || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Location:</span>
                    <span class="info-value">${userData?.district || 'N/A'}, ${userData?.state || 'N/A'}</span>
                </div>
            </div>
        </div>
        <div class="product-section">
            <div class="product-header">
                <div class="product-name">${cropData.cropName}</div>
                <div class="profit-badge">${cropData.profitMargin?.toFixed(1) || '0'}% ${cropData.netProfitLoss >= 0 ? 'Profit' : 'Loss'}</div>
            </div>
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-label">Quantity Sold</div>
                    <div class="metric-value">${cropData.quantitySold} Quintals</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Price per Quintal</div>
                    <div class="metric-value">₹${cropData.pricePerQuintal?.toLocaleString()}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Total Earnings</div>
                    <div class="metric-value">₹${cropData.totalEarnings?.toLocaleString()}</div>
                </div>
            </div>
            <div class="financial-summary">
                <div class="financial-row">
                    <span class="financial-label">Total Earnings</span>
                    <span class="financial-value">₹${cropData.totalEarnings?.toLocaleString()}</span>
                </div>
                <div class="financial-row">
                    <span class="financial-label">Total Expenses</span>
                    <span class="financial-value">₹${Object.values(cropData.expenses || {}).reduce((a: number, b: number) => a + b, 0).toLocaleString()}</span>
                </div>
                <div class="financial-row">
                    <span class="financial-label">Net Profit</span>
                    <span class="financial-value">₹${cropData.netProfitLoss?.toLocaleString()}</span>
                </div>
            </div>
            <div class="expenses-section">
                <h2 class="section-title">Expense Breakdown</h2>
                <div class="expenses-grid">
                    ${Object.entries(cropData.expenses || {}).map(([key, value]) => `
                        <div class="expense-item">
                            <div class="expense-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                            <div class="expense-value">₹${(value as number).toLocaleString()}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer-text">Thank you for using Mandi Mithra - Your trusted partner in agricultural success</div>
            <div class="generated-date">This statement was generated automatically on ${new Date().toLocaleDateString()}</div>
        </div>
    </div>
</body>
</html>`;

  // Create a new window and write the HTML content
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
  }
};
