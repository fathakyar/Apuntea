
export type TranslationKey = 
  | "dashboard" 
  | "newRecord" 
  | "records" 
  | "agenda" 
  | "definitions" 
  | "settings" 
  | "logout" 
  | "search" 
  | "events" 
  | "whatWeOffer"
  | "blog"
  | "contactUs"
  | "aboutApuntea"
  | "privacyStatement"
  | "termsConditions"
  | "cookiePolicy"
  | "allRightsReserved"
  | "selectLanguage"
  | "manageEventsAndReminders"
  | "eventAdded"
  | "successfullyAdded"
  | "eventUpdated"
  | "successfullyUpdated"
  | "eventDeleted"
  | "successfullyDeleted"
  | "eventSuccessfullyDeleted"
  | "error"
  | "new"
  | "uploadNew"
  | "exportData"
  | "welcomeBack"
  | "enterCredentials"
  | "email"
  | "currentPassword"
  | "signingIn"
  | "signIn"
  | "demoCredentials"
  | "profileUpdated"
  | "profileUpdatedDescription"
  | "passwordsDontMatch"
  | "securityUpdated"
  | "securityUpdatedDescription"
  | "fillAllFields"
  | "messageSent"
  | "messageSentDescription"
  | "accountSettings"
  | "profile"
  | "plansAndPricing"
  | "help"
  | "uploadImage"
  | "enterName"
  | "company"
  | "enterCompany"
  | "city"
  | "enterCity"
  | "country"
  | "enterCountry"
  | "position"
  | "enterPosition"
  | "save"
  | "styles"
  | "darkMode"
  | "enableDarkMode"
  | "languages"
  | "security"
  | "newPassword"
  | "confirmPassword"
  | "monthly"
  | "yearly"
  | "free"
  | "currentPlan"
  | "standard"
  | "upgrade"
  | "business"
  | "subject"
  | "message"
  | "send"
  // Business Intelligence Translations
  | "businessIntelligence"
  | "analyticsAndInsights"
  | "revenueOverview"
  | "monthlyRevenueTrends"
  | "expenseBreakdown"
  | "expensesByCategory"
  | "salesByProduct"
  | "quarterlyProductSales"
  | "customerGrowth"
  | "monthlyNewCustomers"
  | "office"
  | "salary"
  | "marketing"
  | "travel"
  | "other"
  // Definitions
  | "manageCategories"
  | "income"
  | "expense"
  | "budget"
  | "currency"
  | "budgetSyncDescription"
  // Dashboard
  | "welcomeToApuntea"
  | "intelligentInvoiceManagement"
  | "totalInvoices"
  | "recent30Days"
  | "totalAmount"
  | "recentInvoices"
  | "mostRecentlyAddedInvoices"
  | "noInvoicesYet"
  | "viewAllInvoices"
  | "actions"
  | "quickLinksToTasks"
  | "manageRecords"
  | "proTip"
  | "scanInvoiceWithPhone"
  // Records
  | "invoiceRecords"
  | "manageAllInvoices"
  | "invoiceDeleted"
  | "invoiceSuccessfullyDeleted"
  | "couldNotDeleteInvoice"
  | "exportSuccessful"
  | "invoiceDataExported"
  | "exportFailed"
  | "couldNotExportData"
  // InvoiceEdit
  | "back"
  | "editInvoice"
  | "updateInvoiceInfo"
  | "documentPreview"
  | "viewOriginalDocument"
  | "openOriginalDocument"
  | "editInvoiceDetails"
  | "updateInvoiceInfoNeeded"
  | "updateInvoice"
  | "invoiceUpdated"
  | "invoiceSuccessfullyUpdated"
  | "errorUpdatingInvoice"
  | "couldNotUpdateInvoice"
  | "invoiceNotFound"
  // InvoiceUpload
  | "uploadInvoice"
  | "uploadInvoiceForExtraction"
  | "uploadError"
  | "uploadInvoiceFormatInfo"
  | "extractingData"
  | "pleaseWaitProcessing"
  | "reviewUploadedDocument"
  | "pdfDocumentUploaded"
  | "invoiceDetails"
  | "saveInvoice"
  | "dataExtracted"
  | "verifyExtractedInfo"
  | "extractionFailed"
  | "couldNotExtractData"
  | "noFileSelected"
  | "invoiceSaved"
  | "invoiceSuccessfullySaved"
  | "errorSavingInvoice"
  | "couldNotSaveInvoice"
  // Privacy Policy
  | "privacyIntro"
  | "dataCollection"
  | "dataCollectionText"
  | "dataUse"
  | "dataUseText"
  | "dataSecurity"
  | "dataSecurityText"
  | "contactInfo"
  | "contactInfoText"
  // Terms and Conditions
  | "termsIntro"
  | "services"
  | "servicesText"
  | "userObligations"
  | "userObligationsText"
  | "intellectualProperty"
  | "intellectualPropertyText"
  | "termination"
  | "terminationText"
  // Cookie Policy
  | "cookieIntro"
  | "whatAreCookies"
  | "whatAreCookiesText"
  | "cookieTypes"
  | "cookieTypesText"
  | "cookieControl"
  | "cookieControlText";

