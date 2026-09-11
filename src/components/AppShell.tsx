import type { ReactNode } from "react";
import MobileHeader from "./MobileHeader";
import BottomNavigation from "./BottomNavigation";

interface Props {
  title?: string;
  showHeader?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  headerRight?: ReactNode;
  showBottomNav?: boolean;
  stickyFooter?: ReactNode;
  transparentHeader?: boolean;
  children: ReactNode;
}

export default function AppShell({
  title,
  showHeader = true,
  showBack = true,
  onBack,
  headerRight,
  showBottomNav = false,
  stickyFooter,
  transparentHeader = false,
  children,
}: Props) {
  return (
    <div className="min-h-full flex flex-col bg-mist-100 animate-screen-in">
      {showHeader && title && (
        <MobileHeader title={title} showBack={showBack} onBack={onBack} right={headerRight} transparent={transparentHeader} />
      )}
      <div className="flex-1 flex flex-col">{children}</div>
      {stickyFooter && (
        <div className="sticky bottom-0 z-20 bg-mist-100/95 backdrop-blur-md border-t border-mist-200 p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
          {stickyFooter}
        </div>
      )}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}
