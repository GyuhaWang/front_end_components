export interface SideBarProps {
  title?: string;
  backgroundColor?: string;
  items: SideBarItem[];
}

export interface SideBarItem {
  id: unknown;
  displayName: string;
}