export type Language = "en";

// Only English translations
export const translations: Record<Language, Partial<Record<TranslationKey, string>>> = {
  en: {
    dashboard: "DASHBOARD",
    newRecord: "NEW RECORD",
    records: "RECORDS",
    agenda: "AGENDA",
    definitions: "DEFINITIONS",
    settings: "SETTINGS",
    logout: "LOGOUT",
    search: "SEARCH",
    events: "EVENTS",
    whatWeOffer: "WHAT WE OFFER",
    blog: "BLOG",
    contactUs: "CONTACT US",
    aboutApuntea: "ABOUT APUNTEA",
    privacyStatement: "PRIVACY STATEMENT",
    termsConditions: "TERMS & CONDITIONS",
    cookiePolicy: "COOKIE POLICY",
    allRightsReserved: "ALL RIGHTS RESERVED",
    selectLanguage: "SELECT LANGUAGE",
    manageEventsAndReminders: "Manage events and reminders",
    eventAdded: "Event added",
    successfullyAdded: "successfully added",
    eventUpdated: "Event updated",
    successfullyUpdated: "successfully updated",
    eventDeleted: "Event deleted",
    successfullyDeleted: "successfully deleted",
    eventSuccessfullyDeleted: "Event successfully deleted",
    error: "Error",
    new: "NEW",
    uploadNew: "Upload New",
    exportData: "Export Data",
    welcomeBack: "WELCOME BACK",
    enterCredentials: "ENTER YOUR CREDENTIALS",
    email: "EMAIL",
    currentPassword: "PASSWORD",
    signingIn: "SIGNING IN",
    signIn: "SIGN IN",
    demoCredentials: "DEMO CREDENTIALS: ADMIN@APUNTEA.COM / PASSWORD",
    profileUpdated: "Profile Updated",
    profileUpdatedDescription: "Your profile has been updated successfully",
    passwordsDontMatch: "Passwords don't match",
    securityUpdated: "Security Updated",
    securityUpdatedDescription: "Your security settings have been updated successfully",
    fillAllFields: "Please fill all fields",
    messageSent: "Message Sent",
    messageSentDescription: "Your message has been sent successfully",
    accountSettings: "Account settings and preferences",
    profile: "PROFILE",
    plansAndPricing: "PLANS & PRICING",
    help: "HELP",
    uploadImage: "UPLOAD IMAGE",
    enterName: "Enter name",
    company: "COMPANY",
    enterCompany: "Enter company name",
    city: "CITY",
    enterCity: "Enter city",
    country: "COUNTRY",
    enterCountry: "Enter country",
    position: "POSITION",
    enterPosition: "Enter position",
    save: "SAVE",
    styles: "STYLES",
    darkMode: "Dark Mode",
    enableDarkMode: "Enable dark mode for the application",
    languages: "LANGUAGES",
    security: "SECURITY",
    newPassword: "NEW PASSWORD",
    confirmPassword: "CONFIRM PASSWORD",
    monthly: "MONTHLY",
    yearly: "YEARLY",
    free: "FREE",
    currentPlan: "CURRENT PLAN",
    standard: "STANDARD",
    upgrade: "UPGRADE",
    business: "BUSINESS",
    subject: "SUBJECT",
    message: "MESSAGE",
    send: "SEND",
    businessIntelligence: "BUSINESS INTELLIGENCE",
    analyticsAndInsights: "Analytics and insights for your business",
    revenueOverview: "Revenue Overview",
    monthlyRevenueTrends: "Monthly revenue trends",
    expenseBreakdown: "Expense Breakdown",
    expensesByCategory: "Expenses by category",
    salesByProduct: "Sales by Product",
    quarterlyProductSales: "Quarterly product sales",
    customerGrowth: "Customer Growth",
    monthlyNewCustomers: "Monthly new customer acquisition",
    office: "Office",
    salary: "Salary",
    marketing: "Marketing",
    travel: "Travel",
    other: "Other",
    manageCategories: "Manage system categories and subcategories",
    income: "INCOME",
    expense: "EXPENSE",
    budget: "BUDGET",
    currency: "CURRENCY",
    budgetSyncDescription: "Automatically synchronized with INCOME and EXPENSE categories",
    welcomeToApuntea: "Welcome to Apuntea",
    intelligentInvoiceManagement: "Intelligent invoice management made simple",
    totalInvoices: "Total Invoices",
    recent30Days: "Recent (30 days)",
    totalAmount: "Total Amount",
    recentInvoices: "Recent Invoices",
    mostRecentlyAddedInvoices: "Your most recently added invoices",
    noInvoicesYet: "No invoices yet",
    viewAllInvoices: "View All Invoices",
    actions: "Actions",
    quickLinksToTasks: "Quick links to common tasks",
    manageRecords: "Manage Records",
    proTip: "Pro Tip",
    scanInvoiceWithPhone: "Scan an invoice with your phone camera for instant data extraction and processing.",
    invoiceRecords: "Invoice Records",
    manageAllInvoices: "Manage all your invoice records in one place",
    invoiceDeleted: "Invoice deleted",
    invoiceSuccessfullyDeleted: "Invoice has been successfully deleted",
    couldNotDeleteInvoice: "Could not delete the invoice",
    exportSuccessful: "Export successful",
    invoiceDataExported: "Invoice data has been exported successfully",
    exportFailed: "Export failed",
    couldNotExportData: "Could not export invoice data",
    back: "Back",
    editInvoice: "Edit Invoice",
    updateInvoiceInfo: "Update invoice information",
    documentPreview: "Document Preview",
    viewOriginalDocument: "View the original document",
    openOriginalDocument: "Open Original Document",
    editInvoiceDetails: "Edit Invoice Details",
    updateInvoiceInfoNeeded: "Update the invoice information as needed",
    updateInvoice: "Update Invoice",
    invoiceUpdated: "Invoice updated",
    invoiceSuccessfullyUpdated: "Invoice has been successfully updated",
    errorUpdatingInvoice: "Error updating invoice",
    couldNotUpdateInvoice: "Could not update the invoice",
    invoiceNotFound: "Invoice not found",
    uploadInvoice: "Upload Invoice",
    uploadInvoiceForExtraction: "Upload your invoice for automatic data extraction",
    uploadError: "Upload Error",
    uploadInvoiceFormatInfo: "Upload your invoice as PDF, JPG, or PNG",
    extractingData: "Extracting data...",
    pleaseWaitProcessing: "Please wait while we process your invoice",
    reviewUploadedDocument: "Review your uploaded document",
    pdfDocumentUploaded: "PDF document uploaded",
    invoiceDetails: "Invoice Details",
    saveInvoice: "Save Invoice",
    dataExtracted: "Data extracted",
    verifyExtractedInfo: "Verify and complete the extracted information",
    extractionFailed: "Extraction failed",
    couldNotExtractData: "Could not extract data from the document",
    noFileSelected: "No file selected",
    invoiceSaved: "Invoice saved",
    invoiceSuccessfullySaved: "Invoice has been successfully saved",
    errorSavingInvoice: "Error saving invoice",
    couldNotSaveInvoice: "Could not save the invoice",
    
    // Privacy Policy
    privacyIntro: "Welcome to Apuntea's Privacy Policy. This document outlines how we collect, use, and protect your personal information.",
    dataCollection: "Data Collection",
    dataCollectionText: "We collect information that you provide directly to us, including name, email address, and company information. We also automatically collect certain information about your device.",
    dataUse: "Use of Data",
    dataUseText: "We use the collected information to provide and improve our services, communicate with you, and ensure the security of our platform.",
    dataSecurity: "Data Security",
    dataSecurityText: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.",
    contactInfo: "Contact Information",
    contactInfoText: "If you have any questions about this Privacy Policy, please contact us at privacy@apuntea.com",
    
    // Terms and Conditions
    termsIntro: "By accessing and using Apuntea's services, you agree to be bound by these Terms and Conditions.",
    services: "Services",
    servicesText: "We provide invoice management and business intelligence services. We reserve the right to modify or discontinue any service at any time.",
    userObligations: "User Obligations",
    userObligationsText: "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.",
    intellectualProperty: "Intellectual Property",
    intellectualPropertyText: "All content, features, and functionality of our services are owned by Apuntea and are protected by international copyright laws.",
    termination: "Termination",
    terminationText: "We may terminate or suspend your account and access to our services at any time for any reason without notice.",
    
    // Cookie Policy
    cookieIntro: "This Cookie Policy explains how Apuntea uses cookies and similar technologies to recognize you when you visit our platform.",
    whatAreCookies: "What Are Cookies",
    whatAreCookiesText: "Cookies are small text files that are stored on your device when you visit a website. They help us provide you with a better user experience.",
    cookieTypes: "Types of Cookies We Use",
    cookieTypesText: "We use essential cookies for basic functionality, analytical cookies to improve our services, and preference cookies to remember your settings.",
    cookieControl: "Cookie Control",
    cookieControlText: "Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect your experience of our platform."
  }
};
