import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      previousImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  };

  return (
    <>
      <div className="relative bg-navy-800/50 rounded-lg border border-gold-500/20 p-4">
        {/* Main Image */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt={`${title} - Main Image`}
              className="object-cover w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onLoad={() => setIsLoading(false)}
            />
          </AnimatePresence>

          {isLoading && (
            <div className="absolute inset-0 bg-navy-900/50 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-navy-900/80 hover:bg-navy-900 text-white"
            onClick={() => setIsExpanded(true)}
          >
            <Expand className="w-4 h-4" />
          </Button>

          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="bg-navy-900/80 hover:bg-navy-900 text-white ml-4"
              onClick={previousImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="bg-navy-900/80 hover:bg-navy-900 text-white mr-4"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImage ? 'bg-gold-400' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all ${
                index === currentImage 
                  ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-navy-800' 
                  : 'hover:ring-2 hover:ring-gold-400/50 hover:ring-offset-2 hover:ring-offset-navy-800'
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <img
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent 
          className="max-w-7xl bg-navy-900 border-gold-500/20"
          onKeyDown={handleKeyDown}
        >
          <div className="relative aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                alt={`${title} - Fullscreen Image`}
                className="object-contain w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="bg-navy-900/80 hover:bg-navy-900 text-white ml-4"
                onClick={previousImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="bg-navy-900/80 hover:bg-navy-900 text-white mr-4"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImage ? 'bg-gold-400' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}