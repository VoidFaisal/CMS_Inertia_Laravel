import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginBottom: 20,
    borderBottom: '1 solid #ccc',
  },

  logoSection: {
    flexDirection: 'row',
    gap: 10,
  },

  logo: {
    height: 50,
    width: 50,
    marginRight: 10,
  },

  companyInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  invoiceInfo: {
    textAlign: 'right',
    justifyContent: 'flex-end',
  },

  main: {
    flexGrow: 1,
  },

  sectionCard: {
    marginBottom: 20,
    padding: 10,
    border: '1 solid #ddd',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '1 solid #ccc',
    paddingBottom: 5,
  },

  customerDetails: {
    marginBottom: 10,
  },

  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1 solid #000',
    paddingBottom: 4,
    fontWeight: 'bold',
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1 solid #eee',
    paddingVertical: 5,
  },

  tableCell: {
    width: '25%',
    paddingHorizontal: 2,
  },

  summarySection: {
    marginTop: 10,
    borderTop: '1 solid #ccc',
    paddingTop: 10,
    alignItems: 'flex-end',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },

  summaryTotal: {
    fontWeight: 'bold',
    fontSize: 13,
  },

  footerNote: {
    marginTop: 'auto',
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
    title: { fontSize: 18, marginBottom: 20, textAlign: 'center' },

    table: {
        marginVertical: 10,
        width: '100%',
    },
 
    tableCol: {
        width: '25%',
        padding: 5,
    },
    
    total: {
        marginTop: 20,
        textAlign: 'right',
    },
});
