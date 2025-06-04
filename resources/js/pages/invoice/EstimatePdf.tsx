// components/EstimatePDF.tsx
import { styles } from '@/components/invoiceStyle';
import React from 'react';
import {
  Document,
  Page,
  PDFViewer,
  Text,
  View,
  Image
} from '@react-pdf/renderer';
// const styles = StyleSheet.create({
//   page: { padding: 30, fontSize: 12 },
//   title: { fontSize: 18, marginBottom: 20, textAlign: 'center' },

//   table: {
//     marginVertical: 10,
//     width: '100%',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     borderBottom: '1 solid #ccc',
//     alignItems: 'center',
//   },
//   tableCol: {
//     width: '25%',
//     padding: 5,
//   },
//   tableHeader: {
//     backgroundColor: '#f0f0f0',
//     fontWeight: 'bold',
//   },
//   total: {
//     marginTop: 20,
//     textAlign: 'right',
//   },
// });

export default function EstimatePDF({
    products,
    discount,
    finalTotal,
}: {
    products: { productId: string; productName: string; quantity: number; price: number }[];
    discount: number;
    finalTotal: number;
}) {
    return (

<Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image style={styles.logo} src="/images/sss.png" />
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>Samir Solar Solutions</Text>
              <Text>Tel: 0995259100</Text>
              <Text>Whatsapp: 03112244118</Text>
              <Text>Email: samirsolarsolutions@gmail.com</Text>
            </View>
          </View>
         
        </View>

        
        {/* Product Table */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Items</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Qty</Text>
            <Text style={styles.tableCell}>Unit Price</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {products.map((product, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{product.productName}</Text>
              <Text style={styles.tableCell}>{product.quantity}</Text>
              <Text style={styles.tableCell}>
                {Number(product.price).toLocaleString('en-PK', {
                  style: 'currency',
                  currency: 'PKR',
                })}
              </Text>
              <Text style={styles.tableCell}>
                {Number(product.price * product.quantity).toLocaleString('en-PK', {
                  style: 'currency',
                  currency: 'PKR',
                })}
              </Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>
              {(finalTotal + discount).toLocaleString('en-PK', {
                style: 'currency',
                currency: 'PKR',
              })}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Discount</Text>
            <Text>
              {discount.toLocaleString('en-PK', {
                style: 'currency',
                currency: 'PKR',
              })}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text>Total</Text>
            <Text>
              {finalTotal.toLocaleString('en-PK', {
                style: 'currency',
                currency: 'PKR',
              })}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footerNote}>
          We appreciate your business and look forward to serving you again.
        </Text>
      </Page>
    </Document>
  );




         
}
