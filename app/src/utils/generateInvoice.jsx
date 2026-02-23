import jsPDF from "jspdf";
import QRCode from "qrcode";
import logo from "../assets/logo.png";

export const generateInvoice = async ({
  items,
  customer,
  orderId,
  paymentId,
  deliveryFee = 30,
}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const invoiceId = `INV-${Date.now()}`;
  const transactionId = `TXN-${Math.floor(Math.random() * 100000000)}`;
  const invoiceDate = new Date().toLocaleString();

  const GST_RATE = 5; // 5% food GST
  const GST_PERCENT = GST_RATE / 100;

  //   CALCULATIONS 
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const gstAmount = subtotal * GST_PERCENT;
  const halfGST = gstAmount / 2;
  const total = subtotal + gstAmount + deliveryFee;

  //   HEADER  
    let y = 15;
  const headerHeight = 32;

  // Dark header background
  doc.setFillColor(20, 20, 20);
  doc.rect(0, 0, pageWidth, headerHeight, "F");

  //    LEFT: LOGO   
  doc.addImage(logo, "PNG", 15, 8, 50, 16);

  //    RIGHT: COMPANY DETAILS   
  doc.setTextColor(255, 255, 255);

  doc.setFontSize(13);
  doc.setFont(undefined, "bold");
  doc.text("FOODY ZONE PRIVATE LIMITED", pageWidth - 15, 12, {
    align: "right",
  });

  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.text("Pune, Maharashtra - 411001", pageWidth - 15, 18, {
    align: "right",
  });
  doc.text("GSTIN: 27ABCDE1234F1Z5", pageWidth - 15, 22, {
    align: "right",
  });
  doc.text("FSSAI: 12345678901234", pageWidth - 15, 26, {
    align: "right",
  });

  // Thin divider line below header
  doc.setDrawColor(200, 200, 200);
  doc.line(15, headerHeight + 2, pageWidth - 15, headerHeight + 2);

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Move Y properly below header
  y = headerHeight + 10;

  y += 5;
  doc.line(15, y, pageWidth - 15, y);

  //   INVOICE META  
  y += 10;
  doc.setFont(undefined, "bold");
  doc.text("Tax Invoice", pageWidth / 2, y, { align: "center" });

  y += 10;
  doc.setFont(undefined, "normal");

  doc.text(`Invoice No: ${invoiceId}`, 15, y);
  doc.text(`Order ID: ${orderId}`, 15, y + 6);
  doc.text(`Invoice Date: ${invoiceDate}`, 15, y + 12);

  doc.text(`Payment ID: ${paymentId}`, pageWidth - 15, y, {
    align: "right",
  });
  doc.text(`Transaction ID: ${transactionId}`, pageWidth - 15, y + 6, {
    align: "right",
  });
  doc.text(`Payment Mode: UPI`, pageWidth - 15, y + 12, {
    align: "right",
  });

  y += 25;
  doc.line(15, y, pageWidth - 15, y);

  //   CUSTOMER DETAILS  
  y += 10;
  doc.setFont(undefined, "bold");
  doc.text("Bill To:", 15, y);

  doc.setFont(undefined, "normal");
  doc.text(customer.name, 15, y + 6);
  doc.text(`Phone: ${customer.phone}`, 15, y + 12);
  doc.text(`Address: ${customer.address}`, 15, y + 18);

  y += 30;
  doc.line(15, y, pageWidth - 15, y);

  //   TABLE HEADER  
  y += 10;
  doc.setFont(undefined, "bold");

  doc.text("Item", 15, y);
  doc.text("HSN", 75, y);
  doc.text("Qty", 95, y);
  doc.text("Rate", 110, y);
  doc.text("CGST", 130, y);
  doc.text("SGST", 150, y);
  doc.text("Amount", pageWidth - 15, y, { align: "right" });

  y += 5;
  doc.line(15, y, pageWidth - 15, y);

  //   ITEMS  
  y += 10;
  doc.setFont(undefined, "normal");

  for (let item of items) {
    const amount = item.price * item.quantity;
    const itemGST = amount * GST_PERCENT;
    const cgst = itemGST / 2;
    const sgst = itemGST / 2;

    if (y > pageHeight - 40) {
      doc.addPage();
      y = 20;
    }

    doc.text(item.name, 15, y);
    doc.text("9963", 75, y); // HSN for restaurant services
    doc.text(String(item.quantity), 95, y);
    doc.text(`Rs ${item.price}`, 110, y);
    doc.text(`Rs ${cgst.toFixed(2)}`, 130, y);
    doc.text(`Rs ${sgst.toFixed(2)}`, 150, y);
    doc.text(`Rs ${amount.toFixed(2)}`, pageWidth - 15, y, {
      align: "right",
    });

    y += 10;
  }

  //   TOTALS  
  y += 10;
  doc.line(100, y, pageWidth - 15, y);

  y += 10;
  doc.setFont(undefined, "normal");

  doc.text("Subtotal:", 110, y);
  doc.text(`Rs ${subtotal.toFixed(2)}`, pageWidth - 15, y, {
    align: "right",
  });

  y += 8;
  doc.text("CGST (2.5%):", 110, y);
  doc.text(`Rs ${halfGST.toFixed(2)}`, pageWidth - 15, y, {
    align: "right",
  });

  y += 8;
  doc.text("SGST (2.5%):", 110, y);
  doc.text(`Rs ${halfGST.toFixed(2)}`, pageWidth - 15, y, {
    align: "right",
  });

  y += 8;
  doc.text("Delivery Fee:", 110, y);
  doc.text(`Rs ${deliveryFee.toFixed(2)}`, pageWidth - 15, y, {
    align: "right",
  });

  y += 10;
  doc.setFont(undefined, "bold");
  doc.setFontSize(14);
  doc.text("Grand Total:", 110, y);
  doc.text(`Rs ${total.toFixed(2)}`, pageWidth - 15, y, {
    align: "right",
  });

  //   QR CODE  
  const qrData = `
    Invoice: ${invoiceId}
    Order: ${orderId}
    Amount: Rs ${total}
    Payment ID: ${paymentId}
  `;

  const qrBase64 = await QRCode.toDataURL(qrData);
  doc.addImage(qrBase64, "PNG", 15, y - 20, 30, 30);

  //   FOOTER  
  y = pageHeight - 25;
  doc.setFontSize(8);
  doc.setFont(undefined, "normal");

  doc.text("This is a system generated GST invoice.", pageWidth / 2, y, {
    align: "center",
  });

  doc.text("For support contact support@foodzone.com", pageWidth / 2, y + 5, {
    align: "center",
  });

  doc.save(`FoodZone-${invoiceId}.pdf`);
};


const toDataURL = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};
