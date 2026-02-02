import { motion } from "framer-motion";
import { ThumbsUp, CheckCircle } from "lucide-react";
import { Review } from "@/data/reviews";
import StarRating from "./StarRating";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  index: number;
}

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(false);

  const handleHelpful = () => {
    if (!hasMarkedHelpful) {
      setHelpfulCount(prev => prev + 1);
      setHasMarkedHelpful(true);
    }
  };

  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-muted/50 rounded-2xl p-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={review.rating} size={14} />
            {review.verified && (
              <span className="flex items-center gap-1 text-xs text-secondary">
                <CheckCircle size={12} />
                Verified
              </span>
            )}
          </div>
          <h4 className="font-semibold text-foreground text-sm">{review.title}</h4>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">{formattedDate}</span>
      </div>

      {/* Review Text */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        {review.text}
      </p>

      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2 mb-3">
          {review.photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`Review photo ${i + 1}`}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{review.author}</span>
          <span className="mx-1">•</span>
          <span>{review.location}</span>
        </div>

        <button
          onClick={handleHelpful}
          disabled={hasMarkedHelpful}
          className={cn(
            "flex items-center gap-1.5 text-xs transition-colors",
            hasMarkedHelpful
              ? "text-secondary cursor-default"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ThumbsUp size={12} className={hasMarkedHelpful ? "fill-secondary" : ""} />
          <span>Helpful ({helpfulCount})</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
