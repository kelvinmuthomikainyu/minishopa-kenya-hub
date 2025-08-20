import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const kenyanCommunities = [
  // Major Cities
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", "Garissa", "Kakamega",
  
  // Counties & Major Towns
  "Machakos", "Meru", "Nyeri", "Embu", "Kericho", "Bomet", "Narok", "Kajiado", "Kiambu", "Murang'a",
  "Kirinyaga", "Nyandarua", "Laikipia", "Samburu", "Isiolo", "Marsabit", "Moyale", "Mandera", "Wajir", "Turkana",
  "West Pokot", "Elgeyo-Marakwet", "Nandi", "Baringo", "Uasin Gishu", "Trans-Nzoia", "Bungoma", "Busia", "Siaya",
  "Kisii", "Nyamira", "Migori", "Homa Bay", "Kilifi", "Taita-Taveta", "Kwale", "Lamu", "Tana River", "Makueni",
  
  // Sub-Counties & Towns
  "Ruiru", "Kikuyu", "Limuru", "Githunguri", "Kiambu Town", "Karuri", "Juja", "Ruaka", "Banana Hill", "Runda",
  "Karen", "Langata", "Kibera", "Eastleigh", "Kasarani", "Roysambu", "Mathare", "Dagoretti", "Westlands", "Kilimani",
  "Lavington", "Kileleshwa", "Parklands", "Highridge", "South B", "South C", "Embakasi", "Donholm", "Buruburu", "Umoja",
  "Kayole", "Dandora", "Kariobangi", "Huruma", "Mathare North", "Pangani", "Shauri Moyo", "Makadara", "Kamukunji", "Starehe",
  
  // Coastal Towns
  "Diani", "Ukunda", "Msambweni", "Lunga Lunga", "Shimoni", "Watamu", "Kilifi Town", "Mariakani", "Voi", "Taveta",
  "Wundanyi", "Mwatate", "Lamu Town", "Mokowe", "Garsen", "Hola", "Bura", "Madogo", "Kipini", "Witu",
  
  // Western Kenya
  "Webuye", "Kimilili", "Sirisia", "Kanduyi", "Bumula", "Teso North", "Teso South", "Nambale", "Butula", "Funyula",
  "Budalangi", "Ugunja", "Gem", "Rarieda", "Bondo", "Suba North", "Suba South", "Gwassi", "Mbita", "Ndhiwa",
  
  // Central Kenya
  "Othaya", "Mukurweini", "Mathira", "Kieni", "Tetu", "Gatundu", "Gatanga", "Kandara", "Kenol", "Sagana"
];

interface LocationPickerProps {
  className?: string;
}

const LocationPicker = ({ className }: LocationPickerProps) => {
  const [selectedLocation, setSelectedLocation] = useState("Nairobi");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={`flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors ${className}`}
        >
          <MapPin className="w-4 h-4" />
          <span className="hidden sm:inline">{selectedLocation}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 max-h-80 overflow-y-auto" 
        align="end"
        sideOffset={5}
      >
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Select Your Location
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Popular locations first */}
        <div className="py-1">
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2">
            Popular Cities
          </DropdownMenuLabel>
          {kenyanCommunities.slice(0, 10).map((location) => (
            <DropdownMenuItem
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`cursor-pointer text-sm ${
                selectedLocation === location 
                  ? "bg-accent text-accent-foreground font-medium" 
                  : ""
              }`}
            >
              <MapPin className="w-3 h-3 mr-2 opacity-60" />
              {location}
            </DropdownMenuItem>
          ))}
        </div>
        
        <DropdownMenuSeparator />
        
        {/* All other locations */}
        <div className="py-1">
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2">
            All Locations
          </DropdownMenuLabel>
          {kenyanCommunities.slice(10).map((location) => (
            <DropdownMenuItem
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`cursor-pointer text-sm ${
                selectedLocation === location 
                  ? "bg-accent text-accent-foreground font-medium" 
                  : ""
              }`}
            >
              <MapPin className="w-3 h-3 mr-2 opacity-60" />
              {location}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocationPicker;
