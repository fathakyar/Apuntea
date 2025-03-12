import { SupportedLanguage } from "@/types";

export interface TranslationKeys {
  welcomeBack: string;
  enterCredentials: string;
  email: string;
  currentPassword: string;
  signIn: string;
  signingIn: string;
  dontHaveAccount: string;
  signUp: string;
  orSignInWith: string;
  signInWithGoogle: string;
  aboutApuntea: string;
  whatWeOffer: string;
  blog: string;
  contactUs: string;
  privacyStatement: string;
  termsConditions: string;
  cookiePolicy: string;
  allRightsReserved: string;
  dashboard: string;
  new: string;
  records: string;
  agenda: string;
  search: string;
  definitions: string;
  settings: string;
  logout: string;
  eventAdded: string;
  successfullyAdded: string;
  eventUpdated: string;
  successfullyUpdated: string;
  eventDeleted: string;
  successfullyDeleted: string;
  eventSuccessfullyDeleted: string;
  businessIntelligence: string;
  analyticsAndInsights: string;
  revenueOverview: string;
  monthlyRevenueTrends: string;
  expenseBreakdown: string;
  expensesByCategory: string;
  office: string;
  salary: string;
  marketing: string;
  travel: string;
  other: string;
  salesByProduct: string;
  quarterlyProductSales: string;
  customerGrowth: string;
  monthlyNewCustomers: string;
  cookieIntro: string;
  whatAreCookies: string;
  whatAreCookiesText: string;
  cookieTypes: string;
  cookieTypesText: string;
  cookieControl: string;
  cookieControlText: string;
  welcomeToApuntea: string;
  intelligentInvoiceManagement: string;
  totalInvoices: string;
  recent30Days: string;
  totalAmount: string;
  recentInvoices: string;
  mostRecentlyAddedInvoices: string;
  noInvoicesYet: string;
  viewAllInvoices: string;
  actions: string;
  quickLinksToTasks: string;
  uploadNew: string;
  manageRecords: string;
  proTip: string;
  scanInvoiceWithPhone: string;
  manageCategories: string;
  error: string;
  invoiceNotFound: string;
  invoiceUpdated: string;
  invoiceSuccessfullyUpdated: string;
  errorUpdatingInvoice: string;
  couldNotUpdateInvoice: string;
  back: string;
  editInvoice: string;
  updateInvoiceInfo: string;
  documentPreview: string;
  viewOriginalDocument: string;
  openOriginalDocument: string;
  editInvoiceDetails: string;
  updateInvoiceInfoNeeded: string;
  updateInvoice: string;
  dataExtracted: string;
  verifyExtractedInfo: string;
  extractionFailed: string;
  couldNotExtractData: string;
  noFileSelected: string;
  invoiceSaved: string;
  invoiceSuccessfullySaved: string;
  couldNotSaveInvoice: string;
  errorSavingInvoice: string;
  uploadInvoice: string;
  uploadInvoiceForExtraction: string;
  uploadError: string;
  uploadInvoiceFormatInfo: string;
  extractingData: string;
  pleaseWaitProcessing: string;
  reviewUploadedDocument: string;
  pdfDocumentUploaded: string;
  invoiceDetails: string;
  privacyIntro: string;
  dataCollection: string;
  dataCollectionText: string;
  dataUse: string;
  dataUseText: string;
  dataSecurity: string;
  dataSecurityText: string;
  contactInfo: string;
  contactInfoText: string;
  invoiceDeleted: string;
  invoiceSuccessfullyDeleted: string;
  couldNotDeleteInvoice: string;
  exportSuccessful: string;
  invoiceDataExported: string;
  exportFailed: string;
  couldNotExportData: string;
  invoiceRecords: string;
  manageAllInvoices: string;
  termsIntro: string;
  services: string;
  servicesText: string;
  userObligations: string;
  userObligationsText: string;
  intellectualProperty: string;
  intellectualPropertyText: string;
  termination: string;
  terminationText: string;
  profileUpdated: string;
  profileUpdatedDescription: string;
  passwordsDontMatch: string;
  fillAllFields: string;
  messageSent: string;
  messageSentDescription: string;
  accountSettings: string;
  plansAndPricing: string;
  help: string;
  profile: string;
  enterName: string;
  company: string;
  enterCompany: string;
  city: string;
  enterCity: string;
  country: string;
  enterCountry: string;
  position: string;
  enterPosition: string;
  save: string;
  styles: string;
  darkMode: string;
  enableDarkMode: string;
  security: string;
  newPassword: string;
  confirmPassword: string;
  monthly: string;
  yearly: string;
  free: string;
  currentPlan: string;
  standard: string;
  business: string;
  upgrade: string;
  subject: string;
  message: string;
  send: string;
  currency: string;
  income: string;
  expense: string;
  budgetSyncDescription: string;
  manageEventsAndReminders: string;
  securityUpdated: string;
  securityUpdatedDescription: string;
  uploadImage: string;
  saveInvoice: string;
}

