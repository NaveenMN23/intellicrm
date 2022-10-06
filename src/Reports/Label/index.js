import printPdf from './../../components/PdfPrinter';

const label = (props) => {
  const labelFormat = props.map((el) => {
    return `<div>
      <div id="header">
        <div style="font-size:14px;line-height:0px;text-align:left;">${el.orderDate} (${el.orderNo})</div>
        <div style="font-size:14px;line-height:0px;text-align:left;">${el.customerName} (${el.customerId})</div>
        <div style="font-size:14px;line-height:0px;text-align:right;">Doctor Lam Ming</div>
      </div>
      <hr>
      <div id="name">
        <div style="font-size:14px;font-weight:bold;text-align:center;">${el.category} ${el.nameOnPackage} ${el.dosageForm} ${el.strength}</div>
        <div style="font-size:14px;line-height:0px">
          <span>Quantity Dispensed: </span>
          <span style="font-weight:bold;">Total(${el.totalPacks} Packs of ${el.quantity} ) </span>
          <span>Refills: </span>
          <span>${el.refill}</span>
        </div>
        <div style="font-size:14px;font-weight:bold;">${el.directionsOfUse}</div>
      </div>
      <hr>
      <div style="font-size:14px;line-height:0px">${el.rxwarningcautionarynote}</div>
      <hr>
      <div id="cautionaryNote">
        <div style="font-size:14px;line-height:0px">
        </div>
      </div>
      <hr>
      <div id="footer">
        <div style="font-size:14px;line-height:0px;text-align:left;">${el.pharmacyName} / ${el.onlinepharmacyphonenumber}</div>
        <div style="font-size:14px;line-height:0px;text-align:left;">Dispensed by Green Cure (Mauritius) Ltd, Jinfei, Mauritius</div>
        <div style="font-size:14px;line-height:0px;text-align:right;">Pharmacist Initials: LRS</div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />`
  });

  const fileName = `${props.customerName}_${props.orderId}_Label.pdf`;

  return printPdf(labelFormat,fileName);
}

export default label;
