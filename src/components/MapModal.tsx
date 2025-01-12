import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLocation } from '@/lib/context/location';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    lat: number;
    lng: number;
    address: string;
  };
}

export function MapModal({ isOpen, onClose, destination }: MapModalProps) {
  const { userLocation } = useLocation();

  const getMapUrl = () => {
    if (!userLocation) return '';
    return `https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_KEY&origin=${userLocation.lat},${userLocation.lng}&destination=${destination.lat},${destination.lng}&mode=driving`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-navy-900 text-white">
        <DialogHeader>
          <DialogTitle>Directions to {destination.address}</DialogTitle>
        </DialogHeader>
        <div className="aspect-[16/9] w-full">
          {userLocation ? (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={getMapUrl()}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Please enable location services to view directions
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}