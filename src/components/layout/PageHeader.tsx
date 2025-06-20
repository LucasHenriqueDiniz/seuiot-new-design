import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { 
  Search,
  PlusCircle,
  Filter,
  Download,
  FilePlus,
  MoreHorizontal,
  GripVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageHeaderProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  buttons?: PageHeaderButton[];
  showFilters?: boolean;
  onFilter?: () => void;
  className?: string;
  withSearch?: boolean;
  withAddButton?: boolean;
  onAdd?: () => void;
  addButtonText?: string;
  repositoryId?: string;
}

export type PageHeaderButton = {
  label: string;
  icon?: React.ElementType;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  href?: string;
  disabled?: boolean;
};

export function PageHeader({
  title,
  description,
  searchPlaceholder = "Buscar...",
  onSearch,
  buttons = [],
  showFilters = false,
  onFilter,
  className,
  withSearch = true,
  withAddButton = false,
  onAdd,
  addButtonText = "Adicionar",
  repositoryId,
}: PageHeaderProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  // Max visible buttons (rest go to dropdown)
  const maxVisibleButtons = 2;
  const visibleButtons = buttons.slice(0, maxVisibleButtons);
  const dropdownButtons = buttons.length > maxVisibleButtons ? buttons.slice(maxVisibleButtons) : [];

  return (
    <div className={cn("space-y-4 mb-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {withAddButton && (
            <Button onClick={onAdd} className="w-full sm:w-auto">
              <PlusCircle className="h-4 w-4 mr-2" />
              {addButtonText}
            </Button>
          )}
          
          {visibleButtons.map((button, index) => {
            const Icon = button.icon;
            return (
              <Button
                key={index}
                variant={button.variant || "default"}
                onClick={button.onClick}
                className="w-full sm:w-auto"
                disabled={button.disabled}
                asChild={!!button.href}
              >
                {button.href ? (
                  <a href={button.href}>
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    {button.label}
                  </a>
                ) : (
                  <>
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    {button.label}
                  </>
                )}
              </Button>
            );
          })}

          {dropdownButtons.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <MoreHorizontal className="h-4 w-4 mr-2" />
                  Mais
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                {dropdownButtons.map((button, index) => {
                  const Icon = button.icon;
                  return (
                    <React.Fragment key={index}>
                      {index > 0 && <DropdownMenuSeparator />}
                      <DropdownMenuItem 
                        onClick={button.onClick}
                        disabled={button.disabled}
                        className="cursor-pointer"
                      >
                        {Icon && <Icon className="h-4 w-4 mr-2" />}
                        {button.label}
                      </DropdownMenuItem>
                    </React.Fragment>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {(withSearch || showFilters) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {withSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          )}
          {showFilters && (
            <Button variant="outline" onClick={onFilter} className="sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
