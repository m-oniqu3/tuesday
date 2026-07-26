import { useEffect } from "react";
import { useModal } from "../hooks/useModal";

export default function ModalOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const { closeModal } = useModal();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
