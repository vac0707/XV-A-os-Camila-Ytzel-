import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, Upload, X, Check, Image as ImageIcon, Video, FolderHeart, 
  ChevronLeft, ChevronRight, User, HelpCircle, Copy, AlertCircle, Sparkles, Sliders
} from 'lucide-react';
import { GrecianDivider } from './GreekDecorations';
import { 
  APPS_SCRIPT_URL, DRIVE_ROOT_FOLDER_ID, GALLERY_CATEGORIES, GALLERY_IMAGES, COVER_IMAGE 
} from '../data/eventData';

interface GalleryItem {
  id: string;
  name: string;
  mimeType: string;
  url: string;
  category: string;
  uploader: string;
  created: number;
}

// Sample initial in-memory data for client-side preview when Google Apps Script URL is not configured
const PLACEHOLDER_ITEMS: GalleryItem[] = [
  {
    id: 'placeholder-1',
    name: 'Sesión de Fotos Camila Ytzel 1.jpg',
    mimeType: 'image/jpeg',
    url: GALLERY_IMAGES[0] || COVER_IMAGE,
    category: 'official',
    uploader: 'Camila Ytzel',
    created: Date.now() - 3600000 * 24
  },
  {
    id: 'placeholder-2',
    name: 'Hermosos momentos familiares.jpg',
    mimeType: 'image/jpeg',
    url: GALLERY_IMAGES[1] || COVER_IMAGE,
    category: 'family',
    uploader: 'Denisse Zapata',
    created: Date.now() - 3600000 * 18
  },
  {
    id: 'placeholder-3',
    name: 'Mis mejores amigas en el templo.jpg',
    mimeType: 'image/jpeg',
    url: GALLERY_IMAGES[2] || COVER_IMAGE,
    category: 'friends',
    uploader: 'Luciana',
    created: Date.now() - 3600000 * 12
  },
  {
    id: 'placeholder-4',
    name: 'Ensayo del Baile Sorpresa.mp4',
    mimeType: 'video/mp4',
    url: 'https://res.cloudinary.com/dcnynnstm/video/upload/v1784319757/templ_genecg.mp4',
    category: 'videos',
    uploader: 'Regner Aljobin',
    created: Date.now() - 3600000 * 8
  },
  {
    id: 'placeholder-5',
    name: 'El Gran Pastel del Olimpo.jpg',
    mimeType: 'image/jpeg',
    url: GALLERY_IMAGES[3] || COVER_IMAGE,
    category: 'cake',
    uploader: 'Soledad Quilla',
    created: Date.now() - 3600000 * 6
  },
  {
    id: 'placeholder-6',
    name: 'La fiesta neón mágica.jpg',
    mimeType: 'image/jpeg',
    url: GALLERY_IMAGES[4] || COVER_IMAGE,
    category: 'party',
    uploader: 'Juan Carlos',
    created: Date.now() - 3600000 * 4
  },
  {
    id: 'placeholder-7',
    name: 'Vals de la Quinceañera.jpg',
    mimeType: 'image/jpeg',
    url: COVER_IMAGE,
    category: 'dance',
    uploader: 'Denisse Zapata',
    created: Date.now() - 3600000 * 2
  }
];

