import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Send, AlertCircle } from "lucide-react";
import StarRating from "./StarRating";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

interface ReviewFormProps {
  productName: string;
  onSubmit?: (review: ReviewFormData) => void;
  onCancel: () => void;
}

export interface ReviewFormData {
  rating: number;
  title: string;
  text: string;
  author: string;
  photos: string[];
}

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title too long"),
  text: z.string().trim().min(20, "Review must be at least 20 characters").max(1000, "Review too long"),
  author: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
});

const ReviewForm = ({ productName, onSubmit, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (photos.length + files.length > 3) {
      toast({
        title: "Too many photos",
        description: "You can upload up to 3 photos",
        variant: "destructive"
      });
      return;
    }

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Photos must be under 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotos(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = reviewSchema.safeParse({ rating, title, text, author });
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit({
        rating,
        title,
        text,
        author,
        photos
      });
    }

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback. Your review will appear after moderation.",
    });

    setIsSubmitting(false);
    onCancel();
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="bg-muted/50 rounded-2xl p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Write a Review</h4>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 hover:bg-muted rounded-full transition-colors"
        >
          <X size={18} className="text-muted-foreground" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Reviewing: <span className="font-medium text-foreground">{productName}</span>
      </p>

      {/* Rating */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Your Rating *</label>
        <StarRating
          rating={rating}
          size={28}
          interactive
          onRatingChange={setRating}
        />
        {errors.rating && (
          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.rating}
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Review Title *</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          className="bg-background"
        />
        {errors.title && (
          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.title}
          </p>
        )}
      </div>

      {/* Review Text */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Your Review *</label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell others about your experience with this product..."
          rows={4}
          className="bg-background resize-none"
        />
        {errors.text && (
          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.text}
          </p>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Your Name *</label>
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="How should we display your name?"
          className="bg-background"
        />
        {errors.author && (
          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.author}
          </p>
        )}
      </div>

      {/* Photo Upload */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Add Photos (optional)</label>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                <img
                  src={photo}
                  alt={`Upload ${index + 1}`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {photos.length < 3 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Camera size={20} className="text-muted-foreground" />
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <p className="text-xs text-muted-foreground mt-1">Up to 3 photos, max 5MB each</p>
      </div>

      {/* Submit */}
      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 gap-2"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Send size={16} />
              Submit Review
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
};

export default ReviewForm;
