"use client";

import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function Overlay({ open }: { open: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // prevent SSR mismatch
  if (!mounted) return null;

  return (
    <Backdrop
      sx={{
        color: "#ffffff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
