export interface ScrollViewProps {
  items: ScrollViewPItem[];
  min_display_num?: number ;
}

export interface ScrollViewPItem {
  id: unknown;
  displayName: string;
}
