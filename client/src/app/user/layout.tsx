import { ClerkProvider } from "@clerk/nextjs";
import { FriendsProvider } from "@/app/(context)/FriendsProvider";
import OverlayUI from "@/app/overlayUI";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FriendsProvider>
      <html lang="en">
        <body className={`antialiased`}>
          <OverlayUI>{children}</OverlayUI>
        </body>
      </html>
    </FriendsProvider>
  );
}
