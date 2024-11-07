export interface FilterSelectProps {
  onFilterChange: (filter: string) => void;
  filterType: 'country' | 'species';
  filterOptions: string[];
}