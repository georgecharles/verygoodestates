import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { changePassword, updateUserPreferences } from '@/lib/auth';
import { useAuth } from '@/lib/context/auth';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const { toast } = useToast();
  const { user, updateUser } = useAuth();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    try {
      await changePassword(user!.id, currentPassword, newPassword);
      toast({
        title: "Success",
        description: "Password updated successfully"
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive"
      });
    }
  };

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // In a real app, we would geocode the address here
      const mockCoordinates = { lat: 51.5074, lng: -0.1278 }; // London coordinates
      
      const updatedUser = await updateUserPreferences(user!.id, {
        location: {
          address,
          postcode,
          coordinates: mockCoordinates
        }
      });

      updateUser(updatedUser);
      
      toast({
        title: "Success",
        description: "Location preferences updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update location preferences",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-navy-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Account Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="password">
          <TabsList className="grid w-full grid-cols-2 bg-navy-800">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="bg-navy-800 border-gold-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="bg-navy-800 border-gold-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-navy-800 border-gold-500/20"
                />
              </div>
              <Button type="submit" className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
                Update Password
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="location">
            <form onSubmit={handleLocationSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Home/Office Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  required
                  className="bg-navy-800 border-gold-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="Enter your postcode"
                  required
                  className="bg-navy-800 border-gold-500/20"
                />
              </div>
              <Button type="submit" className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
                Update Location
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}