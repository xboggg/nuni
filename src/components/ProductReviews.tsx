import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, ChevronDown } from "lucide-react";
import { getReviewsForProduct, getAverageRating, getRatingDistribution } from "@/data/reviews";
import StarRating from "./StarRating";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const [showForm, setShowForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = getReviewsForProduct(productId);
  const averageRating = getAverageRating(productId);
  const distribution = getRatingDistribution(productId);
  const totalReviews = reviews.length;

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Customer Reviews</h3>
        {!showForm && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowForm(true)}
            className="gap-2"
          >
            <MessageSquarePlus size={16} />
            Write Review
          </Button>
        )}
      </div>

      {/* Rating Summary */}
      <div className="bg-muted/50 rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center sm:w-1/3">
            <span className="text-4xl font-bold text-foreground">{averageRating}</span>
            <StarRating rating={averageRating} size={18} className="mt-1" />
            <span className="text-sm text-muted-foreground mt-1">
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </span>
          </div>

          {/* Distribution */}
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution[star];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-3">{star}</span>
                  <StarRating rating={1} maxRating={1} size={12} />
                  <Progress value={percentage} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <ReviewForm
            productName={productName}
            onCancel={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-3">
          {displayedReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}

          {/* Show More Button */}
          {reviews.length > 2 && !showAllReviews && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowAllReviews(true)}
              className="w-full py-2.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1"
            >
              Show all {reviews.length} reviews
              <ChevronDown size={16} />
            </motion.button>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">No reviews yet. Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
