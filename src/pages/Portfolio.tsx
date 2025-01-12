import { useState } from 'react';
import { PropertyHero } from '@/components/PropertyHero';
import PropertyCard from '@/components/PropertyCard';
import { useAuth } from '@/lib/context/auth'; 
import { generateMockProperties } from '@/lib/mockData';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Cookies from 'js-cookie';

export function Portfolio() {
  const { user, unsaveProperty } = useAuth();
  const [savedProperties, setSavedProperties] = useState(() => 
    generateMockProperties(10).filter(p => user?.savedProperties.includes(p.id.toString()))
  );
  const [propertyToRemove, setPropertyToRemove] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handlePropertyRemove = (propertyId: string) => {
    const skipConfirmation = Cookies.get('vge_skip_unsave_confirmation') === 'true';
    if (skipConfirmation) {
      handleConfirmRemove(propertyId);
    } else {
      setPropertyToRemove(propertyId);
    }
  };

  const handleConfirmRemove = (propertyId: string) => {
    if (user) {
      unsaveProperty(propertyId);
      // Update the local state to remove the property
      const updatedProperties = savedProperties.filter(p => p.id.toString() !== propertyId);
      setSavedProperties(updatedProperties);
    }
    setPropertyToRemove(null);
  };

  const handleSkipConfirmationChange = (checked: boolean) => {
    Cookies.set('vge_skip_unsave_confirmation', checked.toString(), { expires: 365 });
  };

  return (
    <div>
      <PropertyHero
        title="Your Current Portfolio"
        subtitle="Track and manage your saved properties"
        imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {savedProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                {...property} 
                onUnsave={() => handlePropertyRemove(property.id.toString())}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-light text-white mb-4">No saved properties yet</h3>
            <p className="text-gray-400">
              Start building your portfolio by saving properties you're interested in.
            </p>
          </div>
        )}

        <AlertDialog 
          open={propertyToRemove !== null} 
          onOpenChange={() => setPropertyToRemove(null)}
        >
          <AlertDialogContent className="bg-navy-900 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Property</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                Are you sure you want to remove this property from your portfolio?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex items-center space-x-2 py-4">
              <Switch
                id="skip-confirmation"
                onCheckedChange={handleSkipConfirmationChange}
                defaultChecked={!showConfirmation}
              />
              <Label htmlFor="skip-confirmation" className="text-sm text-gray-400">
                Don't show this message again
              </Label>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-navy-800 text-white hover:bg-navy-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => propertyToRemove && handleConfirmRemove(propertyToRemove)}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}