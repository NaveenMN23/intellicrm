import printPdf from './../../components/PdfPrinter';

const invoice = (props) => {
  const invoiceFormat = `<div>
    <div id="companyName">
      <div style="font-size:28px;text-align:center;">CAPITALONLINEPHARMACY.com</div>
    </div>
    <div id="address">
      <div style="font-size:14px;line-height:0px">13/06/2022</div>
      <div style="font-size:14px;line-height:0px">${props.customerId}</div>
      <div style="font-size:14px;line-height:0px">Mr David Johnson</div>
      <div style="font-size:14px;line-height:0px">447 Falling Leaf Lane</div>
      <div style="font-size:14px;line-height:0px">Banning</div>
      <div style="font-size:14px;line-height:0px">United States</div>
    </div>
    <div id="title">
      <div style="font-size:18px;text-align:center;text-transform:UPPERCASE;text-decoration:underline;font-weight:bold">CHECK YOUR ORDER CAREFULLY</div>
    </div>
    <div id="customerId">
      <div style="font-size:14px;text-decoration:underline">${props.orderId}</div>
    </div>
    <div id="prescription">
      <table border="1" style="border-collapse:collapse">
        <tr>
          <th style="font-size:14px;">Category</th>
          <th style="font-size:14px;">US Name</th>
          <th style="font-size:14px;">Active Ingredient</th>
          <th style="font-size:14px;">Name on Package</th>
          <th style="font-size:14px;">Strength</th>
          <th style="font-size:14px;">Origin</th>
          <th style="font-size:14px;">Units/pack</th>
          <th style="font-size:14px;">Total packs</th>
          <th style="font-size:14px;">Subtotal Cost</th>
        </tr>
        <tr>
          <td style="font-size:14px;">Brand</td>
          <td style="font-size:14px;">CIALIS</td>
          <td style="font-size:14px;">Tadalafil</td>
          <td style="font-size:14px;">CIALIS 20</td>
          <td style="font-size:14px;">20mg</td>
          <td style="font-size:14px;">TURKEY</td>
          <td style="font-size:14px;">4 tablets</td>
          <td style="font-size:14px;">3</td>
          <td style="font-size:14px;">$50</td>
        </tr>
      </table>
    </div>
    <div id="Details">
      <table>
       <tr>
        <td style="width:670px">
         <p style="font-size:14px;text-align:left;">
          Expiry date: 30/12/2023
          <span style="float:right">Batch No: AX0905</span>
         </p>
        <div style="font-size:14px">
          For Mr David Johnson: Take 1 tablet at night
        </div>
        </td>
      </tr>
      </table>
    </div>
    <div id="Total">
      <div style="font-size:14px;text-align:right">Subtotal:
        <span style="font-size:14px">$50</span>
      </div>
      <div style="font-size:14px;text-align:right">Shipping:
        <span style="font-size:14px">$0</span>
      </div>
      <hr>
      <div style="font-size:14px;text-align:right">Total:
        <span style="font-size:14px">$50</span>
      </div>
    </div>
    <div id="footer">
      <div style="font-size:14px">
        The above product(s) were dispensed by Green Cure (Mauritius) Ltd, Jinfei, Mauritius for CAPITALONLINEPHARMACY.com.
        For consultation with the pharmacist, kindly call CAPITALONLINEPHARMACY.COM at phone number …………………………………..and request pharmacist assistance.
        For any other queries regarding your order, please call CAPITALONLINEPHARMACY.COM at phone number ………………………………..and speak to a customer relationship agent.
      </div>
    </div>
  </div>`;

  const fileName = `${props.customerId}_${props.orderId}_Invoice.pdf`;

  return printPdf(invoiceFormat,fileName);
}

export default invoice;
