
import html2canvas from 'html2canvas';


export const captureContentAsImage = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
  return await html2canvas(element, {
    backgroundColor: null, // 这会使背景透明
    scale: 2, // 提高输出质量
  });
};


export const downloadImage = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = filename;
  link.click();
};

export const copyImageToClipboard = async (canvas: HTMLCanvasElement) => {
  canvas.toBlob(async (blob) => {
    if (blob) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
    }
  });
};