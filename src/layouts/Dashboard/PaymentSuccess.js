import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import Loader from "../../shared/Loader/Loader";
const PaymentSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");
  // const bookingId = query.get("bookingId");
  const { data: order, isLoading } = useQuery({
    queryKey: ["/order", transactionId],
    queryFn: async () => {
      const { data } = await axios.get(`/order?transactionId=${transactionId}`);
      return data;
    },
  });
  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    pdfRef.current.updateContainer();
  };
  const styles = {
    page: {
      backgroundColor: "#fff",
      padding: 30,
    },
    container: {
      maxWidth: "100%",
      marginVertical: 30,
    },
    heading: {
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      paddingBottom: 10,
    },
    headingText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    table: {
      display: "table",
      width: "100%",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      width: "50%",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    label: {
      fontWeight: "bold",
    },
    value: {
      color: "#444",
    },
  };

  //convert date from unix to humanized
  const dateObj = new Date(order?.paymentTime);
  const humanReadableTime = dateObj.toLocaleString();
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="bg-gray-100 h-full flex flex-col items-start justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Thank You {order?.customerName}!
      </h1>
      <p className="text-gray-700 text-lg mb-8">
        Your order has been successfully placed.
      </p>
      <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-start">
        <h2 className="text-2xl text-gray-700 mb-2">Order Details:</h2>
        <ul className="text-gray-700 mb-4">
          <li>Product: {order?.productName}</li>
          <li>Price: ${order?.price}</li>
          <li>Payment Made: {humanReadableTime}</li>
          <li>
            Seller Email:{" "}
            <a
              href={`mailto:${order?.sellerEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary"
            >
              {order?.sellerEmail}
            </a>
          </li>
          <li>
            Seller Contact:{" "}
            <a
              href={`tel:${order?.sellerContact}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary"
            >
              {order?.sellerContact}
            </a>
          </li>
        </ul>
        <p className="text-lg text-gray-700">
          Your order will be shipped within 2-3 business days. Thank you for
          your business!
        </p>
      </div>
      <PDFDownloadLink
        document={
          <Document>
            <Page style={styles.page}>
              <View style={styles.container}>
                <View style={styles.heading}>
                  <Text style={styles.headingText}>Order Details</Text>
                </View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                      <Text style={styles.label}>Product:</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.value}>{order?.productName}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                      <Text style={styles.label}>Price:</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.value}>${order?.price}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                      <Text style={styles.label}>Payment Made:</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.value}>{humanReadableTime}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                      <Text style={styles.label}>Seller Email:</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.value}>{order?.sellerEmail}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                      <Text style={styles.label}>Seller Contact:</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.value}>{order?.sellerContact}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
        }
        fileName="order-details.pdf"
        onClick={handleDownloadPDF}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <button className="btn btn-ghost btn-sm mt-5">
              Download invoice
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PaymentSuccess;
