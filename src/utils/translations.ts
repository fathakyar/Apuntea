
import { SupportedLanguage } from "@/types";

// Update the TranslationKeys interface to include the new keys
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
}

// Update the translations object
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
  },
};
