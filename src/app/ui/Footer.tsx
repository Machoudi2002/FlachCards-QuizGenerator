import React from "react";
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 text-center text-muted-foreground py-4">
      <Separator className="mb-4" />
      <p className="text-sm">© 2023 PDF Quiz Generator. All rights reserved.</p>
    </footer>
  );
};

export default Footer;