export const translations: Record<SupportedLanguage, TranslationKeys> = {
  en: {
    welcomeBack: "WELCOME BACK",
    enterCredentials: "ENTER YOUR CREDENTIALS TO CONTINUE",
    email: "EMAIL",
    currentPassword: "PASSWORD",
    signIn: "SIGN IN",
    signingIn: "SIGNING IN...",
    dontHaveAccount: "DON'T HAVE AN ACCOUNT?",
    signUp: "SIGN UP",
    orSignInWith: "OR",
    signInWithGoogle: "SIGN IN WITH GOOGLE",
    aboutApuntea: "About Apuntea",
    whatWeOffer: "What We Offer",
    blog: "Blog",
    contactUs: "Contact Us",
    privacyStatement: "Privacy Statement",
    termsConditions: "Terms & Conditions",
    cookiePolicy: "Cookie Policy",
    allRightsReserved: "All Rights Reserved",
    dashboard: "Dashboard",
    new: "New",
    records: "Records",
    agenda: "Agenda",
    search: "Search",
    definitions: "Definitions",
    settings: "Settings",
    logout: "Logout",
    eventAdded: "Event Added",
    successfullyAdded: "Successfully Added",
    eventUpdated: "Event Updated",
    successfullyUpdated: "Successfully Updated",
    eventDeleted: "Event Deleted",
    successfullyDeleted: "Successfully Deleted",
    eventSuccessfullyDeleted: "Event Successfully Deleted",
    businessIntelligence: "Business Intelligence",
    analyticsAndInsights: "Analytics & Insights",
    revenueOverview: "Revenue Overview",
    monthlyRevenueTrends: "Monthly Revenue Trends",
    expenseBreakdown: "Expense Breakdown",
    expensesByCategory: "Expenses by Category",
    office: "Office",
    salary: "Salary",
    marketing: "Marketing",
    travel: "Travel",
    other: "Other",
    salesByProduct: "Sales by Product",
    quarterlyProductSales: "Quarterly Product Sales",
    customerGrowth: "Customer Growth",
    monthlyNewCustomers: "Monthly New Customers",
    cookieIntro: "Cookie Introduction",
    whatAreCookies: "What Are Cookies",
    whatAreCookiesText: "Cookies are small text files stored on your device",
    cookieTypes: "Cookie Types",
    cookieTypesText: "We use different types of cookies",
    cookieControl: "Cookie Control",
    cookieControlText: "You can control how cookies are used",
    welcomeToApuntea: "Welcome to Apuntea",
    intelligentInvoiceManagement: "Intelligent Invoice Management",
    totalInvoices: "Total Invoices",
    recent30Days: "Recent 30 Days",
    totalAmount: "Total Amount",
    recentInvoices: "Recent Invoices",
    mostRecentlyAddedInvoices: "Most Recently Added Invoices",
    noInvoicesYet: "No Invoices Yet",
    viewAllInvoices: "View All Invoices",
    actions: "Actions",
    quickLinksToTasks: "Quick Links to Tasks",
    uploadNew: "Upload New",
    manageRecords: "Manage Records",
    proTip: "Pro Tip",
    scanInvoiceWithPhone: "Scan Invoice with Phone",
    manageCategories: "Manage Categories",
    error: "Error",
    invoiceNotFound: "Invoice Not Found",
    invoiceUpdated: "Invoice Updated",
    invoiceSuccessfullyUpdated: "Invoice Successfully Updated",
    errorUpdatingInvoice: "Error Updating Invoice",
    couldNotUpdateInvoice: "Could Not Update Invoice",
    back: "Back",
    editInvoice: "Edit Invoice",
    updateInvoiceInfo: "Update Invoice Info",
    documentPreview: "Document Preview",
    viewOriginalDocument: "View Original Document",
    openOriginalDocument: "Open Original Document",
    editInvoiceDetails: "Edit Invoice Details",
    updateInvoiceInfoNeeded: "Update Invoice Info Needed",
    updateInvoice: "Update Invoice",
    dataExtracted: "Data Extracted",
    verifyExtractedInfo: "Verify Extracted Info",
    extractionFailed: "Extraction Failed",
    couldNotExtractData: "Could Not Extract Data",
    noFileSelected: "No File Selected",
    invoiceSaved: "Invoice Saved",
    invoiceSuccessfullySaved: "Invoice Successfully Saved",
    couldNotSaveInvoice: "Could Not Save Invoice",
    errorSavingInvoice: "Error Saving Invoice",
    uploadInvoice: "Upload Invoice",
    uploadInvoiceForExtraction: "Upload Invoice for Extraction",
    uploadError: "Upload Error",
    uploadInvoiceFormatInfo: "Upload Invoice Format Info",
    extractingData: "Extracting Data",
    pleaseWaitProcessing: "Please Wait Processing",
    reviewUploadedDocument: "Review Uploaded Document",
    pdfDocumentUploaded: "PDF Document Uploaded",
    invoiceDetails: "Invoice Details",
    privacyIntro: "Privacy Introduction",
    dataCollection: "Data Collection",
    dataCollectionText: "How we collect your data",
    dataUse: "Data Use",
    dataUseText: "How we use your data",
    dataSecurity: "Data Security",
    dataSecurityText: "How we protect your data",
    contactInfo: "Contact Info",
    contactInfoText: "How to contact us",
    invoiceDeleted: "Invoice Deleted",
    invoiceSuccessfullyDeleted: "Invoice Successfully Deleted",
    couldNotDeleteInvoice: "Could Not Delete Invoice",
    exportSuccessful: "Export Successful",
    invoiceDataExported: "Invoice Data Exported",
    exportFailed: "Export Failed",
    couldNotExportData: "Could Not Export Data",
    invoiceRecords: "Invoice Records",
    manageAllInvoices: "Manage All Invoices",
    termsIntro: "Terms Introduction",
    services: "Services",
    servicesText: "Our services description",
    userObligations: "User Obligations",
    userObligationsText: "Your responsibilities",
    intellectualProperty: "Intellectual Property",
    intellectualPropertyText: "Our IP rights",
    termination: "Termination",
    terminationText: "Account termination terms",
    profileUpdated: "Profile Updated",
    profileUpdatedDescription: "Your profile has been updated successfully",
    passwordsDontMatch: "Passwords Don't Match",
    fillAllFields: "Please Fill All Fields",
    messageSent: "Message Sent",
    messageSentDescription: "Your message has been sent successfully",
    accountSettings: "Account Settings",
    plansAndPricing: "Plans & Pricing",
    help: "Help",
    profile: "Profile",
    enterName: "Enter Name",
    company: "Company",
    enterCompany: "Enter Company",
    city: "City",
    enterCity: "Enter City",
    country: "Country",
    enterCountry: "Enter Country",
    position: "Position",
    enterPosition: "Enter Position",
    save: "Save",
    styles: "Styles",
    darkMode: "Dark Mode",
    enableDarkMode: "Enable Dark Mode",
    security: "Security",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    monthly: "Monthly",
    yearly: "Yearly",
    free: "Free",
    currentPlan: "Current Plan",
    standard: "Standard",
    business: "Business",
    upgrade: "Upgrade",
    subject: "Subject",
    message: "Message",
    send: "Send",
    currency: "Currency",
    income: "Income",
    expense: "Expense",
    budgetSyncDescription: "Sync your budget across devices",
    manageEventsAndReminders: "Manage Events & Reminders",
    securityUpdated: "Security Updated",
    securityUpdatedDescription: "Your security settings have been updated",
    uploadImage: "Upload Image",
    saveInvoice: "Save Invoice"
  },
  es: {
    welcomeBack: "BIENVENIDO DE NUEVO",
    enterCredentials: "INGRESA TUS CREDENCIALES PARA CONTINUAR",
    email: "CORREO ELECTRÓNICO",
    currentPassword: "CONTRASEÑA",
    signIn: "INICIAR SESIÓN",
    signingIn: "INICIANDO SESIÓN...",
    dontHaveAccount: "¿NO TIENES UNA CUENTA?",
    signUp: "REGÍSTRATE",
    orSignInWith: "O",
    signInWithGoogle: "INICIAR SESIÓN CON GOOGLE",
    aboutApuntea: "About Apuntea",
    whatWeOffer: "What We Offer",
    blog: "Blog",
    contactUs: "Contact Us",
    privacyStatement: "Privacy Statement",
    termsConditions: "Terms & Conditions",
    cookiePolicy: "Cookie Policy",
    allRightsReserved: "All Rights Reserved",
    dashboard: "Dashboard",
    new: "New",
    records: "Records",
    agenda: "Agenda",
    search: "Search",
    definitions: "Definitions",
    settings: "Settings",
    logout: "Logout",
    eventAdded: "Event Added",
    successfullyAdded: "Successfully Added",
    eventUpdated: "Event Updated",
    successfullyUpdated: "Successfully Updated",
    eventDeleted: "Event Deleted",
    successfullyDeleted: "Successfully Deleted",
    eventSuccessfullyDeleted: "Event Successfully Deleted",
    businessIntelligence: "Business Intelligence",
    analyticsAndInsights: "Analytics & Insights",
    revenueOverview: "Revenue Overview",
    monthlyRevenueTrends: "Monthly Revenue Trends",
    expenseBreakdown: "Expense Breakdown",
    expensesByCategory: "Expenses by Category",
    office: "Office",
    salary: "Salary",
    marketing: "Marketing",
    travel: "Travel",
    other: "Other",
    salesByProduct: "Sales by Product",
    quarterlyProductSales: "Quarterly Product Sales",
    customerGrowth: "Customer Growth",
    monthlyNewCustomers: "Monthly New Customers",
    cookieIntro: "Cookie Introduction",
    whatAreCookies: "What Are Cookies",
    whatAreCookiesText: "Cookies are small text files stored on your device",
    cookieTypes: "Cookie Types",
    cookieTypesText: "We use different types of cookies",
    cookieControl: "Cookie Control",
    cookieControlText: "You can control how cookies are used",
    welcomeToApuntea: "Welcome to Apuntea",
    intelligentInvoiceManagement: "Intelligent Invoice Management",
    totalInvoices: "Total Invoices",
    recent30Days: "Recent 30 Days",
    totalAmount: "Total Amount",
    recentInvoices: "Recent Invoices",
    mostRecentlyAddedInvoices: "Most Recently Added Invoices",
    noInvoicesYet: "No Invoices Yet",
    viewAllInvoices: "View All Invoices",
    actions: "Actions",
    quickLinksToTasks: "Quick Links to Tasks",
    uploadNew: "Upload New",
    manageRecords: "Manage Records",
    proTip: "Pro Tip",
    scanInvoiceWithPhone: "Scan Invoice with Phone",
    manageCategories: "Manage Categories",
    error: "Error",
    invoiceNotFound: "Invoice Not Found",
    invoiceUpdated: "Invoice Updated",
    invoiceSuccessfullyUpdated: "Invoice Successfully Updated",
    errorUpdatingInvoice: "Error Updating Invoice",
    couldNotUpdateInvoice: "Could Not Update Invoice",
    back: "Back",
    editInvoice: "Edit Invoice",
    updateInvoiceInfo: "Update Invoice Info",
    documentPreview: "Document Preview",
    viewOriginalDocument: "View Original Document",
    openOriginalDocument: "Open Original Document",
    editInvoiceDetails: "Edit Invoice Details",
    updateInvoiceInfoNeeded: "Update Invoice Info Needed",
    updateInvoice: "Update Invoice",
    dataExtracted: "Data Extracted",
    verifyExtractedInfo: "Verify Extracted Info",
    extractionFailed: "Extraction Failed",
    couldNotExtractData: "Could Not Extract Data",
    noFileSelected: "No File Selected",
    invoiceSaved: "Invoice Saved",
    invoiceSuccessfullySaved: "Invoice Successfully Saved",
    couldNotSaveInvoice: "Could Not Save Invoice",
    errorSavingInvoice: "Error Saving Invoice",
    uploadInvoice: "Upload Invoice",
    uploadInvoiceForExtraction: "Upload Invoice for Extraction",
    uploadError: "Upload Error",
    uploadInvoiceFormatInfo: "Upload Invoice Format Info",
    extractingData: "Extracting Data",
    pleaseWaitProcessing: "Please Wait Processing",
    reviewUploadedDocument: "Review Uploaded Document",
    pdfDocumentUploaded: "PDF Document Uploaded",
    invoiceDetails: "Invoice Details",
    privacyIntro: "Privacy Introduction",
    dataCollection: "Data Collection",
    dataCollectionText: "How we collect your data",
    dataUse: "Data Use",
    dataUseText: "How we use your data",
    dataSecurity: "Data Security",
    dataSecurityText: "How we protect your data",
    contactInfo: "Contact Info",
    contactInfoText: "How to contact us",
    invoiceDeleted: "Invoice Deleted",
    invoiceSuccessfullyDeleted: "Invoice Successfully Deleted",
    couldNotDeleteInvoice: "Could Not Delete Invoice",
    exportSuccessful: "Export Successful",
    invoiceDataExported: "Invoice Data Exported",
    exportFailed: "Export Failed",
    couldNotExportData: "Could Not Export Data",
    invoiceRecords: "Invoice Records",
    manageAllInvoices: "Manage All Invoices",
    termsIntro: "Terms Introduction",
    services: "Services",
    servicesText: "Our services description",
    userObligations: "User Obligations",
    userObligationsText: "Your responsibilities",
    intellectualProperty: "Intellectual Property",
    intellectualPropertyText: "Our IP rights",
    termination: "Termination",
    terminationText: "Account termination terms",
    profileUpdated: "Profile Updated",
    profileUpdatedDescription: "Your profile has been updated successfully",
    passwordsDontMatch: "Passwords Don't Match",
    fillAllFields: "Please Fill All Fields",
    messageSent: "Message Sent",
    messageSentDescription: "Your message has been sent successfully",
    accountSettings: "Account Settings",
    plansAndPricing: "Plans & Pricing",
    help: "Help",
    profile: "Profile",
    enterName: "Enter Name",
    company: "Company",
    enterCompany: "Enter Company",
    city: "City",
    enterCity: "Enter City",
    country: "Country",
    enterCountry: "Enter Country",
    position: "Enter Position",
    enterPosition: "Enter Position",
    save: "Save",
    styles: "Styles",
    darkMode: "Dark Mode",
    enableDarkMode: "Enable Dark Mode",
    security: "Security",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    monthly: "Monthly",
    yearly: "Yearly",
    free: "Free",
    currentPlan: "Current Plan",
    standard: "Standard",
    business: "Business",
    upgrade: "Upgrade",
    subject: "Subject",
    message: "Message",
    send: "Send",
    currency: "Currency",
    income: "Income",
    expense: "Expense",
    budgetSyncDescription: "Sync your budget across devices",
    manageEventsAndReminders: "Manage Events & Reminders",
    securityUpdated: "Security Updated",
    securityUpdatedDescription: "Your security settings have been updated",
    uploadImage: "Upload Image",
    saveInvoice: "Save Invoice"
  },
  tr: {
    welcomeBack: "TEKRAR HOŞGELDİNİZ",
    enterCredentials: "DEVAM ETMEK İÇİN KİMLİK BİLGİLERİNİZİ GİRİN",
    email: "E-POSTA",
    currentPassword: "ŞİFRE",
    signIn: "GİRİŞ YAP",
    signingIn: "GİRİŞ YAPILIYOR...",
    dontHaveAccount: "HESABINIZ YOK MU?",
    signUp: "KAYIT OL",
    orSignInWith: "VEYA",
    signInWithGoogle: "GOOGLE İLE GİRİŞ YAP",
    aboutApuntea: "About Apuntea",
    whatWeOffer: "What We Offer",
    blog: "Blog",
    contactUs: "Contact Us",
    privacyStatement: "Privacy Statement",
    termsConditions: "Terms & Conditions",
    cookiePolicy: "Cookie Policy",
    allRightsReserved: "All Rights Reserved",
    dashboard: "Dashboard",
    new: "New",
    records: "Records",
    agenda: "Agenda",
    search: "Search",
    definitions: "Definitions",
    settings: "Settings",
    logout: "Logout",
    eventAdded: "Event Added",
    successfullyAdded: "Successfully Added",
    eventUpdated: "Event Updated",
    successfullyUpdated: "Successfully Updated",
    eventDeleted: "Event Deleted",
    successfullyDeleted: "Successfully Deleted",
    eventSuccessfullyDeleted: "Event Successfully Deleted",
    businessIntelligence: "Business Intelligence",
    analyticsAndInsights: "Analytics & Insights",
    revenueOverview: "Revenue Overview",
    monthlyRevenueTrends: "Monthly Revenue Trends",
    expenseBreakdown: "Expense Breakdown",
    expensesByCategory: "Expenses by Category",
    office: "Office",
    salary: "Salary",
    marketing: "Marketing",
    travel: "Travel",
    other: "Other",
    salesByProduct: "Sales by Product",
    quarterlyProductSales: "Quarterly Product Sales",
    customerGrowth: "Customer Growth",
    monthlyNewCustomers: "Monthly New Customers",
    cookieIntro: "Cookie Introduction",
    whatAreCookies: "What Are Cookies",
    whatAreCookiesText: "Cookies are small text files stored on your device",
    cookieTypes: "Cookie Types",
    cookieTypesText: "We use different types of cookies",
    cookieControl: "Cookie Control",
    cookieControlText: "You can control how cookies are used",
    welcomeToApuntea: "Welcome to Apuntea",
    intelligentInvoiceManagement: "Intelligent Invoice Management",
    totalInvoices: "Total Invoices",
    recent30Days: "Recent 30 Days",
    totalAmount: "Total Amount",
    recentInvoices: "Recent Invoices",
    mostRecentlyAddedInvoices: "Most Recently Added Invoices",
    noInvoicesYet: "No Invoices Yet",
    viewAllInvoices: "View All Invoices",
    actions: "Actions",
    quickLinksToTasks: "Quick Links to Tasks",
    uploadNew: "Upload New",
    manageRecords: "Manage Records",
    proTip: "Pro Tip",
    scanInvoiceWithPhone: "Scan Invoice with Phone",
    manageCategories: "Manage Categories",
    error: "Error",
    invoiceNotFound: "Invoice Not Found",
    invoiceUpdated: "Invoice Updated",
    invoiceSuccessfullyUpdated: "Invoice Successfully Updated",
    errorUpdatingInvoice: "Error Updating Invoice",
    couldNotUpdateInvoice: "Could Not Update Invoice",
    back: "Back",
    editInvoice: "Edit Invoice",
    updateInvoiceInfo: "Update Invoice Info",
    documentPreview: "Document Preview",
    viewOriginalDocument: "View Original Document",
    openOriginalDocument: "Open Original Document",
    editInvoiceDetails: "Edit Invoice Details",
    updateInvoiceInfoNeeded: "Update Invoice Info Needed",
    updateInvoice: "Update Invoice",
    dataExtracted: "Data Extracted",
    verifyExtractedInfo: "Verify Extracted Info",
    extractionFailed: "Extraction Failed",
    couldNotExtractData: "Could Not Extract Data",
    noFileSelected: "No File Selected",
    invoiceSaved: "Invoice Saved",
    invoiceSuccessfullySaved: "Invoice Successfully Saved",
    couldNotSaveInvoice: "Could Not Save Invoice",
    errorSavingInvoice: "Error Saving Invoice",
    uploadInvoice: "Upload Invoice",
    uploadInvoiceForExtraction: "Upload Invoice for Extraction",
    uploadError: "Upload Error",
    uploadInvoiceFormatInfo: "Upload Invoice Format Info",
    extractingData: "Extracting Data",
    pleaseWaitProcessing: "Please Wait Processing",
    reviewUploadedDocument: "Review Uploaded Document",
    pdfDocumentUploaded: "PDF Document Uploaded",
    invoiceDetails: "Invoice Details",
    privacyIntro: "Privacy Introduction",
    dataCollection: "Data Collection",
    dataCollectionText: "How we collect your data",
    dataUse: "Data Use",
    dataUseText: "How we use your data",
    dataSecurity: "Data Security",
    dataSecurityText: "How we protect your data",
    contactInfo: "Contact Info",
    contactInfoText: "How to contact us",
    invoiceDeleted: "Invoice Deleted",
    invoiceSuccessfullyDeleted: "Invoice Successfully Deleted",
    couldNotDeleteInvoice: "Could Not Delete Invoice",
    exportSuccessful: "Export Successful",
    invoiceDataExported: "Invoice Data Exported",
    exportFailed: "Export Failed",
    couldNotExportData: "Could Not Export Data",
    invoiceRecords: "Invoice Records",
    manageAllInvoices: "Manage All Invoices",
    termsIntro: "Terms Introduction",
    services: "Services",
    servicesText: "Our services description",
    userObligations: "User Obligations",
    userObligationsText: "Your responsibilities",
    intellectualProperty: "Intellectual Property",
    intellectualPropertyText: "Our IP rights",
    termination: "Termination",
    terminationText: "Account termination terms",
    profileUpdated: "Profile Updated",
    profileUpdatedDescription: "Your profile has been updated successfully",
    passwordsDontMatch: "Passwords Don't Match",
    fillAllFields: "Please Fill All Fields",
    messageSent: "Message Sent",
    messageSentDescription: "Your message has been sent successfully",
    accountSettings: "Account Settings",
    plansAndPricing: "Plans & Pricing",
    help: "Help",
    profile: "Profile",
    enterName: "Enter Name",
    company: "Company",
    enterCompany: "Enter Company",
    city: "City",
    enterCity: "Enter City",
    country: "Country",
    enterCountry: "Enter Country",
    position: "Enter Position",
    enterPosition: "Enter Position",
    save: "Save",
    styles: "Styles",
    darkMode: "Dark Mode",
    enableDarkMode: "Enable Dark Mode",
    security: "Security",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    monthly: "Monthly",
    yearly: "Yearly",
    free: "Free",
    currentPlan: "Current Plan",
    standard: "Standard",
    business: "Business",
    upgrade: "Upgrade",
    subject: "Subject",
    message: "Message",
    send: "Send",
    currency: "Currency",
    income: "Income",
    expense: "Expense",
    budgetSyncDescription: "Sync your budget across devices",
    manageEventsAndReminders: "Manage Events & Reminders",
    securityUpdated: "Security Updated",
    securityUpdatedDescription: "Your security settings have been updated",
    uploadImage: "Upload Image",
    saveInvoice: "Save Invoice"
  }
};
