import printPdf from './../../components/PdfPrinter';

const label = (props) => {
  const labelFormat = props.map((el) => {
    return `<div>
      <div id="header">
        <div style="font-size:14px;line-height:0px;text-align:left;">08 August 2022 (22001)</div>
        <div style="font-size:14px;line-height:0px;text-align:left;">Mr John Smith (123456)</div>
        <div style="font-size:14px;line-height:0px;text-align:right;">Doctor Lam Ming</div>
      </div>
      <hr>
      <div id="name">
        <div style="font-size:14px;font-weight:bold;text-align:center;">BRAND CIALIS TABLETS 20MG</div>
        <div style="font-size:14px;line-height:0px">
          <span>Quantity Dispensed: </span>
          <span style="font-weight:bold;">${el.customerId}</span>
          <span>Refills: </span>
          <span>${el.orderId}</span>
        </div>
        <div style="font-size:14px;font-weight:bold;">TAKE 1 TABLET AT NIGHT AS DIRECTED</div>
      </div>
      <hr>
      <div style="font-size:14px;line-height:0px">TAKE WITH FOOD. DO NOT SKIP MEALS.</div>
      <hr>
      <div id="cautionaryNote">
        <div style="font-size:14px;line-height:0px">
        </div>
      </div>
      <hr>
      <div id="footer">
        <div style="font-size:14px;line-height:0px;text-align:left;">wwwrxonline.com / +987654321</div>
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

  const fileName = `${props.customerId}_${props.orderId}_Label.pdf`;

  return printPdf(labelFormat,fileName);
}

export default label;
