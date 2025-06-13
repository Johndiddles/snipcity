
import { Filter, Code, Globe, Lock, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  filters: {
    languages: string[];
    visibility: string;
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
}

const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  const languages = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", 
    "React", "Vue", "Angular", "Node.js", "PHP"
  ];

  const handleLanguageChange = (language: string, checked: boolean) => {
    const newLanguages = checked 
      ? [...filters.languages, language]
      : filters.languages.filter(l => l !== language);
    
    onFiltersChange({
      ...filters,
      languages: newLanguages
    });
  };

  return (
    <Card className="w-72 h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Languages */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Code className="h-4 w-4" />
            Languages
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={filters.languages.includes(language)}
                  onCheckedChange={(checked) => 
                    handleLanguageChange(language, checked as boolean)
                  }
                />
                <Label htmlFor={language} className="text-sm">
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Visibility */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Visibility
          </h4>
          <RadioGroup
            value={filters.visibility}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, visibility: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="text-sm">All Snippets</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="text-sm flex items-center gap-1">
                <Globe className="h-3 w-3" />
                Public
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="text-sm flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Private
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Sort By */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Sort By
          </h4>
          <RadioGroup
            value={filters.sortBy}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, sortBy: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newest" id="newest" />
              <Label htmlFor="newest" className="text-sm">Newest First</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oldest" id="oldest" />
              <Label htmlFor="oldest" className="text-sm">Oldest First</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="popular" id="popular" />
              <Label htmlFor="popular" className="text-sm">Most Popular</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="author" id="author" />
              <Label htmlFor="author" className="text-sm flex items-center gap-1">
                <User className="h-3 w-3" />
                By Author
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
