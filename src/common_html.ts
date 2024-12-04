export const getContext = (document: Document): CanvasRenderingContext2D => {
  const canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("2D context not available");
  }

  return ctx;
};
