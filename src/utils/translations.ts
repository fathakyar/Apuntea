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
  | "couldNotSaveInvoice";

export type Language = "en" | "es" | "tr";

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
    cookieControlText: "Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect your experience of our platform.",
  },
  es: {
    dashboard: "PANEL DE CONTROL",
    newRecord: "NUEVO",
    records: "REGISTROS",
    agenda: "AGENDA",
    businessIntelligence: "INTELIGENCIA DE NEGOCIOS",
    definitions: "DEFINICIONES",
    settings: "AJUSTES",
    logout: "CERRAR SESIÓN",
    search: "BUSCAR",
    events: "EVENTOS",
    whatWeOffer: "LO QUE OFRECEMOS",
    blog: "BLOG",
    contactUs: "CONTÁCTENOS",
    aboutApuntea: "SOBRE APUNTEA",
    privacyStatement: "POLÍTICA DE PRIVACIDAD",
    termsConditions: "TÉRMINOS Y CONDICIONES",
    cookiePolicy: "POLÍTICA DE COOKIES",
    allRightsReserved: "TODOS LOS DERECHOS RESERVADOS",
    selectLanguage: "SELECCIONAR IDIOMA",
    manageEventsAndReminders: "Gestiona eventos y recordatorios",
    eventAdded: "Evento añadido",
    successfullyAdded: "añadido con éxito",
    eventUpdated: "Evento actualizado",
    successfullyUpdated: "actualizado con éxito",
    eventDeleted: "Evento eliminado",
    successfullyDeleted: "eliminado con éxito",
    eventSuccessfullyDeleted: "Evento eliminado con éxito",
    error: "Error",
    new: "NUEVO",
    uploadNew: "Subir Nuevo",
    exportData: "Exportar Datos",
    welcomeBack: "BIENVENIDO DE NUEVO",
    enterCredentials: "INGRESE SUS CREDENCIALES",
    email: "CORREO ELECTRÓNICO",
    currentPassword: "CONTRASEÑA",
    signingIn: "INICIANDO SESIÓN",
    signIn: "INICIAR SESIÓN",
    demoCredentials: "CREDENCIALES DE DEMO: ADMIN@APUNTEA.COM / PASSWORD",
    profileUpdated: "Perfil Actualizado",
    profileUpdatedDescription: "Tu perfil ha sido actualizado con éxito",
    passwordsDontMatch: "Las contraseñas no coinciden",
    securityUpdated: "Seguridad Actualizada",
    securityUpdatedDescription: "Tus configuraciones de seguridad han sido actualizadas con éxito",
    fillAllFields: "Por favor completa todos los campos",
    messageSent: "Mensaje Enviado",
    messageSentDescription: "Tu mensaje ha sido enviado con éxito",
    accountSettings: "Configuraciones y preferencias de la cuenta",
    profile: "PERFIL",
    plansAndPricing: "PLANES Y PRECIOS",
    help: "AYUDA",
    uploadImage: "SUBIR IMAGEN",
    enterName: "Ingresar nombre",
    company: "EMPRESA",
    enterCompany: "Ingresar nombre de empresa",
    city: "CIUDAD",
    enterCity: "Ingresar ciudad",
    country: "PAÍS",
    enterCountry: "Ingresar país",
    position: "POSICIÓN",
    enterPosition: "Ingresar posición",
    save: "GUARDAR",
    styles: "ESTILOS",
    darkMode: "Modo Oscuro",
    enableDarkMode: "Habilitar modo oscuro para la aplicación",
    languages: "IDIOMAS",
    security: "SEGURIDAD",
    newPassword: "NUEVA CONTRASEÑA",
    confirmPassword: "CONFIRMAR CONTRASEÑA",
    monthly: "MENSUAL",
    yearly: "ANUAL",
    free: "GRATIS",
    currentPlan: "PLAN ACTUAL",
    standard: "ESTÁNDAR",
    upgrade: "ACTUALIZAR",
    business: "NEGOCIO",
    subject: "ASUNTO",
    message: "MENSAJE",
    send: "ENVIAR",
    analyticsAndInsights: "Analítica e información para tu negocio",
    revenueOverview: "Visión general de ingresos",
    monthlyRevenueTrends: "Tendencias de ingresos mensuales",
    expenseBreakdown: "Desglose de gastos",
    expensesByCategory: "Gastos por categoría",
    salesByProduct: "Ventas por producto",
    quarterlyProductSales: "Ventas trimestrales de productos",
    customerGrowth: "Crecimiento de clientes",
    monthlyNewCustomers: "Adquisición mensual de nuevos clientes",
    office: "Oficina",
    salary: "Salario",
    marketing: "Márketing",
    travel: "Viajes",
    other: "Otro",
    manageCategories: "Administrar categorías y subcategorías del sistema",
    income: "INGRESOS",
    expense: "GASTOS",
    budget: "PRESUPUESTO",
    currency: "MONEDA",
    budgetSyncDescription: "Sincronizado automáticamente con las categorías de INGRESOS y GASTOS",
    welcomeToApuntea: "Bienvenido a Apuntea",
    intelligentInvoiceManagement: "Gestión inteligente de facturas simplificada",
    totalInvoices: "Total de facturas",
    recent30Days: "Reciente (30 días)",
    totalAmount: "Cantidad total",
    recentInvoices: "Facturas recientes",
    mostRecentlyAddedInvoices: "Sus facturas agregadas más recientemente",
    noInvoicesYet: "Aún no hay facturas",
    viewAllInvoices: "Ver todas las facturas",
    actions: "Acciones",
    quickLinksToTasks: "Enlaces rápidos a tareas comunes",
    manageRecords: "Administrar registros",
    proTip: "Consejo profesional",
    scanInvoiceWithPhone: "Escanee una factura con la cámara de su teléfono para la extracción y el procesamiento instantáneos de datos.",
    invoiceRecords: "Registros de facturas",
    manageAllInvoices: "Administre todos sus registros de facturas en un solo lugar",
    invoiceDeleted: "Factura eliminada",
    invoiceSuccessfullyDeleted: "La factura se ha eliminado correctamente",
    couldNotDeleteInvoice: "No se pudo eliminar la factura",
    exportSuccessful: "Exportación exitosa",
    invoiceDataExported: "Los datos de la factura se han exportado correctamente",
    exportFailed: "Error al exportar",
    couldNotExportData: "No se pudieron exportar los datos de la factura",
    back: "Atrás",
    editInvoice: "Editar factura",
    updateInvoiceInfo: "Actualizar información de la factura",
    documentPreview: "Vista previa del documento",
    viewOriginalDocument: "Ver el documento original",
    openOriginalDocument: "Abrir documento original",
    editInvoiceDetails: "Editar detalles de la factura",
    updateInvoiceInfoNeeded: "Actualice la información de la factura según sea necesario",
    updateInvoice: "Actualizar factura",
    invoiceUpdated: "Factura actualizada",
    invoiceSuccessfullyUpdated: "La factura se ha actualizado correctamente",
    errorUpdatingInvoice: "Error al actualizar la factura",
    couldNotUpdateInvoice: "No se pudo actualizar la factura",
    invoiceNotFound: "Factura no encontrada",
    uploadInvoice: "Subir factura",
    uploadInvoiceForExtraction: "Sube tu factura para la extracción automática de datos",
    uploadError: "Error de carga",
    uploadInvoiceFormatInfo: "Sube tu factura como PDF, JPG o PNG",
    extractingData: "Extrayendo datos...",
    pleaseWaitProcessing: "Por favor, espere mientras procesamos su factura",
    reviewUploadedDocument: "Revisa el documento subido",
    pdfDocumentUploaded: "Documento PDF subido",
    invoiceDetails: "Detalles de la factura",
    saveInvoice: "Guardar factura",
    dataExtracted: "Datos extraídos",
    verifyExtractedInfo: "Verifique y complete la información extraída",
    extractionFailed: "Extracción fallida",
    couldNotExtractData: "No se pudieron extraer datos del documento",
    noFileSelected: "Ningún archivo seleccionado",
    invoiceSaved: "Factura guardada",
    invoiceSuccessfullySaved: "La factura se ha guardado correctamente",
    errorSavingInvoice: "Error al guardar la factura",
    couldNotSaveInvoice: "No se pudo guardar la factura",
    
    // Privacy Policy
    privacyIntro: "Bienvenido a la Política de Privacidad de Apuntea. Este documento describe cómo recopilamos, utilizamos y protegemos su información personal.",
    dataCollection: "Recopilación de Datos",
    dataCollectionText: "Recopilamos información que nos proporciona directamente, incluyendo nombre, dirección de correo electrónico e información de la empresa. También recopilamos automáticamente cierta información sobre su dispositivo.",
    dataUse: "Uso de Datos",
    dataUseText: "Utilizamos la información recopilada para proporcionar y mejorar nuestros servicios, comunicarnos con usted y garantizar la seguridad de nuestra plataforma.",
    dataSecurity: "Seguridad de Datos",
    dataSecurityText: "Implementamos medidas de seguridad apropiadas para proteger su información personal contra acceso, alteración o destrucción no autorizados.",
    contactInfo: "Información de Contacto",
    contactInfoText: "Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en privacy@apuntea.com",
    
    // Terms and Conditions
    termsIntro: "Al acceder y utilizar los servicios de Apuntea, acepta estar sujeto a estos Términos y Condiciones.",
    services: "Servicios",
    servicesText: "Proporcionamos servicios de gestión de facturas e inteligencia empresarial. Nos reservamos el derecho de modificar o discontinuar cualquier servicio en cualquier momento.",
    userObligations: "Obligaciones del Usuario",
    userObligationsText: "Usted es responsable de mantener la confidencialidad de su cuenta y de todas las actividades que ocurran bajo su cuenta.",
    intellectualProperty: "Propiedad Intelectual",
    intellectualPropertyText: "Todo el contenido, características y funcionalidad de nuestros servicios son propiedad de Apuntea y están protegidos por las leyes internacionales de derechos de autor.",
    termination: "Terminación",
    terminationText: "Podemos terminar o suspender su cuenta y acceso a nuestros servicios en cualquier momento por cualquier razón sin previo aviso.",
    
    // Cookie Policy
    cookieIntro: "Esta Política de Cookies explica cómo Apuntea utiliza cookies y tecnologías similares para reconocerlo cuando visita nuestra plataforma.",
    whatAreCookies: "Qué Son las Cookies",
    whatAreCookiesText: "Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Nos ayudan a brindarle una mejor experiencia de usuario.",
    cookieTypes: "Tipos de Cookies que Utilizamos",
    cookieTypesText: "Utilizamos cookies esenciales para la funcionalidad básica, cookies analíticas para mejorar nuestros servicios y cookies de preferencias para recordar su configuración.",
    cookieControl: "Control de Cookies",
    cookieControlText: "La mayoría de los navegadores web permiten controlar las cookies a través de sus preferencias de configuración. Sin embargo, limitar las cookies puede afectar su experiencia en nuestra plataforma.",
  },
  tr: {
    dashboard: "GÖSTERGE PANELİ",
    newRecord: "+YENİ",
    records: "KAYITLAR",
    agenda: "AJANDA",
    definitions: "TANIMLAMALAR",
    settings: "AYARLAR",
    logout: "ÇIKIŞ YAP",
    search: "ARA",
    events: "ETKİNLİKLER",
    whatWeOffer: "SUNDUKLARIMIZ",
    blog: "BLOG",
    contactUs: "BİZE ULAŞIN",
    aboutApuntea: "APUNTEA HAKKINDA",
    privacyStatement: "GİZLİLİK BİLDİRİMİ",
    termsConditions: "ŞARTLAR VE KOŞULLAR",
    cookiePolicy: "ÇEREZLERİ POLİTİKASI",
    allRightsReserved: "TÜM HAKLARI SAKLIDIR",
    selectLanguage: "DİL SEÇİN",
    manageEventsAndReminders: "Etkinlikleri ve hatırlatıcıları yönetin",
    eventAdded: "Etkinlik eklendi",
    successfullyAdded: "başarıyla eklendi",
    eventUpdated: "Etkinlik güncellendi",
    successfullyUpdated: "başarıyla güncellendi",
    eventDeleted: "Etkinlik silindi",
    successfullyDeleted: "başarıyla silindi",
    eventSuccessfullyDeleted: "Etkinlik başarıyla silindi",
    error: "Hata",
    new: "YENİ",
    uploadNew: "Yeni Yükle",
    exportData: "Verileri Dışa Aktar",
    welcomeBack: "TEKRAR HOŞGELDİNİZ",
    enterCredentials: "BİLGİLERİNİZİ GİRİN",
    email: "E-POSTA",
    currentPassword: "ŞİFRE",
    signingIn: "GİRİŞ YAPILIYOR",
    signIn: "GİRİŞ YAP",
    demoCredentials: "DEMO BİLGİLERİ: ADMIN@APUNTEA.COM / PASSWORD",
    profileUpdated: "Profil Güncellendi",
    profileUpdatedDescription: "Profiliniz başarıyla güncellendi",
    passwordsDontMatch: "Şifreler eşleşmiyor",
    securityUpdated: "Güvenlik Güncellendi",
    securityUpdatedDescription: "Güvenlik ayarlarınız başarıyla güncellendi",
    fillAllFields: "Lütfen tüm alanları doldurun",
    messageSent: "Mesaj Gönderildi",
    messageSentDescription: "Mesajınız başarıyla gönderildi",
    accountSettings: "Hesap ayarları ve tercihleri",
    profile: "PROFIL",
    plansAndPricing: "PLANLAR VE FİYATLANDIRMA",
    help: "YARDIM",
    uploadImage: "RESİM YÜKLE",
    enterName: "İsim girin",
    company: "ŞİRKET",
    enterCompany: "Şirket adı girin",
    city: "ŞEHİR",
    enterCity: "Şehir girin",
    country: "ÜLKE",
    enterCountry: "Ülke girin",
    position: "POZİSYON",
    enterPosition: "Pozisyon girin",
    save: "KAYDET",
    styles: "STİLLER",
    darkMode: "Karanlık Mod",
    enableDarkMode: "Uygulama için karanlık modu etkinleştir",
    languages: "DİLLER",
    security: "GÜVENLİK",
    newPassword: "YENİ ŞİFRE",
    confirmPassword: "ŞİFREYİ ONAYLA",
    monthly: "AYLIK",
    yearly: "YILLIK",
    free: "ÜCRETSİZ",
    currentPlan: "MEVCUT PLAN",
    standard: "STANDART",
    upgrade: "YÜKSELT",
    business: "İŞ",
    subject: "KONU",
    message: "MESAJ",
    send: "GÖNDER",
    businessIntelligence: ".BI",
    analyticsAndInsights: "İşletmeniz için analitik ve öngörüler",
    revenueOverview: "Gelir Genel Bakışı",
    monthlyRevenueTrends: "Aylık gelir trendleri",
    expenseBreakdown: "Gider Dağılımı",
    expensesByCategory: "Kategoriye göre giderler",
    salesByProduct: "Ürüne Göre Satışlar",
    quarterlyProductSales: "Üç aylık ürün satışları",
    customerGrowth: "Müşteri Büyümesi",
    monthlyNewCustomers: "Aylık yeni müşteri kazanımı",
    office: "Ofis",
    salary: "Maaş",
    marketing: "Pazarlama",
    travel: "Seyahat",
    other: "Diğer",
    manageCategories: "Sistem kategorilerini ve alt kategorilerini yönetin",
    income: "GELİR",
    expense: "GİDER",
    budget: "BÜTÇE",
    currency: "PARA BİRİMİ",
    budgetSyncDescription: "GELİR ve GİDER kategorileri ile otomatik olarak senkronize edilir",
    welcomeToApuntea: "Apuntea'ya Hoşgeldiniz",
    intelligentInvoiceManagement: "Akıllı fatura yönetimi basitleştirildi",
    totalInvoices: "Toplam Faturalar",
    recent30Days: "Son (30 gün)",
    totalAmount: "Toplam Tutar",
    recentInvoices: "Son Faturalar",
    mostRecentlyAddedInvoices: "En son eklenen faturalarınız",
    noInvoicesYet: "Henüz fatura yok",
    viewAllInvoices: "Tüm Faturaları Görüntüle",
    actions: "İşlemler",
    quickLinksToTasks: "Ortak görevlere hızlı bağlantılar",
    manageRecords: "Kayıtları Yönet",
    proTip: "Pro İpucu",
    scanInvoiceWithPhone: "Anında veri çıkarma ve işleme için telefonunuzun kamerasıyla bir faturayı tarayın.",
    invoiceRecords: "Fatura Kayıtları",
    manageAllInvoices: "Tüm fatura kayıtlarınızı tek bir yerden yönetin",
    invoiceDeleted: "Fatura silindi",
    invoiceSuccessfullyDeleted: "Fatura başarıyla silindi",
    couldNotDeleteInvoice: "Fatura silinemedi",
    exportSuccessful: "Dışa aktarma başarılı",
    invoiceDataExported: "Fatura verileri başarıyla dışa aktarıldı",
    exportFailed: "Dışa aktarma başarısız",
    couldNotExportData: "Fatura verileri dışa aktarılamadı",
    back: "Geri",
    editInvoice: "Faturayı Düzenle",
    updateInvoiceInfo: "Fatura bilgilerini güncelle",
    documentPreview: "Belge Önizleme",
    viewOriginalDocument: "Orijinal belgeyi görüntüle",
    openOriginalDocument: "Orijinal Belgeyi Aç",
    editInvoiceDetails: "Fatura Ayrıntılarını Düzenle",
    updateInvoiceInfoNeeded: "Gerekli fatura bilgilerini güncelleyin",
    updateInvoice: "Faturayı Güncelle",
    invoiceUpdated: "Fatura güncellendi",
    invoiceSuccessfullyUpdated: "Fatura başarıyla güncellendi",
    errorUpdatingInvoice: "Fatura güncellenirken hata",
    couldNotUpdateInvoice: "Fatura güncellenemedi",
    invoiceNotFound: "Fatura bulunamadı",
    uploadInvoice: "Fatura Yükle",
    uploadInvoiceForExtraction: "Otomatik veri çıkarma için faturanızı yükleyin",
    uploadError: "Yükleme Hatası",
    uploadInvoiceFormatInfo: "Faturanızı PDF, JPG veya PNG olarak yükleyin",
    extractingData: "Veriler çıkarılıyor...",
    pleaseWaitProcessing: "Faturanızı işlerken lütfen bekleyin",
    reviewUploadedDocument: "Yüklenen belgeyi inceleyin",
    pdfDocumentUploaded: "PDF belgesi yüklendi",
    invoiceDetails: "Fatura Ayrıntıları",
    saveInvoice: "Faturayı Kaydet",
    dataExtracted: "Veriler çıkarıldı",
    verifyExtractedInfo: "Çıkarılan bilgileri doğrulayın ve tamamlayın",
    extractionFailed: "Çıkarma başarısız",
    couldNotExtractData: "Belgeden veri çıkarılamadı",
    noFileSelected: "Dosya seçilmedi",
    invoiceSaved: "Fatura kaydedildi",
    invoiceSuccessfullySaved: "Fatura başarıyla kaydedildi",
    errorSavingInvoice: "Fatura kaydedilirken hata",
    couldNotSaveInvoice: "Fatura kaydedilemedi",
    
    // Privacy Policy
    privacyIntro: "Apuntea'nın Gizlilik Politikası'na hoş geldiniz. Bu belge, kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.",
    dataCollection: "Veri Toplama",
    dataCollectionText: "Doğrudan bize sağladığınız ad, e-posta adresi ve şirket bilgileri gibi bilgileri topluyoruz. Ayrıca cihazınız hakkında belirli bilgileri otomatik olarak topluyoruz.",
    dataUse: "Veri Kullanımı",
    dataUseText: "Toplanan bilgileri hizmetlerimizi sağlamak ve geliştirmek, sizinle iletişim kurmak ve platformumuzun güvenliğini sağlamak için kullanıyoruz.",
    dataSecurity: "Veri Güvenliği",
    dataSecurityText: "Kişisel bilgilerinizi yetkisiz erişime, değiştirilmeye veya yok edilmeye karşı korumak için uygun güvenlik önlemleri uyguluyoruz.",
    contactInfo: "İletişim Bilgileri",
    contactInfoText: "Bu Gizlilik Politikası hakkında sorularınız varsa, lütfen privacy@apuntea.com adresinden bizimle iletişime geçin.",
    
    // Terms and Conditions
    termsIntro: "Apuntea'nın hizmetlerine erişerek ve kullanarak, bu Şartlar ve Koşullara bağlı kalmayı kabul etmiş olursunuz.",
    services: "Hizmetler",
    servicesText: "Fatura yönetimi ve iş zekası hizmetleri sunuyoruz. Herhangi bir
