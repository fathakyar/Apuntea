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

export type Language = "en" | "es" | "de" | "fr" | "it" | "pt" | "ar" | "zh" | "tr";

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
    couldNotSaveInvoice: "Could not save the invoice"
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
	subject: "BETREFF",
    message: "MENSAJ",
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
    couldNotSaveInvoice: "Fatura kaydedilemedi"
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
    couldNotSaveInvoice: "No se pudo guardar la factura"
  },
  de: {
    dashboard: "DASHBOARD",
    newRecord: "NEU",
    records: "AUFZEICHNUNGEN",
    agenda: "AGENDA",
    businessIntelligence: "BUSINESS INTELLIGENCE",
    definitions: "DEFINITIONEN",
    settings: "EINSTELLUNGEN",
    logout: "ABMELDEN",
    search: "SUCHE",
    events: "EREIGNISSE",
    whatWeOffer: "WAS WIR ANBIETEN",
    blog: "BLOG",
    contactUs: "KONTAKT",
    aboutApuntea: "ÜBER APUNTEA",
    privacyStatement: "DATENSCHUTZERKLÄRUNG",
    termsConditions: "GESCHÄFTSBEDINGUNGEN",
    cookiePolicy: "COOKIE-RICHTLINIE",
	allRightsReserved: "ALLE RECHTE VORBEHALTEN",
    selectLanguage: "SPRACHE AUSWÄHLEN",
    manageEventsAndReminders: "Verwalten Sie Ereignisse und Erinnerungen",
    eventAdded: "Ereignis hinzugefügt",
    successfullyAdded: "erfolgreich hinzugefügt",
    eventUpdated: "Ereignis aktualisiert",
    successfullyUpdated: "erfolgreich aktualisiert",
    eventDeleted: "Ereignis gelöscht",
    successfullyDeleted: "erfolgreich gelöscht",
    eventSuccessfullyDeleted: "Ereignis erfolgreich gelöscht",
    error: "Fehler",
    new: "NEU",
    uploadNew: "Neu Hochladen",
    exportData: "Daten Exportieren",
    welcomeBack: "WILLKOMMEN ZURÜCK",
    enterCredentials: "GEBEN SIE IHRE ANMELDEDATEN EIN",
    email: "E-MAIL",
    currentPassword: "PASSWORT",
    signingIn: "ANMELDEN",
    signIn: "ANMELDEN",
    demoCredentials: "DEMO-ANMELDEDATEN: ADMIN@APUNTEA.COM / PASSWORD",
    profileUpdated: "Profil Aktualisiert",
    profileUpdatedDescription: "Ihr Profil wurde erfolgreich aktualisiert",
    passwordsDontMatch: "Passwörter stimmen nicht überein",
    securityUpdated: "Sicherheit Aktualisiert",
    securityUpdatedDescription: "Ihre Sicherheitseinstellungen wurden erfolgreich aktualisiert",
    fillAllFields: "Bitte füllen Sie alle Felder aus",
    messageSent: "Nachricht Gesendet",
    messageSentDescription: "Ihre Nachricht wurde erfolgreich gesendet",
    accountSettings: "Kontoeinstellungen und Präferenzen",
    profile: "PROFIL",
    plansAndPricing: "PLÄNE & PREISE",
    help: "HILFE",
    uploadImage: "BILD HOCHLADEN",
    enterName: "Namen eingeben",
    company: "UNTERNEHMEN",
    enterCompany: "Unternehmensnamen eingeben",
    city: "STADT",
    enterCity: "Stadt eingeben",
    country: "LAND",
    enterCountry: "Land eingeben",
    position: "POSITION",
    enterPosition: "Position eingeben",
    save: "SPEICHERN",
    styles: "STILE",
    darkMode: "Dunkler Modus",
    enableDarkMode: "Dunklen Modus für die Anwendung aktivieren",
    languages: "SPRACHEN",
    security: "SICHERHEIT",
    newPassword: "NEUES PASSWORT",
    confirmPassword: "PASSWORT BESTÄTIGEN",
    monthly: "MONATLICH",
    yearly: "JÄHRLICH",
    free: "KOSTENLOS",
    currentPlan: "AKTUELLER PLAN",
    standard: "STANDARD",
    upgrade: "UPGRADE",
    business: "BUSINESS",
	subject: "BETREFF",
    message: "NACHRICHT",
    send: "SENDEN",
    analyticsAndInsights: "Analysen und Einblicke für Ihr Unternehmen",
    revenueOverview: "Umsatzübersicht",
    monthlyRevenueTrends: "Monatliche Umsatztrends",
    expenseBreakdown: "Kostenzusammenstellung",
    expensesByCategory: "Ausgaben nach Kategorie",
    salesByProduct: "Verkäufe nach Produkt",
    quarterlyProductSales: "Vierteljährliche Produktverkäufe",
    customerGrowth: "Kundenwachstum",
    monthlyNewCustomers: "Monatliche Neukundengewinnung",
    office: "Büro",
    salary: "Gehalt",
    marketing: "Marketing",
    travel: "Reise",
    other: "Andere",
	manageCategories: "Systemkategorien und Unterkategorien verwalten",
    income: "EINKOMMEN",
    expense: "AUSGABE",
    budget: "BUDGET",
    currency: "WÄHRUNG",
    budgetSyncDescription: "Automatisch mit den Kategorien EINKOMMEN und AUSGABEN synchronisiert",
    welcomeToApuntea: "Willkommen bei Apuntea",
    intelligentInvoiceManagement: "Intelligente Rechnungsverwaltung leicht gemacht",
    totalInvoices: "Gesamtzahl Rechnungen",
    recent30Days: "Kürzlich (30 Tage)",
    totalAmount: "Gesamtbetrag",
    recentInvoices: "Kürzliche Rechnungen",
    mostRecentlyAddedInvoices: "Ihre zuletzt hinzugefügten Rechnungen",
    noInvoicesYet: "Noch keine Rechnungen",
    viewAllInvoices: "Alle Rechnungen anzeigen",
    actions: "Aktionen",
    quickLinksToTasks: "Schnelllinks zu häufigen Aufgaben",
    manageRecords: "Aufzeichnungen verwalten",
    proTip: "Profi-Tipp",
    scanInvoiceWithPhone: "Scannen Sie eine Rechnung mit Ihrer Handykamera, um Daten sofort zu extrahieren und zu verarbeiten.",
    invoiceRecords: "Rechnungsaufzeichnungen",
    manageAllInvoices: "Verwalten Sie alle Ihre Rechnungsaufzeichnungen an einem Ort",
    invoiceDeleted: "Rechnung gelöscht",
    invoiceSuccessfullyDeleted: "Rechnung wurde erfolgreich gelöscht",
    couldNotDeleteInvoice: "Rechnung konnte nicht gelöscht werden",
    exportSuccessful: "Export erfolgreich",
    invoiceDataExported:
