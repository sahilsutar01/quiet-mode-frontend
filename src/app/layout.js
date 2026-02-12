import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "Quiet Mode",
  description:
    "A calm, private space. You don't have to hold everything together here.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