export const CollaborativeGallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [items, setItems] = useState<GalleryItem[]>(PLACEHOLDER_ITEMS);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isApiActive, setIsApiActive] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // Upload Form State
  const [guestName, setGuestName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('family');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string>('');

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Drag and Drop State
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  // Fetch items from Google Apps Script Web App
  const fetchGalleryItems = async () => {
    if (!APPS_SCRIPT_URL) {
      console.log('Using beautiful placeholders: Apps Script URL not configured yet.');
      return;
    }

    try {
      setApiError(null);
      const response = await fetch(APPS_SCRIPT_URL);
      const result = await response.json();
      
      if (result.status === 'success' && Array.isArray(result.data)) {
        // Merge fetched items with placeholders (ensuring unique ids, preferring real database elements)
        const fetched: GalleryItem[] = result.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          mimeType: item.mimeType,
          url: item.url,
          category: item.category,
          uploader: item.uploader || 'Invitado',
          created: item.created || Date.now()
        }));

        if (fetched.length > 0) {
          setItems(fetched);
          setIsApiActive(true);
        }
      } else {
        console.warn('Apps Script response unsuccessful:', result);
      }
    } catch (err) {
      console.error('Error fetching collaborative gallery items:', err);
      // Fallback gracefully without breaking UI, as this is standard in development preview
    }
  };

  useEffect(() => {
    fetchGalleryItems();
    if (APPS_SCRIPT_URL) {
      setIsApiActive(true);
    }
  }, []);

  // Filter items based on active category tab
  const filteredItems = items.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Handle Drag Events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  // Handle Drop Event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files) as File[];
      validateAndAddFiles(filesArray);
    }
  };

  // Handle File Selector
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files) as File[];
      validateAndAddFiles(filesArray);
    }
  };

  const validateAndAddFiles = (filesArray: File[]) => {
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'mp4', 'mov'];
    const filtered = filesArray.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      const isSizeValid = file.size <= 15 * 1024 * 1024; // Max 15MB to prevent GAS timeout
      const isExtensionValid = extension && validExtensions.includes(extension);
      return isExtensionValid && isSizeValid;
    });

    if (filtered.length < filesArray.length) {
      alert("Algunos archivos fueron omitidos. Asegúrate de subir únicamente fotos o videos de hasta 15MB cada uno.");
    }

    setSelectedFiles(prev => [...prev, ...filtered]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Helper to read file as Base64 asynchronously
  const readFileAsBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const split = reader.result.split(',');
          const base64 = split[1] || '';
          const mimeType = file.type || 'application/octet-stream';
          resolve({ base64, mimeType });
        } else {
          reject(new Error('Formato de archivo inválido.'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  // Upload handler to Google Apps Script
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    setUploadStatus('uploading');
    setUploadProgress(10);

    const filesUploadedSuccessfully: GalleryItem[] = [];

    try {
      const uploaderName = guestName.trim() || 'Invitado';

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const progressPerFile = 100 / selectedFiles.length;
        setUploadProgress(Math.min(90, Math.round(10 + i * progressPerFile)));

        const { base64, mimeType } = await readFileAsBase64(file);

        // If GAS URL is available, post it to Google Apps Script Web App
        if (APPS_SCRIPT_URL) {
          const payload = {
            filename: `[${uploaderName}]_${Date.now()}_${file.name}`,
            mimeType: mimeType,
            base64: base64,
            category: selectedCategory,
            guestName: uploaderName
          };

          const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(payload)
          });

          const result = await response.json();
          if (result.status === 'success' && result.data) {
            filesUploadedSuccessfully.push({
              id: result.data.id,
              name: result.data.name,
              mimeType: mimeType,
              url: result.data.url,
              category: selectedCategory,
              uploader: uploaderName,
              created: Date.now()
            });
          } else {
            throw new Error(result.message || 'Error en la respuesta del Apps Script.');
          }
        } else {
          // Simulator preview (Runs offline when developer URL is not defined)
          await new Promise(resolve => setTimeout(resolve, 800)); // Simulating upload time
          
          // Create local Object URL to preview instantly
          const localUrl = URL.createObjectURL(file);
          filesUploadedSuccessfully.push({
            id: `local-upload-${Date.now()}-${i}`,
            name: file.name,
            mimeType: file.type || 'image/jpeg',
            url: localUrl,
            category: selectedCategory,
            uploader: uploaderName,
            created: Date.now()
          });
        }
      }

      // Prepend newly uploaded items to local state
      setItems(prev => [...filesUploadedSuccessfully, ...prev]);
      setUploadProgress(100);
      setUploadStatus('success');
      
      // Reset files & uploader name
      setSelectedFiles([]);
      setGuestName('');

      // Refresh real API gallery items in the background if possible
      if (APPS_SCRIPT_URL) {
        setTimeout(fetchGalleryItems, 1000);
      }

    } catch (error: any) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
      setUploadErrorMessage(error?.toString() || 'Ha ocurrido un error al conectar con Google Drive. Por favor verifica tu red.');
    }
  };

  const nextLightboxItem = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevLightboxItem = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const copyAppsScriptCode = () => {
    const code = getAppsScriptCode();
    navigator.clipboard.writeText(code);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const getAppsScriptCode = () => {
    return `// ====== GOOGLE APPS SCRIPT: INVITACIÓN PREMIUM CAMILA YTZEL ======
// DEPLOY INSTRUCTIONS:
// 1. Ve a script.google.com y crea un nuevo proyecto.
// 2. Reemplaza todo el código con este script.
// 3. Coloca el ID de tu carpeta de Google Drive en ROOT_FOLDER_ID.
// 4. Haz clic en "Implementar" -> "Nueva implementación".
// 5. Tipo: "Aplicación Web".
// 6. Ejecutar como: "Yo" (Tu cuenta de Google).
// 7. Quién tiene acceso: "Cualquiera" (Importante para que tus invitados suban sin loguearse).
// 8. Copia la URL de la Aplicación Web y agrégala en el .env.example como VITE_APPS_SCRIPT_URL.

var ROOT_FOLDER_ID = "${DRIVE_ROOT_FOLDER_ID}";

function doGet(e) {
  try {
    var parentFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
    var subfolders = parentFolder.getFolders();
    var allFiles = [];
    
    while (subfolders.hasNext()) {
      var subfolder = subfolders.next();
      var folderName = subfolder.getName();
      
      var category = "all";
      if (folderName.indexOf("01") !== -1) category = "official";
      else if (folderName.indexOf("02") !== -1) category = "family";
      else if (folderName.indexOf("03") !== -1) category = "friends";
      else if (folderName.indexOf("04") !== -1) category = "dance";
      else if (folderName.indexOf("05") !== -1) category = "cake";
      else if (folderName.indexOf("06") !== -1) category = "party";
      else if (folderName.indexOf("07") !== -1) category = "videos";
      
      var files = subfolder.getFiles();
      while (files.hasNext()) {
        var file = files.next();
        
        try {
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        } catch(err) {}
        
        var description = file.getDescription() || "";
        var uploader = "Invitado";
        if (description.indexOf("Uploader: ") !== -1) {
          uploader = description.replace("Uploader: ", "");
        }
        
        allFiles.push({
          id: file.getId(),
          name: file.getName(),
          mimeType: file.getMimeType(),
          url: "https://docs.google.com/uc?export=view&id=" + file.getId(),
          category: category,
          uploader: uploader,
          created: file.getDateCreated().getTime()
        });
      }
    }
    
    allFiles.sort(function(a, b) {
      return b.created - a.created;
    });
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", data: allFiles }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var params = JSON.parse(e.postData.contents);
    var filename = params.filename;
    var mimeType = params.mimeType;
    var base64 = params.base64;
    var category = params.category;
    var guestName = params.guestName || "Invitado Anónimo";
    
    var parentFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
    var subfolders = parentFolder.getFolders();
    var targetFolder = null;
    var prefix = "";
    
    if (category === "official") prefix = "01";
    else if (category === "family") prefix = "02";
    else if (category === "friends") prefix = "03";
    else if (category === "dance") prefix = "04";
    else if (category === "cake") prefix = "05";
    else if (category === "party") prefix = "06";
    else if (category === "videos") prefix = "07";
    
    while (subfolders.hasNext()) {
      var subfolder = subfolders.next();
      if (subfolder.getName().indexOf(prefix) !== -1) {
        targetFolder = subfolder;
        break;
      }
    }
    
    if (!targetFolder) {
      targetFolder = parentFolder;
    }
    
    var decoded = Utilities.base64Decode(base64);
    var blob = Utilities.newBlob(decoded, mimeType, filename);
    var file = targetFolder.createFile(blob);
    
    file.setDescription("Uploader: " + guestName);
    
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch(err) {}
    
    var fileId = file.getId();
    var fileUrl = "https://docs.google.com/uc?export=view&id=" + fileId;
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      data: {
        id: fileId,
        url: fileUrl,
        name: filename,
        uploader: guestName,
        category: category
      }
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
  };

  return (
    <div className="space-y-24 py-12">
      {/* ================= COMPARTIR RECUERDOS SECTION ================= */}
      <section id="upload-memories-section" className="px-6 max-w-4xl mx-auto relative">
        <div className="text-center space-y-4 flex flex-col items-center">
          <GrecianDivider />
          <h2 className="font-cinzel-decorative text-3xl md:text-5xl text-ivory tracking-wider uppercase text-shine-gold font-bold">
            Comparte tus Recuerdos
          </h2>
          <p className="font-trajan text-xs tracking-[0.4em] text-gold-metallic uppercase font-semibold">
            Forma parte de mi propia leyenda
          </p>
        </div>

        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="marble-plaque max-w-2xl mx-auto p-8 md:p-12 relative shadow-2xl border border-gold-metallic/35 bg-gradient-to-b from-navy-deep/95 via-navy-deep/90 to-black/95 text-center space-y-8"
          >
            {/* Ancient Greek border and meanders */}
            <div className="absolute inset-2 border-2 border-gold-metallic/20 pointer-events-none rounded-sm" />
            
            {/* Greek Key-like corner designs */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-metallic/40" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-metallic/40" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-metallic/40" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-metallic/40" />

            {/* Glowing Icon Wrapper */}
            <div className="relative flex justify-center">
              <div className="absolute -inset-4 bg-gold-metallic/10 rounded-full blur-xl animate-pulse" />
              <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-gold-metallic bg-navy-deep text-gold-metallic shadow-[0_0_25px_rgba(212,175,55,0.35)] relative z-10">
                <Camera className="w-10 h-10 animate-pulse" />
              </div>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <h3 className="font-cinzel-decorative text-xl md:text-2xl text-gold-metallic tracking-widest font-bold">
                ÁLBUM COLABORATIVO
              </h3>
              
              <p className="font-cormorant text-lg text-slate-700 leading-relaxed font-semibold">
                ¡Quiero guardar cada instante de esta noche mágica! Sube tus mejores fotos y videos directamente desde tu celular. Se organizarán automáticamente en las carpetas de Google Drive de mi álbum familiar.
              </p>
            </div>

            <div className="pt-2 flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  setUploadStatus('idle');
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-metallic/80 via-gold-metallic to-gold-metallic/80 text-navy-deep hover:text-navy-deep font-trajan text-xs tracking-[0.2em] font-bold rounded-full border-2 border-ivory shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.55)] hover:scale-105 transition-all duration-300 transform active:scale-95 cursor-pointer select-none group"
              >
                <Upload className="w-5 h-5 text-navy-deep group-hover:bounce" />
                <span>COMPARTIR MIS RECUERDOS</span>
              </button>

              {/* Developer badge showing configuration mode */}
              <button
                onClick={() => setIsInstructionsOpen(true)}
                className="inline-flex items-center gap-1.5 text-[10px] font-trajan tracking-widest text-gold-metallic/70 hover:text-gold-metallic bg-navy-deep/40 px-3 py-1.5 border border-gold-metallic/20 rounded-full transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{isApiActive ? "API GOOGLE DRIVE ACTIVA" : "AJUSTES DE DRIVE (PASOS)"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ÁLBUM DEL EVENTO GALLERY ================= */}
      <section id="album-gallery-section" className="px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 flex flex-col items-center">
          <GrecianDivider />
          <h2 className="font-cinzel-decorative text-3xl md:text-5xl text-ivory tracking-wider uppercase text-shine-gold font-bold">
            Álbum del Evento
          </h2>
          <p className="font-trajan text-xs tracking-[0.4em] text-gold-metallic uppercase font-semibold">
            La Galería del Templo de Camila
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto py-4">
          {GALLERY_CATEGORIES.map((cat) => {
            const count = items.filter(item => cat.id === 'all' || item.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full font-trajan text-[10px] tracking-widest font-semibold flex items-center gap-2 border transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'bg-gold-metallic text-navy-deep border-gold-metallic font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                    : 'bg-navy-deep/40 text-ivory/85 border-gold-metallic/20 hover:border-gold-metallic hover:bg-navy-deep/70'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[8px] ${
                  isActive ? 'bg-navy-deep text-white font-bold' : 'bg-white/10 text-gold-metallic/90'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-24 marble-plaque max-w-xl mx-auto border border-gold-metallic/20 p-8">
            <FolderHeart className="w-12 h-12 text-gold-metallic/60 mx-auto animate-pulse" />
            <h3 className="font-trajan text-sm text-gold-metallic mt-4 font-bold tracking-widest">GALERÍA EN BLANCO</h3>
            <p className="font-cormorant text-lg text-slate-700 italic mt-2 font-semibold">
              ¡Sé el primero en subir un recuerdo para esta categoría!
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isVideo = item.mimeType.includes('video') || item.name.endsWith('.mp4') || item.name.endsWith('.mov');
                const catInfo = GALLERY_CATEGORIES.find(c => c.id === item.category);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setLightboxIndex(index)}
                    className="group relative rounded-sm overflow-hidden aspect-[4/3] cursor-pointer select-none shadow-lg border border-gold-metallic/15 bg-black"
                  >
                    {/* Media render */}
                    {isVideo ? (
                      <div className="w-full h-full relative">
                        <video 
                          src={item.url} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <div className="w-12 h-12 rounded-full bg-navy-deep/80 border border-gold-metallic flex items-center justify-center text-gold-metallic shadow-lg group-hover:scale-110 transition-transform">
                            <Video className="w-5 h-5 fill-gold-metallic/20" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Elegant Gold Top Vignette on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/75 opacity-70 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-between p-4" />

                    {/* Metadata Overlay (always visible but elegant) */}
                    <div className="absolute top-2 right-2 bg-navy-deep/80 border border-gold-metallic/35 px-2 py-0.5 rounded-full text-[8px] font-trajan text-gold-metallic font-bold tracking-widest z-10">
                      {catInfo?.label || 'Recuerdo'}
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
                      <div className="flex items-center gap-1.5 text-gold-metallic">
                        <User className="w-3.5 h-3.5 text-gold-metallic" />
                        <span className="font-trajan text-[9px] tracking-widest font-black uppercase truncate">
                          {item.uploader}
                        </span>
                      </div>
                      <p className="font-cormorant italic text-[11px] text-ivory/80 truncate font-semibold mt-0.5">
                        {item.name.replace(/^\[.*?\]_(\d+)_/, '')}
                      </p>
                    </div>

                    {/* Hover Gold Frame */}
                    <div className="absolute inset-2 border border-gold-metallic/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xs" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ================= COMPARTIR RECUERDOS MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (uploadStatus !== 'uploading') setIsModalOpen(false);
              }}
              className="absolute inset-0 bg-navy-deep/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-gradient-to-b from-navy-deep to-[#030d22] border border-gold-metallic/45 shadow-2xl rounded-sm p-6 md:p-10 text-white z-10 overflow-hidden"
            >
              {/* Ancient Greek Internal Frame */}
              <div className="absolute inset-2 border border-gold-metallic/20 pointer-events-none rounded-sm" />

              {/* Close Button */}
              {uploadStatus !== 'uploading' && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gold-metallic/60 hover:text-gold-metallic p-1 rounded-full border border-gold-metallic/10 hover:border-gold-metallic/35 transition-colors cursor-pointer select-none"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Title */}
              <div className="text-center space-y-2 pb-6 border-b border-gold-metallic/15">
                <h3 className="font-cinzel-decorative text-2xl text-gold-metallic tracking-wider font-bold">
                  SUBIR MIS RECUERDOS
                </h3>
                <p className="font-trajan text-[10px] tracking-widest text-gold-metallic/75 font-semibold">
                  Templo del Olimpo de Camila Ytzel
                </p>
              </div>

              {/* Upload States routing */}
              {uploadStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-6"
                >
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gold-metallic/15 rounded-full blur-xl animate-pulse" />
                    {/* Golden Laurel Circle wrapper */}
                    <div className="w-20 h-20 rounded-full border-2 border-gold-metallic flex items-center justify-center text-gold-metallic bg-navy-deep relative z-10 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      <Check className="w-10 h-10 stroke-[3]" />
                    </div>
                  </div>

                  <div className="space-y-2 max-w-sm">
                    <h4 className="font-cinzel-decorative text-lg text-gold-metallic tracking-widest font-bold">
                      ✨ ¡MUCHAS GRACIAS!
                    </h4>
                    <p className="font-cormorant text-lg text-ivory/90 leading-relaxed font-semibold">
                      Tus recuerdos ya forman parte del álbum de Camila. Que los dioses guíen siempre tu camino.
                    </p>
                  </div>

                  <button
                    onClick={() => setUploadStatus('idle')}
                    className="px-6 py-2.5 border border-gold-metallic text-gold-metallic hover:bg-gold-metallic hover:text-navy-deep transition-all duration-300 font-trajan text-[10px] tracking-widest font-bold rounded-full cursor-pointer select-none"
                  >
                    SUBIR MÁS ARCHIVOS
                  </button>
                </motion.div>
              ) : uploadStatus === 'uploading' ? (
                <div className="py-16 flex flex-col items-center space-y-8">
                  {/* Classical Rising Pillars Animation representing upload */}
                  <div className="relative flex items-end gap-3 h-16 w-32 justify-center">
                    <div className="w-3 bg-gold-metallic/30 rounded-t-xs animate-[bounce_1s_infinite_100ms] h-12" />
                    <div className="w-3 bg-gold-metallic rounded-t-xs animate-[bounce_1s_infinite_300ms] h-16 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    <div className="w-3 bg-gold-metallic/30 rounded-t-xs animate-[bounce_1s_infinite_500ms] h-10" />
                  </div>

                  <div className="w-full space-y-3">
                    <div className="flex justify-between font-trajan text-[10px] tracking-widest text-gold-metallic font-bold">
                      <span>TRANSMITIENDO AL OLIMPO...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    {/* Gorgeous Gold Progress Bar */}
                    <div className="w-full h-3 bg-navy-deep border border-gold-metallic/25 rounded-full overflow-hidden relative p-0.5">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gold-metallic/70 via-gold-metallic to-gold-metallic/70 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="font-cormorant italic text-center text-ivory/60 text-sm font-semibold">
                      Por favor, no cierres esta ventana. Estamos subiendo y guardando tus recuerdos.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="mt-6 space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block font-trajan text-[10px] tracking-widest text-gold-metallic font-bold uppercase">
                      Tu Nombre o Familia (Opcional)
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-metallic/50" />
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Ej. Familia Aljobin, Tía Denisse, etc."
                        className="w-full bg-navy-deep/60 border border-gold-metallic/25 focus:border-gold-metallic focus:ring-1 focus:ring-gold-metallic rounded-sm py-3 pl-11 pr-4 font-cormorant text-lg text-ivory placeholder-ivory/30 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="block font-trajan text-[10px] tracking-widest text-gold-metallic font-bold uppercase">
                      Selecciona una Categoría
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {GALLERY_CATEGORIES.filter(c => c.id !== 'all' && c.id !== 'official').map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3 py-2 border rounded-sm font-trajan text-[9px] tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer select-none ${
                            selectedCategory === cat.id
                              ? 'bg-gold-metallic text-navy-deep border-gold-metallic font-bold shadow-[0_0_10px_rgba(212,175,55,0.25)]'
                              : 'bg-navy-deep/30 border-gold-metallic/20 text-ivory hover:border-gold-metallic/55'
                          }`}
                        >
                          <span>{cat.emoji}</span>
                          <span>{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* File Upload Drag & Drop Stage */}
                  <div className="space-y-2">
                    <label className="block font-trajan text-[10px] tracking-widest text-gold-metallic font-bold uppercase">
                      Selecciona Fotos o Videos (Max. 15MB)
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-sm p-6 text-center transition-all relative ${
                        isDragActive 
                          ? 'border-gold-metallic bg-gold-metallic/10' 
                          : 'border-gold-metallic/20 bg-navy-deep/20 hover:border-gold-metallic/45'
                      }`}
                    >
                      <input
                        type="file"
                        id="file-upload-input"
                        multiple
                        accept="image/jpeg,image/png,image/webp,image/heic,video/mp4,video/quicktime"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      
                      <label htmlFor="file-upload-input" className="cursor-pointer block space-y-3">
                        <Upload className="w-10 h-10 text-gold-metallic/50 mx-auto animate-bounce" />
                        <div className="font-trajan text-[10px] tracking-widest text-gold-metallic font-bold">
                          ARRASTRA TUS ARCHIVOS AQUÍ O <span className="underline text-ivory hover:text-gold-metallic">EXPLOARAR</span>
                        </div>
                        <p className="font-cormorant italic text-xs text-ivory/50">
                          Soporta: JPG, PNG, WEBP, HEIC, MP4, MOV de hasta 15MB.
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Selected Files List */}
                  {selectedFiles.length > 0 && (
                    <div className="bg-navy-deep/40 border border-gold-metallic/15 p-4 rounded-sm space-y-2 max-h-36 overflow-y-auto">
                      <div className="flex justify-between items-center pb-1.5 border-b border-gold-metallic/10">
                        <span className="font-trajan text-[8px] tracking-widest text-gold-metallic font-bold">ARCHIVOS LISTOS ({selectedFiles.length})</span>
                        <button 
                          type="button" 
                          onClick={() => setSelectedFiles([])}
                          className="font-trajan text-[8px] tracking-widest text-red-400 hover:text-red-300 font-bold"
                        >
                          QUITAR TODOS
                        </button>
                      </div>
                      
                      <div className="space-y-1.5 pt-1.5">
                        {selectedFiles.map((file, idx) => {
                          const isVid = file.type.includes('video') || file.name.endsWith('.mp4') || file.name.endsWith('.mov');
                          return (
                            <div key={idx} className="flex justify-between items-center text-xs bg-black/25 px-2.5 py-1.5 rounded-xs">
                              <div className="flex items-center gap-2 truncate">
                                {isVid ? <Video className="w-3.5 h-3.5 text-gold-metallic" /> : <ImageIcon className="w-3.5 h-3.5 text-gold-metallic" />}
                                <span className="font-cormorant font-semibold truncate text-ivory/90">{file.name}</span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-[9px] text-ivory/40">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(idx)}
                                  className="text-gold-metallic hover:text-red-400 cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Warning if simulated/development state */}
                  {!isApiActive && (
                    <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-sm flex items-start gap-2.5 text-left">
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                      <div className="space-y-0.5">
                        <h5 className="font-trajan text-[9px] tracking-widest text-amber-400 font-bold">MODO DEMOSTRACIÓN ACTIVO</h5>
                        <p className="font-cormorant text-xs text-ivory/85 font-semibold">
                          No has configurado aún la API de Google Apps Script. El cargador simulará el guardado de forma virtual agregándolas directamente en memoria para que puedas probar todo el flujo Premium.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={selectedFiles.length === 0}
                      className={`w-full py-4 rounded-full font-trajan text-[11px] tracking-widest font-bold border cursor-pointer select-none transition-all duration-300 ${
                        selectedFiles.length === 0
                          ? 'border-gold-metallic/20 bg-white/5 text-ivory/35 cursor-not-allowed opacity-40'
                          : 'bg-gold-metallic text-navy-deep border-ivory hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-[1.01] active:scale-95'
                      }`}
                    >
                      SUBIR AL BANQUETE CELESTIAL
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= INSTRUCTIONS MODAL (DEVELOPER/ADMIN) ================= */}
      <AnimatePresence>
        {isInstructionsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInstructionsOpen(false)}
              className="absolute inset-0 bg-navy-deep/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#061024] border border-gold-metallic shadow-2xl rounded-sm p-6 md:p-8 text-white z-10 max-h-[85vh] overflow-y-auto"
            >
              <div className="absolute inset-2 border border-gold-metallic/20 pointer-events-none rounded-sm" />
              
              <button
                onClick={() => setIsInstructionsOpen(false)}
                className="absolute top-4 right-4 text-gold-metallic/60 hover:text-gold-metallic p-1 rounded-full border border-gold-metallic/10 hover:border-gold-metallic/35 transition-colors cursor-pointer select-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="text-center pb-4 border-b border-gold-metallic/15">
                  <h3 className="font-cinzel-decorative text-xl text-gold-metallic font-bold tracking-widest">
                    CONFIGURACIÓN DE GOOGLE DRIVE & APPS SCRIPT
                  </h3>
                  <p className="font-trajan text-[9px] tracking-widest text-gold-metallic/80 mt-1 font-bold">
                    PASO A PASO PARA ACTIVAR TU GALERÍA EN VIVO
                  </p>
                </div>

                <div className="space-y-4 text-sm font-cormorant text-ivory/90 leading-relaxed text-left">
                  <div className="space-y-2">
                    <p className="font-bold text-gold-metallic text-base">¿Cómo funciona?</p>
                    <p className="text-base">
                      Para que tus invitados guarden fotos sin loguearse con una cuenta de Google, se utiliza un <strong>Google Apps Script</strong> público como puente seguro. Este script sube los archivos directamente a tu carpeta de Google Drive configurada:
                    </p>
                    <div className="bg-black/40 border border-gold-metallic/15 p-3 rounded-sm space-y-1">
                      <p className="text-xs font-mono text-gold-metallic truncate">ID Carpeta: {DRIVE_ROOT_FOLDER_ID}</p>
                      <p className="text-[11px] font-mono text-ivory/60 truncate">Enlace: https://drive.google.com/drive/folders/{DRIVE_ROOT_FOLDER_ID}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-bold text-gold-metallic text-base">Instrucciones de Despliegue:</p>
                    <ol className="list-decimal pl-5 space-y-2 text-base">
                      <li>Ve a <a href="https://script.google.com" target="_blank" rel="noreferrer" className="text-gold-metallic underline">script.google.com</a> e inicia sesión.</li>
                      <li>Crea un <strong>Nuevo Proyecto</strong>.</li>
                      <li>Reemplaza todo el código por el script de abajo.</li>
                      <li>Haz clic en <strong>"Implementar" &gt; "Nueva implementación"</strong>.</li>
                      <li>Haz clic en el engranaje del menú superior izquierdo y selecciona <strong>"Aplicación Web"</strong>.</li>
                      <li>Configura:
                        <ul className="list-disc pl-5 mt-1 text-sm text-ivory/85 space-y-0.5">
                          <li>Ejecutar como: <strong className="text-gold-metallic">Yo (tu_correo@gmail.com)</strong>.</li>
                          <li>Quién tiene acceso: <strong className="text-gold-metallic">Cualquiera</strong>.</li>
                        </ul>
                      </li>
                      <li>Haz clic en <strong>"Implementar"</strong> y autoriza los permisos requeridos.</li>
                      <li>Copia la <strong>URL de la Aplicación Web</strong> que te da Google al final.</li>
                      <li>Declara esa URL en tu archivo <code className="bg-black/35 px-1 py-0.5 text-xs text-gold-metallic">.env.example</code> o secrets de tu proyecto como <code className="bg-black/35 px-1 py-0.5 text-xs text-gold-metallic">VITE_APPS_SCRIPT_URL</code>.</li>
                    </ol>
                  </div>

                  {/* Copy Script Block */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-trajan text-[10px] tracking-widest text-gold-metallic font-bold">CÓDIGO GOOGLE APPS SCRIPT</span>
                      <button
                        onClick={copyAppsScriptCode}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-trajan bg-gold-metallic/20 text-gold-metallic hover:bg-gold-metallic hover:text-navy-deep rounded-sm transition-all border border-gold-metallic/35 cursor-pointer"
                      >
                        {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedScript ? "COPIADO" : "COPIAR CÓDIGO"}</span>
                      </button>
                    </div>
                    <pre className="bg-black/50 p-4 rounded-sm font-mono text-[10px] text-ivory/80 overflow-x-auto max-h-48 border border-gold-metallic/15 scrollbar-thin">
                      {getAppsScriptCode()}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightboxItem();
              }}
              className="absolute left-4 z-10 text-gold-metallic hover:scale-110 p-2 rounded-full bg-black/40 border border-gold-metallic/25 cursor-pointer"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightboxItem();
              }}
              className="absolute right-4 z-10 text-gold-metallic hover:scale-110 p-2 rounded-full bg-black/40 border border-gold-metallic/25 cursor-pointer"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Close Lightbox */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 text-gold-metallic hover:scale-110 p-2 rounded-full bg-black/40 border border-gold-metallic/25 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Media Box wrapper */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[80vh] w-[90%] flex flex-col items-center justify-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredItems[lightboxIndex] && (
                <>
                  {filteredItems[lightboxIndex].mimeType.includes('video') || filteredItems[lightboxIndex].name.endsWith('.mp4') || filteredItems[lightboxIndex].name.endsWith('.mov') ? (
                    <video
                      src={filteredItems[lightboxIndex].url}
                      className="max-h-[70vh] w-auto max-w-full rounded-sm shadow-2xl border border-gold-metallic/20"
                      controls
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={filteredItems[lightboxIndex].url}
                      alt={filteredItems[lightboxIndex].name}
                      className="max-h-[70vh] w-auto max-w-full rounded-sm shadow-2xl border border-gold-metallic/20 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Metadata and details under active item */}
                  <div className="w-full text-center mt-4 space-y-1">
                    <p className="font-cormorant italic text-lg text-ivory max-w-lg mx-auto truncate font-semibold">
                      {filteredItems[lightboxIndex].name.replace(/^\[.*?\]_(\d+)_/, '')}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex items-center gap-1.5 text-gold-metallic bg-gold-metallic/10 border border-gold-metallic/20 px-2.5 py-0.5 rounded-full text-[10px] font-trajan tracking-widest font-black">
                        <User className="w-3.5 h-3.5" />
                        <span>SUBIDO POR: {filteredItems[lightboxIndex].uploader.toUpperCase()}</span>
                      </div>
                      <span className="text-ivory/40 text-xs">|</span>
                      <span className="font-trajan text-[10px] tracking-widest text-gold-metallic/80 font-bold uppercase">
                        {GALLERY_CATEGORIES.find(c => c.id === filteredItems[lightboxIndex].category)?.label || 'Recuerdo'}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollaborativeGallery;
