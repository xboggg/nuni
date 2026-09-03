import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Users, Building2, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/lib/i18n";

// Community media - served from /media/community/
const communityVideoSrcs = [
  "/media/community/community-1.mp4",
  "/media/community/community-2.mp4",
  "/media/community/community-3.mp4",
  "/media/community/community-4.mp4",
  "/media/community/community-5.mp4",
  "/media/community/community-6.mp4",
];

const appreciationLetterSrc = "/media/community/hospital-letter.jpg";

const CommunityImpactPage = () => {
  const { t } = useLanguage();
  const communityVideos = communityVideoSrcs.map((src, index) => ({
    id: index + 1,
    src,
    title: [
      t.community.videoOutreach,
      t.community.videoHealthcare,
      t.community.videoCharity,
      t.community.videoService,
      t.community.videoHospitality,
      t.community.videoGiving,
    ][index],
  }));
  const appreciationLetter = {
    src: appreciationLetterSrc,
    title: t.community.letterTitle,
    description: t.community.letterDescription,
  };
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const openVideoLightbox = (src: string, index: number) => {
    setSelectedVideo(src);
    setCurrentVideoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedVideo(null);
    setSelectedImage(null);
  };

  const navigateVideo = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (currentVideoIndex - 1 + communityVideos.length) % communityVideos.length
      : (currentVideoIndex + 1) % communityVideos.length;
    setCurrentVideoIndex(newIndex);
    setSelectedVideo(communityVideos[newIndex].src);
  };

  return (
    <>
      <SEO
        title="Community Impact | NG Cosmetics"
        description="At NG Cosmetics, we believe in giving back. Discover our community initiatives, healthcare support, and charitable contributions across Ghana."
        keywords="NG Cosmetics community, charity, healthcare support, Ghana community service, giving back"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-accent uppercase mb-4">
              <Heart className="w-4 h-4" />
              {t.community.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              {t.community.heroTitle} <span className="text-gradient-gold">{t.community.heroTitleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.community.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.community.healthcareSupport}</h3>
              <p className="text-muted-foreground">{t.community.healthcareSupportDesc}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.community.communityOutreach}</h3>
              <p className="text-muted-foreground">{t.community.communityOutreachDesc}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.community.institutionalPartnerships}</h3>
              <p className="text-muted-foreground">{t.community.institutionalPartnershipsDesc}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Healthcare Partnership Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
              {t.community.healthcareInitiativeBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t.community.healthcareTitle} <span className="text-gradient-gold">{t.community.healthcareTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.community.healthcareDescription}
            </p>
          </motion.div>

          {/* Appreciation Letter - Thumbnail */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-sm mx-auto"
          >
            <div
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl border-4 border-primary/20 hover:border-primary/40 transition-colors"
              onClick={() => setSelectedImage(appreciationLetter.src)}
            >
              <img
                src={appreciationLetter.src}
                alt={appreciationLetter.title}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                <div className="text-center text-white">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">{t.community.clickToView}</p>
                </div>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-4 text-sm italic">
              {appreciationLetter.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-20 bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
              {t.community.activitiesBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t.community.activitiesTitle} <span className="text-gradient-gold">{t.community.activitiesTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.community.activitiesDescription}
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg bg-black aspect-video"
                onClick={() => openVideoLightbox(video.src, index)}
              >
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-medium">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.community.ctaTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {t.community.ctaDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                {t.community.shopProducts}
              </Link>
              <Link
                to="/about-us"
                className="inline-flex items-center px-8 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
              >
                {t.community.learnAboutUs}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Lightbox */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateVideo('prev'); }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateVideo('next'); }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
            <p className="text-white text-center mt-4">
              {communityVideos[currentVideoIndex]?.title}
            </p>
          </div>
        </motion.div>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt={t.community.appreciationLetterAlt}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </motion.div>
      )}

      <Footer />
    </>
  );
};

export default CommunityImpactPage;
