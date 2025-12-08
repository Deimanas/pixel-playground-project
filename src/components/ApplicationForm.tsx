import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, X, Check, MessageSquare, User, Gamepad2, Calendar, Mic, Youtube, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const ApplicationForm = () => {
  const { toast } = useToast();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
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
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Anketa pateikta!",
      description: "Netrukus su jumis susisieks administratorius.",
    });
    
    setIsSubmitting(false);
  };

  const selectClass = "w-full bg-background border-4 border-border p-3 font-minecraft text-lg text-foreground minecraft-block focus:border-emerald outline-none";
  const inputClass = "bg-background border-4 border-border font-minecraft text-lg minecraft-block focus:border-emerald";

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="anketa">
      <div className="absolute inset-0 stone-texture opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-shadow-minecraft">
            ANKETA Į <span className="text-emerald">SERVERĮ</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-card border-4 border-border p-6 minecraft-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald flex items-center justify-center minecraft-block">
                  <span className="font-pixel text-primary-foreground">1</span>
                </div>
                <h3 className="font-pixel text-sm text-foreground">Anketos pildymas</h3>
              </div>
              <p className="font-minecraft text-lg text-muted-foreground">
                Pirmasis žingsnis – užpildyti anketą. Visi pateikti duomenys yra saugomi. 
                Tinkamai užpildyta anketa gauna teigiamą atsakymą, ir žaidėjas pereina į antrąjį etapą.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border-4 border-border p-6 minecraft-block"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold flex items-center justify-center minecraft-block">
                  <span className="font-pixel text-accent-foreground">2</span>
                </div>
                <h3 className="font-pixel text-sm text-foreground">Pokalbis su administratoriumi</h3>
              </div>
              <p className="font-minecraft text-lg text-muted-foreground">
                Šiame etape administratorius susisieks su jumis per „Discord" ir užduos keletą papildomų klausimų. 
                Jei atsakymai atitiks mūsų lūkesčius – būsite pakviesti prisijungti.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Discord Login Notice */}
        <motion.div
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#5865F2]/20 border-4 border-[#5865F2] p-6 minecraft-block">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <MessageSquare className="w-12 h-12 text-[#5865F2]" />
              <div className="text-center md:text-left flex-1">
                <h4 className="font-pixel text-sm text-foreground mb-2">Discord prisijungimas yra privalomas</h4>
                <p className="font-minecraft text-lg text-muted-foreground">
                  Prisijunkite per Discord, kad automatiškai užpildytume jūsų Discord ID ir vartotojo vardą.
                </p>
              </div>
              <Button variant="emerald" size="lg" asChild>
                <a href="https://discord.com/invite/aMWy9sv5Hg" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="w-5 h-5" />
                  Prisijungti su Discord
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          className="max-w-4xl mx-auto"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-card border-4 border-border p-6 md:p-8 minecraft-block space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                  <User className="w-4 h-4 text-emerald" />
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
                  <Gamepad2 className="w-4 h-4 text-emerald" />
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
                  <Calendar className="w-4 h-4 text-emerald" />
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
                  <Heart className="w-4 h-4 text-emerald" />
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
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                <User className="w-4 h-4 text-emerald" />
                Kas Jus pakvietė į serverį?
              </label>
              <Input
                name="pakvietimas"
                value={formData.pakvietimas}
                onChange={handleInputChange}
                placeholder="Radau pats (-i) serverį arba įrašykite vardą"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                <Mic className="w-4 h-4 text-emerald" />
                Ar turite mikrofoną antrajam atrankos etapui?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mikrofonas"
                    value="taip"
                    checked={formData.mikrofonas === "taip"}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-emerald"
                  />
                  <span className="font-minecraft text-lg text-foreground">Taip</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mikrofonas"
                    value="ne"
                    checked={formData.mikrofonas === "ne"}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-emerald"
                  />
                  <span className="font-minecraft text-lg text-foreground">Ne</span>
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                <Gamepad2 className="w-4 h-4 text-emerald" />
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
                <Gamepad2 className="w-4 h-4 text-emerald" />
                Kokiuose privačiuose serveriuose esate žaidę?
              </label>
              <Textarea
                name="serveriai"
                value={formData.serveriai}
                onChange={handleInputChange}
                placeholder="Išvardinkite serverius..."
                className={`${inputClass} min-h-[100px]`}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                <Heart className="w-4 h-4 text-emerald" />
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
                <Sparkles className="w-4 h-4 text-emerald" />
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
                <User className="w-4 h-4 text-emerald" />
                O dabar rimtai, kaip save apibūdintumėte savais žodžiais?
              </label>
              <Textarea
                name="apie_save"
                value={formData.apie_save}
                onChange={handleInputChange}
                placeholder="Papasakokite apie save..."
                className={`${inputClass} min-h-[100px]`}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                <Sparkles className="w-4 h-4 text-emerald" />
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
                <Youtube className="w-4 h-4 text-emerald" />
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

            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                <Heart className="w-4 h-4 text-emerald" />
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
                <MessageSquare className="w-4 h-4 text-emerald" />
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

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 font-minecraft text-lg text-foreground mb-2">
                <Upload className="w-4 h-4 text-emerald" />
                Išreiškite savo Minecraft sielą (3-10 nuotraukų)
              </label>
              <p className="font-minecraft text-muted-foreground mb-4">
                Atsiųskite savo sukurtą meną. Leidžiami formatai: JPG, PNG. Max 5MB.
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

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
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
              <p className="font-minecraft text-sm text-muted-foreground mt-2">
                Įkelta: {images.length}/10 nuotraukų (min. 3)
              </p>
            </div>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                variant="emerald"
                size="xl"
                className="w-full font-pixel text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
                    Siunčiama...
                  </>
                ) : (
                  <>
                    <Check className="w-6 h-6" />
                    Pateikti Anketą
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};
