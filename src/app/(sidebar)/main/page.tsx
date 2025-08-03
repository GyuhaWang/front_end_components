import BlurScrollView from "@/compoments/layout/scroll-view/blurred-scroll-view/scroll-view";
import { ScrollViewPItem } from "@/compoments/layout/scroll-view/props";
import commonStyles from "@/app/page.module.css";
import {
  ServerConnectionCheckButton,
  ServerProtectedCheckButton,
} from "@/compoments/serverConnectionCheckButton";
export default function Home() {
  const scrollItems: ScrollViewPItem[] = [
    { id: 0, displayName: "this is first" },
    { id: 1, displayName: "this is second" },
    { id: 2, displayName: "this is third" },
    { id: 3, displayName: "this is 4" },
    { id: 4, displayName: "this is 5" },
    { id: 5, displayName: "this is 6" },
    { id: 5, displayName: "this is 7" },
    { id: 6, displayName: "this is 8" },
    { id: 7, displayName: "this is 9" },
  ];
  return (
    <div className={commonStyles.body}>
      <BlurScrollView items={scrollItems} min_display_num={3} />
      <ServerConnectionCheckButton />
      <ServerProtectedCheckButton />
    </div>
  );
}
