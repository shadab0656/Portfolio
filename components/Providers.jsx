"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import BookingModal from "./BookingModal";

const BookingContext = createContext({ open: () => {}, close: () => {}, isOpen: false });

export const useBooking = () => useContext(BookingContext);

export default function Providers({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState("");
  // open("Noida") pre-fills the city; called from a click handler it receives an event, which is ignored
  const open = useCallback((preset) => {
    setCity(typeof preset === "string" ? preset : "");
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    // reducedMotion="user" turns transform animations off for people who ask their OS for less motion
    <MotionConfig reducedMotion="user">
      <BookingContext.Provider value={value}>
        {children}
        <BookingModal isOpen={isOpen} onClose={close} city={city} />
      </BookingContext.Provider>
    </MotionConfig>
  );
}
