export const items = [
  {
    title: 'Revenue',
    description: ' Show the total amount of the handphones sold to the customers and the total amount of the accessories sold to the customers. ', 				
    isHeader: true,
  },
  {
    title: 'Handphones',
    value: 1125000000,
    description: 'Revenue from handphone sales to customers.',
    isHeader: false,
  },
  {
    title: 'Cases, Earphones, Chargers',
    value: 5000000, 
    description: 'Revenue from accessories including cases, earphones, and chargers sold to customers.',
    isHeader: false,
  },
  {
    title: 'Total Revenue',
    value: 1130000000, 
    description: 'Total gross revenue accumulated from all product lines sold to customers.',
    isHeader: false,
  },
  {
    title: 'COGS',
    description: 'Show the cost of goods sold for the handphones and accessories sold to the customers and the total cost of goods sold for all products sold to the customers and the total cost of goods sold for all products sold to the customers.',
    isHeader: true,
  },
  {
    title: 'Handphones',
    value: -953750000,
    description: 'Costs related to handphone procurement.',
    isHeader: false,
    isNegative: true,
  },
  {
    title: 'Cases, Earphones, Chargers',
    value: -4000000, 
    description: 'Costs related to accessories production and procurement .',
    isHeader: false,
    isNegative: true,
  },
  {
    title: 'Total COGS',
    value: -957750000, 
    description: 'Total direct costs for product procurement and inventory management.',
    isHeader: false,
    isNegative: true,
  },
  {
    title: 'Gross Profit',
    value: 172250000, 
    description: 'Gross profit before operational expenses are deducted from revenue generated.',
    isHighlight: true,
    isHeader: false,
  },
  {
    title: 'Operating Expenses',
    description: 'Daily operational costs required to sustain business activities and operations and the total operational costs required to sustain business activities and operations.',
    isSection: true,
    isHeader: true,
  },
  { 
    title: 'Salary', 
    value: -26000000,
    description: 'Employee salary',
    isHeader: false,
    isNegative: true,
  },
  { 
    title: 'Rental', 
    value: -7000000,
    description: 'Rental cost that need to be paid every month for the store .',
    isHeader: false,
    isNegative: true,
  },
  { 
    title: 'Electricity', 
    value: -2000000,
    description: 'Electricity fee Utility costs for electricity.',
    isHeader: false,
    isNegative: true,
  },
  { 
    title: 'Internet', 
    value: -450000,
    description: 'Internet monthly subscription.',
    isHeader: false,
    isNegative: true,
  },
  { 
    title: 'Office Supplies', 
    value: -500000, 
    description: 'Cleaning supplies, mineral waters and other small items.',
    isHeader: false,
    isNegative: true,
  },
  { 
    title: 'Depreciation', 
    value: -750000,
    description: 'Expense recognition for the declining value of assets over time.',
    isHeader: false,
    isNegative: true,
  },
  { 
    title: 'Total Operating Expenses', 
    value: -36700000,
    description: 'Total operational costs required to maintain business operations.',
    isHeader: false,
    isNegative: true,
  },
  { 
    title: 'Net Income', 
    value: 307800000, 
    description: 'Final profit after all expenses.',
    isHighlight: true,
    isHeader: false,
    isNegative: false,
  }
];



export const balanceSheetItems = [
  { title: 'Assets', isHeader: true, description: 'assets are economic resources owned by the company that can contribute to revenue. For example, production machines used to manufacture goods or buildings used as business premises are all assets that ultimately affect the companys profit and loss.' },
  { title: 'Current Assets', isHeader: true, description: 'Assets that are expected to be converted into cash within one year' },
  { title: 'Cash', value: 5050000, description: 'Total cash at the end of the month' },
  { title: 'Bank', value: 37900000, description: 'Total bank at the end of the month' },
  { title: 'Account Receivables', value: 225000000, description: 'Balance of not yet recived by customers' },
  { title: 'Inventory', value: 192875000, description: 'Remaining inventory at the end of the month' },
  { title: 'Total Current Assets', value: 460825000, isSection: true, description: 'Sum of all current assets' },
  
  { title: 'Fixed Assets', isHeader: true, description: 'Assets that are expected to be used for more than one year' },
  { title: 'Cost:', isHeader: true , description: 'Total cost of fixed assets' }, 
  { title: 'Store Equipments', value: 14000000, description: 'Equipments owned and placed at the store' },
  { title: 'Store Furniture', value: 22000000, description: 'Furniture owned and placed at the store' },
  { title: 'Total Cost', value: 36000000, isSection: true, description: 'Total cost of fixed assets' },
  
  { title: 'Accumulated Depreciation', value: -9750000, isNegative: true, description: 'Total amount of accummulated deperciation of fixed assets' },
  
  { title: 'Net Book Value', value: 26250000, isSection: true, description: 'Fixed assets minus accumulated depreciation' },
  
  { title: 'Total Assets', value: 487075000, isHighlight: true, description: 'Sum of all company assets' },
  
  { title: 'Liabilities', isHeader: true, description: 'Liabilities are obligations that the company must pay to third parties. For example, if the company borrows money from a bank, the company is obliged to pay back the loan amount to the bank. This obligation is a liability.' },
  { title: 'Current Liabilities', isHeader: true, description: 'Current Liabilities are short-term financial obligations that a company must settle within one year or within its normal operating cycle, whichever is longer.' },
  { title: 'Account Payables', value: 212975000, description: 'Amounts owed to suppliers' },
  { title: 'Total Liabilities', value: 212975000, isSection: true, description: 'Sum of all liabilities' },
  { title: 'Equity', isHeader: true, description: 'Amount of capital that was placed to run the operations' },
  { title: 'Share Capital', value: 100000000, description: 'Value of issued shares' },
  { title: 'Retained Earnings', value: 174100000, description: 'Accumulated income/ loss from the beginning until current position' },
  { title: 'Total Equity', value: 274100000, isSection: true, description: 'Sum of all equity' },
  
  { title: 'Total Liabilities & Equity', value: 487075000, isHighlight: true, description: 'Sum of liabilities and equity ' }
];