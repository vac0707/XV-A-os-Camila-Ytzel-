import { Users, Utensils, Sparkles, Heart, Music, Camera, Gift } from 'lucide-react';
import { ItineraryItem, BankAccount } from '../types';

// --- Event Dates & Time ---
// Camila Ytzel Figueroa Zapata's event is on August 7th, 2026
export const EVENT_DATE = new Date('2026-08-07T18:00:00'); // Year, Month (0-indexed, so 7 is August), Day, Hour

// --- Music URL ---
// Ambient premium soundtrack for the Greek Mythology theme
export const MUSIC_URL = "https://res.cloudinary.com/dcnynnstm/video/upload/v1784658598/Journey_To_Bethlehem_-_We_Become_We_Fiona_Palomo_Milo_Manheim_Movie_Scene_w3rm0h.mp3";

// --- Images (All Greek Temple and Portrait Photo URLs from Camila Ytzel's session) ---
export const COVER_IMAGE = "https://res.cloudinary.com/dcnynnstm/image/upload/v1784661259/01_xvuxvm.png";
export const BG_PATTERN = "https://res.cloudinary.com/dcnynnstm/image/upload/v1773723965/497927484_1363051325167172_558942534762591556_n_w2cdp4.jpg";

export const GALLERY_IMAGES = [
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1784661305/06_odvdmt.png",
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1784661264/04_rxzuxu.png",
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1784661261/05_rxkqbg.png",
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1784661260/03_lsem81.png",
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1784661260/02_lzqbvp.png",
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1784661259/01_xvuxvm.png"
];

// --- Quinceañera Names & Titles ---
export const QUINCE_NAME_FIRST = "Ytzel";
export const QUINCE_NAME_LAST_1 = "FIGUEROA";
export const QUINCE_NAME_LAST_2 = "ZAPATA";
export const EVENT_TITLE = "Mis XV Años";
export const EVENT_THEME = "Mitología Griega";

// --- Location Details ---
export const LOCATION_NAME = "Andina Real";
export const LOCATION_ADDRESS = "Jirón 2 de Mayo Nº 106, Huancané";
export const LOCATION_MAP_URL = "https://maps.app.goo.gl/cbZKGobwPYLni9gL8";

// --- WhatsApp RSVP Settings ---
// [RESERVED SPACE] - Change this phone number to the Quinceañera's WhatsApp number for real RSVP
export const WHATSAPP_RSVP_NUMBER = "51961793504"; 
export const WHATSAPP_RSVP_TEXT = "Hola Elia Denisse, confirmo mi asistencia a la fiesta de XV años de Ytzel. ¡Muchas gracias!";

// --- Quotes (Reserved Spaces) ---
export const HERO_QUOTE = "“Como en la mitología, cada sueño me hace más fuerte para escribir mi propia historia.”";
export const INVITATION_INTRO = "Te invito a ser parte de mi propia leyenda y compartir conmigo una noche mágica e inolvidable.";
export const FOOTER_QUOTE = "“Los dioses me dieron la vida, pero ustedes me enseñan a vivirla.”";

// --- Family Section Data ---
export const MOTHER = "Elia Denisse Zapata Sacaca";

export const SPONSORS = [
  "Regner Aljobin Justo Laime", // Padrino
  "Soledad Quilla Tipula" // Madrina
];

// --- Itinerary Items (Template of 5 main events from the reference design layout) ---
export const ITINERARY_ITEMS: ItineraryItem[] = [
  {
    time: "18:00 hrs",
    title: "ENTRADA AL REINO CELESTIAL",
    description: "Llegada de invitados",
    icon: Users
  },
  {
    time: "20:00 hrs",
    title: "LA CEREMONIA SAGRADA",
    description: "La ceremonia sagrada comenzará",
    icon: Sparkles
  },
  {
    time: "22:00 hrs",
    title: "BRINDIS DE HONOR",
    description: "Brindis de honor con la bendición de los dioses",
    icon: Heart
  },
  {
    time: "22:30 hrs",
    title: "BANQUETE DE HÉROES Y NINFAS",
    description: "Cena de gala",
    icon: Utensils
  },
  {
    time: "23:00 hrs",
    title: "LA DANZA DE LAS MUSAS",
    description: "El festejo de los dioses (Hora loca)",
    icon: Music
  }
];

// --- Gift Accounts (Reserved Space) ---
export const GIFT_PHRASE = "Tu presencia es mi mejor detalle, pero si deseas tener un detalle conmigo:";
export const GIFT_BANK_ACCOUNTS: BankAccount[] = [
  {
    bank: "Banco BCP (Soles)",
    accountNumber: "193-XXXXXXXX-X-XX", // Placeholder for actual account number
    cci: "002-193-XXXXXXXXXXXX-XX",     // Placeholder for actual CCI
    holder: "Ytzel Figueroa"
  },
  {
    bank: "Banco Interbank (Soles)",
    accountNumber: "200-XXXXXXXXXX",
    cci: "003-200-XXXXXXXXXX-XX",
    holder: "Ytzel Figueroa"
  }
];

// --- Google Drive & Collaborative Gallery Config ---
export const DRIVE_ROOT_FOLDER_ID = "1zkEarqyurAeLFlTqey0JxjHXud6K2FFh";
export const APPS_SCRIPT_URL = (import.meta as any).env?.VITE_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbz9k5SCMq8NA4_EIP1fBRPpD6rK80lMLCZcz4G1qt-BKDvr_YaXJUqnYbUH01tQ3YppuA/exec";
export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'Todas', emoji: '✨' },
  { id: 'official', label: 'Fotos Oficiales', emoji: '📸', folderName: '01_Fotos_Oficiales' },
  { id: 'family', label: 'Familia', emoji: '👨‍👩‍👧', folderName: '02_Familia' },
  { id: 'friends', label: 'Amigos', emoji: '👫', folderName: '03_Amigos' },
  { id: 'dance', label: 'Baile', emoji: '💃', folderName: '04_Baile' },
  { id: 'cake', label: 'Pastel', emoji: '🎂', folderName: '05_Pastel' },
  { id: 'party', label: 'Fiesta', emoji: '🎉', folderName: '06_Fiesta' },
  { id: 'videos', label: 'Videos', emoji: '🎥', folderName: '07_Videos' }
];
