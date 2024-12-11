import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Invoice() {
  const printPDF = React.useRef(null);

  const handleDonwloadPDF = async () => {
    // Add code to download PDF
    const element = printPDF.current;

    // check if element is available
    if (!element) return;

    //convert the element to a canvas
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL('image/png');

    // create a pdf document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    })
    // get image properties
    const imageProperties = pdf.getImageProperties(data);

    // get the width the image
    const pdfWidth = pdf.internal.pageSize.getWidth();

    // calculate the width and height of the image
    const pdfHeight = (imageProperties.height * pdfWidth) / imageProperties.width

    // add image to pdf
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-screen-md">
        <div ref={printPDF} className="p-8 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
            </div>
            <div className="text-right">
              <h2 className="font-semibold">Company Name</h2>
              <p className="text-sm text-gray-600">
                123 Business Street
                <br />
                City, State 12345
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
            <p className="text-gray-700">
              Client Name
              <br />
              Client Address
              <br />
              City, State ZIP
            </p>
          </div>

          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-right">Quantity</th>
                <th className="border p-2 text-right">Unit Price</th>
                <th className="border p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Web Development Service</td>
                <td className="border p-2 text-right">1</td>
                <td className="border p-2 text-right">$2000.00</td>
                <td className="border p-2 text-right">$2000.00</td>
              </tr>
              <tr>
                <td className="border p-2">App Deployment</td>
                <td className="border p-2 text-right">1</td>
                <td className="border p-2 text-right">$250.00</td>
                <td className="border p-2 text-right">$250.00</td>
              </tr>
              <tr>
                <td className="border p-2">Hosting</td>
                <td className="border p-2 text-right">1</td>
                <td className="border p-2 text-right">$100.00</td>
                <td className="border p-2 text-right">$100.00</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>$2,350.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%):</span>
                <span>$175.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>$2,525.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDonwloadPDF}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}