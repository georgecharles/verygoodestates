import { useState, useRef, useEffect } from 'react';
import { GripVertical, Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MarketWidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onMove?: (id: string, x: number, y: number) => void;
  initialPosition?: { x: number; y: number };
  expandedContent?: React.ReactNode;
}

const GRID_SIZE = 20; // Size of grid cells in pixels

export function MarketWidget({ 
  id, 
  title, 
  children, 
  onMove, 
  initialPosition,
  expandedContent 
}: MarketWidgetProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  const snapToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === dragRef.current) {
      setIsDragging(true);
      startPosRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = snapToGrid(e.clientX - startPosRef.current.x);
      const newY = snapToGrid(e.clientY - startPosRef.current.y);
      setPosition({ x: newX, y: newY });
      onMove?.(id, newX, newY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      <div
        className={`relative bg-navy-900/50 rounded-lg border border-gold-500/20 ${
          isDragging ? 'cursor-grabbing z-50' : ''
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s'
        }}
      >
        <div
          ref={dragRef}
          className="flex items-center justify-between p-4 cursor-grab border-b border-gold-500/20"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <GripVertical className="w-5 h-5 text-gold-400" />
            <h3 className="text-xl font-light text-white">{title}</h3>
          </div>
          {expandedContent && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(true)}
              className="text-gold-400 hover:text-gold-500"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        <div>
          {children}
        </div>
      </div>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl bg-navy-900 border-gold-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-white">{title}</DialogTitle>
          </DialogHeader>
          {expandedContent}
        </DialogContent>
      </Dialog>
    </>
  );
}