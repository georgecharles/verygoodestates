import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertySortProps {
  value: string;
  onChange: (value: 'price_asc' | 'price_desc' | 'newest') => void;
}

export function PropertySort({ value, onChange }: PropertySortProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400">Sort by:</span>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as 'price_asc' | 'price_desc' | 'newest')}
      >
        <SelectTrigger className="w-[180px] bg-navy-800 border-gold-500/20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price_asc">Price (Low to High)</SelectItem>
          <SelectItem value="price_desc">Price (High to Low)</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}