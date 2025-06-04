import { Head } from '@inertiajs/react';
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

type InvoiceProduct = {
  invoice: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  discount: number;
  total: string;
  customer_name: string;
};

type GroupedInvoice = {
  invoice: number;
  customer_name: string;
  customer_contact: number;
  created_at: Date;
  discount: number;
  total: string;
  products: InvoiceProduct[];
};

export default function PrintSingleInvoice({ invoiceData }: any) {
  const groupedInvoices: GroupedInvoice[] = [];
  const map = new Map<number, GroupedInvoice>();

  for (const item of invoiceData) {
    if (!map.has(item.invoice)) {
      const newGroup: GroupedInvoice = {
        invoice: item.invoice,
        customer_name: item.customer_name,
        customer_contact: item.contact,
        created_at: new Date(item.created_at),
        discount: item.discount,
        total: item.total,
        products: [],
      };
      map.set(item.invoice, newGroup);
      groupedInvoices.push(newGroup);
    }
    map.get(item.invoice)!.products.push(item);
  }

  const invoiceGroup = groupedInvoices[0];

  const Invoice = () => (
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
          <View style={styles.invoiceInfo}>
            <Text>Invoice #: {invoiceGroup.invoice}</Text>
            <Text>
              Date:{' '}
              {invoiceGroup.created_at.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <View style={styles.customerDetails}>
            <Text>{invoiceGroup.customer_name}</Text>
            <Text>{invoiceGroup.customer_contact}</Text>
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
          {invoiceGroup.products.map((product, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{product.product_name}</Text>
              <Text style={styles.tableCell}>{product.quantity}</Text>
              <Text style={styles.tableCell}>
                {Number(product.unit_price).toLocaleString('en-PK', {
                  style: 'currency',
                  currency: 'PKR',
                })}
              </Text>
              <Text style={styles.tableCell}>
                {Number(product.unit_price * product.quantity).toLocaleString('en-PK', {
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
              {(parseFloat(invoiceGroup.total) + invoiceGroup.discount).toLocaleString('en-PK', {
                style: 'currency',
                currency: 'PKR',
              })}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Discount</Text>
            <Text>
              {invoiceGroup.discount.toLocaleString('en-PK', {
                style: 'currency',
                currency: 'PKR',
              })}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text>Total</Text>
            <Text>
              {parseFloat(invoiceGroup.total).toLocaleString('en-PK', {
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

  if (typeof window === 'undefined') return null;

  return (
    <>
      <Head title="Print Invoice" />
      <div style={{ height: '100vh' }}>
        <PDFViewer width="100%" height="100%">
          <Invoice />
        </PDFViewer>
      </div>
    </>
  );
}
