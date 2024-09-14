import { ClerkProvider } from "@clerk/nextjs";
import AuthLayout from "@/app/(components)/AuthLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthLayout>{children}</AuthLayout>
      </body>
    </html>
  );
}
