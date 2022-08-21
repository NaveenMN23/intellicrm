import * as React from 'react';

  const rows = [
    {
        "Category":"76",
        "USName":"76"
    }
  ];
  
  export default function CustomizedTables() {
    return (
        <div style={{backgroundColor:'white'}}>
        <table style={{border:'white'}}>
            <tr >
                <td>Category</td>
                <td align="right">Calories</td>
                <td align="right">USName</td>
                <td align="right">ActiveIngredient</td>
                <td align="right">NameonPackage</td>              
                <td align="right">Strength</td>
                <td align="right">Origin</td>
                <td align="right">Units/pack</td>
                <td align="right">Totalpacks</td>
                <td align="right">SubtotalCost</td>
            </tr>
          <tbody>
            {rows.map((row) => (
                <tr key={row.Category}>
                <td component="th" scope="row">{row.Category}</td>
                <td align="right">{row.Calories}</td>
                <td align="right">{row.USName}</td>
                <td align="right">{row.ActiveIngredient}</td>
                <td align="right">{row.NameOnPackage}</td>
                <td align="right">{row.Strength}</td>
                <td align="right">{row.Origin}</td>
                <td align="right">{row.UnitsPerPack}</td>
                <td align="right">{row.Totalpacks}</td>
                <td align="right">{row.Subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
            );
  }