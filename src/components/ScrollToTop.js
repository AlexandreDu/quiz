import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// function venant de la doc reat router dom permettant de restaurer le scroll quand on change de page
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}