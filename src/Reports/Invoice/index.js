import printPdf from './../../components/PdfPrinter';

const invoice = (props) => {

    let subtotal =0;
    let shippingCost =0;
  const invoiceFormat = props.map((el) => {
    let result = `<div>
    <div id="companyName">
      <div style="font-size:24px;text-align:center;">${el.pharmacyName}</div>
    </div>
    <div id="address">
      <div style="font-size:12px;line-height:0px">13/06/2022</div>
      <div style="font-size:12px;line-height:0px">${el.customerId}</div>
      <div style="font-size:12px;line-height:0px">${el.customerName}</div>
      <div style="font-size:12px;line-height:0px">${el.address}</div>
      <div style="font-size:12px;line-height:0px">${el.city}</div>
     
    </div>
    <div id="title">
      <div style="font-size:18px;text-align:center;text-transform:UPPERCASE;text-decoration:underline;font-weight:bold">CHECK YOUR ORDER CAREFULLY</div>
    </div>
    <div id="customerId">
      <div style="font-size:12px;text-decoration:underline">${el.refernce}</div>
    </div>
    <div id="prescription">
      <table border="1" style="border-collapse:collapse">
        <tr>
          <th style="font-size:12px;">Category</th>
          <th style="font-size:12px;">US Name</th>
          <th style="font-size:12px;">Active Ingredient</th>
          <th style="font-size:12px;">Name on Package</th>
          <th style="font-size:12px;">Strength</th>
          <th style="font-size:12px;">Origin</th>
          <th style="font-size:12px;">Units/pack</th>
          <th style="font-size:12px;">Total packs</th>
          <th style="font-size:12px;">Subtotal Cost</th>
        </tr>`

        result = result + el.invoiceProducts.map((e2) => {
          subtotal= subtotal + parseFloat(e2.subtotal);
        return `<tr>
          <td style="font-size:12px;">${e2.category}</td>
          <td style="font-size:12px;">${e2.usName}</td>
          <td style="font-size:12px;">${e2.activeIngredient}</td>
          <td style="font-size:12px;">${e2.nameonPackage}</td>
          <td style="font-size:12px;">${e2.strength}</td>
          <td style="font-size:12px;">${e2.origin}</td>
          <td style="font-size:12px;">${e2.unitspack}</td>
          <td style="font-size:12px;">${e2.totalpacks}</td>
          <td style="font-size:12px;">${e2.subtotal}</td>
        </tr>`
        });
        
    result = result + `</table>
    </div>
    <div id="Details">
      <table>
       <tr>
        <td style="width:670px">
         <p style="font-size:12px;text-align:left;">
          Expiry date: ${el.expiryDate}
          <span style="float:right">Batch No: ${el.batchNo}</span>
         </p>
        <div style="font-size:12px">
        ${el.notes}
        </div>
        </td>
      </tr>
      </table>
    </div>
    <div id="Total">
      <div style="font-size:12px;text-align:right">Subtotal:
        <span style="font-size:12px">${el.totalCost}</span>
      </div>
      <div style="font-size:12px;text-align:right">Shipping:
        <span style="font-size:12px">${el.shippingCost}</span>
      </div>
      <hr>
      <div style="font-size:12px;text-align:right">Total:
        <span style="font-size:12px">${parseFloat(el.shippingCost) + parseFloat(el.totalCost)}</span>
      </div>
    </div>
    <div id="footer">
      <div style="font-size:12px">
        The above product(s) were dispensed by Green Cure (Mauritius) Ltd, Jinfei, Mauritius for ${el.pharmacyName}.
        For consultation with the pharmacist, kindly call ${el.pharmacyName} at phone number ${el.pharmacyNumber}.and request pharmacist assistance.
        For any other queries regarding your order, please call ${el.pharmacyName} at phone number ${el.pharmacyNumber}..and speak to a customer relationship agent.
      </div>
    </div>
  </div>`;

  return result;
  });

  const fileName = `${props.customerName}_${props.orderId}_Invoice.pdf`;

  return printPdf(invoiceFormat,fileName);
}

export default invoice;
