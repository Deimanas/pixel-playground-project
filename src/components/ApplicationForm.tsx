import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, X, Check, MessageSquare, User, Gamepad2, 
  Calendar, Mic, Youtube, Heart, Sparkles, Camera,
  ChevronRight, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Discord", icon: MessageSquare },
  { id: 2, title: "Asmeninė info", icon: User },
  { id: 3, title: "Apie tave", icon: Heart },
  { id: 4, title: "Mikrofonas", icon: Mic },
  { id: 5, title: "MC patirtis", icon: Gamepad2 },
  { id: 6, title: "Motyvacija", icon: Sparkles },
  { id: 7, title: "Nuotraukos", icon: Camera },
];

export const ApplicationForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    vardas: "",
    minecraft: "",
    amzius: "",
    tipas: "",
    pakvietimas: "",
    mikrofonas: "",
    laikas: "",
    serveriai: "",
    priezastis: "",
    apibūdinimas: "",
    apie_save: "",
    nauda: "",
    youtube: "",
    argas_reiksme: "",
    papildoma: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discordConnected, setDiscordConnected] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024;
      return isValidType && isValidSize;
    });
    
    if (images.length + validFiles.length > 10) {
      toast({
        title: "Per daug nuotraukų",
        description: "Galite įkelti tik iki 10 nuotraukų.",
        variant: "destructive",
      });
      return;
    }
    
    setImages([...images, ...validFiles]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length < 3) {
      toast({
        title: "Per mažai nuotraukų",
        description: "Įkelkite bent 3 nuotraukas.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Anketa pateikta!",
      description: "Netrukus su jumis susisieks administratorius.",
    });
    
    setIsSubmitting(false);
  };

  const connectDiscord = () => {
    // Simulate Discord connection
    setDiscordConnected(true);
    toast({
      title: "Discord prijungtas!",
      description: "Jūsų Discord paskyra sėkmingai prijungta.",
    });
  };

  const nextStep = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step: number) => {
    if (step === 1 || discordConnected) {
      setCurrentStep(step);
    }
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    let completed = 0;
    const totalFields = 15;
    
    if (discordConnected) completed += 1;
    if (formData.vardas) completed += 1;
    if (formData.minecraft) completed += 1;
    if (formData.amzius) completed += 1;
    if (formData.tipas) completed += 1;
    if (formData.pakvietimas) completed += 1;
    if (formData.mikrofonas) completed += 1;
    if (formData.laikas) completed += 1;
    if (formData.serveriai) completed += 1;
    if (formData.priezastis) completed += 1;
    if (formData.apibūdinimas) completed += 1;
    if (formData.apie_save) completed += 1;
    if (formData.nauda) completed += 1;
    if (formData.argas_reiksme) completed += 1;
    if (images.length >= 3) completed += 1;
    
    return Math.round((completed / totalFields) * 100);
  };

  const progress = calculateProgress();

  const selectClass = "w-full h-12 bg-background border-2 border-border px-3 font-minecraft text-lg text-foreground minecraft-block focus:border-emerald outline-none";
  const inputClass = "bg-background border-2 border-border font-minecraft text-lg minecraft-block focus:border-emerald h-12";

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-[#5865F2] mx-auto mb-4" />
              <h3 className="font-pixel text-xl text-foreground mb-2">Discord Prisijungimas</h3>
              <p className="font-minecraft text-lg text-muted-foreground mb-6">
                Prisijunkite per Discord, kad automatiškai užpildytume jūsų Discord ID ir vartotojo vardą.
              </p>
            </div>
            
            {discordConnected ? (
              <div className="bg-emerald/20 border-4 border-emerald p-6 minecraft-block text-center">
                <Check className="w-12 h-12 text-emerald mx-auto mb-2" />
                <p className="font-minecraft text-lg text-foreground">Discord sėkmingai prijungtas!</p>
              </div>
            ) : (
              <div className="bg-[#5865F2]/20 border-4 border-[#5865F2] p-6 minecraft-block text-center">
                <Button variant="emerald" size="lg" onClick={connectDiscord}>
                  <MessageSquare className="w-5 h-5" />
                  Prisijungti su Discord
                </Button>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-pixel text-xl text-foreground mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-emerald" />
              Asmeninė Informacija
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                  Jūsų vardas
                </label>
                <Input
                  name="vardas"
                  value={formData.vardas}
                  onChange={handleInputChange}
                  placeholder="Įveskite savo vardą"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                  Minecraft slapyvardis
                </label>
                <Input
                  name="minecraft"
                  value={formData.minecraft}
                  onChange={handleInputChange}
                  placeholder="Jūsų Minecraft nick"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                  Amžius
                </label>
                <Input
                  name="amzius"
                  type="number"
                  value={formData.amzius}
                  onChange={handleInputChange}
                  placeholder="Jūsų amžius"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                  Kas Jus pakvietė į serverį?
                </label>
                <Input
                  name="pakvietimas"
                  value={formData.pakvietimas}
                  onChange={handleInputChange}
                  placeholder="Radau pats (-i) arba vardą"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-pixel text-xl text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-emerald" />
              Apie Tave
            </h3>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                Introvertas ar ekstravertas?
              </label>
              <select
                name="tipas"
                value={formData.tipas}
                onChange={handleInputChange}
                className={selectClass}
                required
              >
                <option value="">Pasirinkite...</option>
                <option value="introvertas">Introvertas</option>
                <option value="ekstravertas">Ekstravertas</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                Kaip save apibūdintumėte?
              </label>
              <select
                name="apibūdinimas"
                value={formData.apibūdinimas}
                onChange={handleInputChange}
                className={selectClass}
                required
              >
                <option value="">Pasirinkite...</option>
                <option value="rimtas">Labai rimtas individas</option>
                <option value="humoristas">Klasės humoristas</option>
                <option value="vierchas">Kaimo vierchas</option>
                <option value="simp">Simpesteris (Simp)</option>
                <option value="tylus">Tylusis triznius</option>
                <option value="įvairus">Įvairus</option>
                <option value="intelektualas">Intelektualas</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                O dabar rimtai, kaip save apibūdintumėte savais žodžiais?
              </label>
              <Textarea
                name="apie_save"
                value={formData.apie_save}
                onChange={handleInputChange}
                placeholder="Papasakokite apie save..."
                className={`${inputClass} min-h-[120px]`}
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-pixel text-xl text-foreground mb-4 flex items-center gap-2">
              <Mic className="w-6 h-6 text-emerald" />
              Mikrofonas
            </h3>

            <div className="bg-muted/50 border-4 border-border p-6 minecraft-block">
              <p className="font-minecraft text-lg text-muted-foreground mb-4">
                Ar turite mikrofoną antrajam atrankos etapui? Pokalbis su administratoriumi vyksta per Discord.
              </p>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-8 h-8 border-4 ${formData.mikrofonas === "taip" ? "border-emerald bg-emerald" : "border-border bg-background"} minecraft-block flex items-center justify-center transition-colors`}>
                    {formData.mikrofonas === "taip" && <Check className="w-5 h-5 text-white" />}
                  </div>
                  <input
                    type="radio"
                    name="mikrofonas"
                    value="taip"
                    checked={formData.mikrofonas === "taip"}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="font-minecraft text-xl text-foreground">Taip, turiu</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-8 h-8 border-4 ${formData.mikrofonas === "ne" ? "border-redstone bg-redstone" : "border-border bg-background"} minecraft-block flex items-center justify-center transition-colors`}>
                    {formData.mikrofonas === "ne" && <X className="w-5 h-5 text-white" />}
                  </div>
                  <input
                    type="radio"
                    name="mikrofonas"
                    value="ne"
                    checked={formData.mikrofonas === "ne"}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="font-minecraft text-xl text-foreground">Ne, neturiu</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="font-pixel text-xl text-foreground mb-4 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-emerald" />
              Minecraft Patirtis
            </h3>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                Kiek laiko žaidžiate Minecraft?
              </label>
              <Input
                name="laikas"
                value={formData.laikas}
                onChange={handleInputChange}
                placeholder="Pvz: 5 metus"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                Kokiuose privačiuose serveriuose esate žaidę?
              </label>
              <Textarea
                name="serveriai"
                value={formData.serveriai}
                onChange={handleInputChange}
                placeholder="Išvardinkite serverius..."
                className={`${inputClass} min-h-[120px]`}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                Ar kuriate YouTube ar kitokios platformos turinį?
              </label>
              <Input
                name="youtube"
                value={formData.youtube}
                onChange={handleInputChange}
                placeholder="Įrašykite kanalo nuorodą arba 'Ne'"
                className={inputClass}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="font-pixel text-xl text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald" />
              Motyvacija
            </h3>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                Dėl kokios priežasties pasirinkote žaisti Argas serveryje?
              </label>
              <Textarea
                name="priezastis"
                value={formData.priezastis}
                onChange={handleInputChange}
                placeholder="Papasakokite..."
                className={`${inputClass} min-h-[100px]`}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                Kokios naudos suteiksite serveriui ARGAS?
              </label>
              <Textarea
                name="nauda"
                value={formData.nauda}
                onChange={handleInputChange}
                placeholder="Ką galite duoti serveriui?"
                className={`${inputClass} min-h-[100px]`}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                Ką tau reiškia Argas?
              </label>
              <Textarea
                name="argas_reiksme"
                value={formData.argas_reiksme}
                onChange={handleInputChange}
                placeholder="Papasakokite..."
                className={`${inputClass} min-h-[100px]`}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                Na, ką dar pasakysi? Nenori, nesakyk:
              </label>
              <Textarea
                name="papildoma"
                value={formData.papildoma}
                onChange={handleInputChange}
                placeholder="Papildoma informacija (neprivaloma)"
                className={`${inputClass} min-h-[80px]`}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="font-pixel text-xl text-foreground mb-4 flex items-center gap-2">
              <Camera className="w-6 h-6 text-emerald" />
              Nuotraukos
            </h3>

            <p className="font-minecraft text-lg text-muted-foreground">
              Išreiškite savo Minecraft sielą! Atsiųskite savo sukurtą meną (3-10 nuotraukų).
              Leidžiami formatai: JPG, PNG. Max 5MB.
            </p>
            
            <div className="border-4 border-dashed border-border p-8 text-center minecraft-block hover:border-emerald transition-colors">
              <input
                type="file"
                accept="image/jpeg,image/png"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-minecraft text-lg text-muted-foreground">
                  Tempkite ir meskite failus čia arba spustelėkite
                </p>
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover minecraft-block border-4 border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-redstone flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="font-minecraft text-sm text-muted-foreground">
              Įkelta: {images.length}/10 nuotraukų (min. 3)
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="anketa">
      <div className="absolute inset-0 stone-texture opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-shadow-minecraft">
            ANKETA Į <span className="text-emerald">SERVERĮ</span>
          </h2>
        </motion.div>

        {/* Minecraft-style Progress Bar */}
        <motion.div 
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            {/* XP Bar Background */}
            <div className="h-6 bg-[#1a1a1a] border-4 border-[#3d3d3d] relative overflow-hidden minecraft-block">
              {/* XP Bar Fill */}
              <motion.div 
                className="h-full bg-gradient-to-r from-[#80d41c] to-[#a4e94c]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2)"
                }}
              />
              {/* Segmented overlay */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="flex-1 border-r border-black/20" />
                ))}
              </div>
            </div>
            {/* Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-pixel text-xs text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.8)]">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mobile Steps - Horizontal Scroll */}
            <motion.div 
              className="lg:hidden"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card border-4 border-border minecraft-block p-3 overflow-x-auto">
                <div className="flex gap-2 min-w-max px-1">
                  {steps.map((step) => {
                    const StepIcon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = step.id < currentStep || (step.id === 1 && discordConnected);
                    const isClickable = step.id === 1 || discordConnected;
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => goToStep(step.id)}
                        disabled={!isClickable}
                        className={`flex flex-col items-center gap-1 p-2 min-w-[60px] transition-all minecraft-block border-2 ${
                          isActive 
                            ? "bg-emerald/20 border-emerald" 
                            : isCompleted
                            ? "bg-gold/10 border-gold/50"
                            : isClickable
                            ? "bg-background border-border"
                            : "bg-muted/30 border-border opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className={`w-8 h-8 flex items-center justify-center minecraft-block ${
                          isActive 
                            ? "bg-emerald" 
                            : isCompleted 
                            ? "bg-gold" 
                            : "bg-muted"
                        }`}>
                          {isCompleted && !isActive ? (
                            <Check className="w-4 h-4 text-accent-foreground" />
                          ) : (
                            <StepIcon className={`w-4 h-4 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                          )}
                        </div>
                        <span className={`font-minecraft text-[10px] text-center leading-tight ${
                          isActive ? "text-emerald" : "text-foreground"
                        }`}>
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Desktop Steps Sidebar */}
            <motion.div 
              className="hidden lg:block lg:w-64 shrink-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card border-4 border-border minecraft-block p-4">
                <h4 className="font-pixel text-xs text-muted-foreground mb-4 text-center">ETAPAI</h4>
                <div className="space-y-2">
                  {steps.map((step) => {
                    const StepIcon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = step.id < currentStep || (step.id === 1 && discordConnected);
                    const isClickable = step.id === 1 || discordConnected;
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => goToStep(step.id)}
                        disabled={!isClickable}
                        className={`w-full flex items-center gap-3 p-3 transition-all minecraft-block border-2 ${
                          isActive 
                            ? "bg-emerald/20 border-emerald" 
                            : isCompleted
                            ? "bg-gold/10 border-gold/50 hover:border-gold"
                            : isClickable
                            ? "bg-background border-border hover:border-muted-foreground"
                            : "bg-muted/30 border-border opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className={`w-8 h-8 flex items-center justify-center minecraft-block ${
                          isActive 
                            ? "bg-emerald" 
                            : isCompleted 
                            ? "bg-gold" 
                            : "bg-muted"
                        }`}>
                          {isCompleted && !isActive ? (
                            <Check className="w-4 h-4 text-accent-foreground" />
                          ) : (
                            <StepIcon className={`w-4 h-4 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                          )}
                        </div>
                        <span className={`font-minecraft text-sm text-left ${
                          isActive ? "text-emerald" : "text-foreground"
                        }`}>
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Form Content */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-card border-4 border-border p-6 md:p-8 minecraft-block min-h-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    variant="stone"
                    size="lg"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="font-pixel text-xs"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Atgal
                  </Button>

                  {currentStep === 7 ? (
                    <Button
                      type="submit"
                      variant="emerald"
                      size="lg"
                      disabled={isSubmitting || images.length < 3}
                      className="font-pixel text-xs"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
                          Siunčiama...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          Pateikti Anketą
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="emerald"
                      size="lg"
                      onClick={nextStep}
                      disabled={currentStep === 1 && !discordConnected}
                      className="font-pixel text-xs"
                    >
                      Toliau
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
