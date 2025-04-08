import InfoNav from "@/components/Headers/InfoNav";

// app/(auth)/layout.tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <InfoNav />
        {children}
      </body>
    </html>
  );
}
