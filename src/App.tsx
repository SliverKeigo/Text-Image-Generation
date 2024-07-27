import { useState, useRef } from 'react';
import { captureContentAsImage, downloadImage, copyImageToClipboard } from './generate';
import './assets/Huiwen_mingchao.woff2';
import './index.css'; // Ensure this file is imported to apply global styles
import { Twitter, Github } from 'lucide-react';
function App() {
  const [inputText, setInputText] = useState('');
  const [fontSizes, setFontSizes] = useState<string[]>([]);
  const [fontColor, setFontColor] = useState('#000000'); // Default color is black
  const contentRef = useRef<HTMLDivElement>(null);

  const getRandomFontSize = () => {
    const minSize = 12;
    const maxSize = 24;
    return `${Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize}px`;
  };

  const updateFontSizes = () => {
    const newFontSizes = inputText.split('\n').map(() => getRandomFontSize());
    setFontSizes(newFontSizes);
  };

  const handleDownload = async () => {
    if (contentRef.current) {
      const canvas = await captureContentAsImage(contentRef.current);
      downloadImage(canvas, 'content.png');
    }
  };
  const handleCopy = async () => {
    if (contentRef.current) {
      const canvas = await captureContentAsImage(contentRef.current);
      await copyImageToClipboard(canvas);
    }
  };

  const textBlocks = inputText.split('\n').map((block, index) => (
    <div key={index} style={{ fontSize: fontSizes[index] || getRandomFontSize(), color: fontColor }}>
      {block}
    </div>
  ));

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-screen-xl min-h-screen mt-16 mb-32 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Text Image Generator Tool</h1>
        <div className="flex space-x-4">
          <div className="flex-1 flex flex-col min-h-screen space-y-4">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="p-4 border overflow-hidden border-gray-300 rounded resize-none h-3/5 mb-2"
              placeholder="Enter text"
              rows={10}
            />
            <div className="flex space-x-4 flex-item items-center gap-4 p-4 rounded-lg">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Download Image
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Copy Image
              </button>
              <button
                onClick={() => setInputText('')}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Clear InputText
              </button>
              <button
                onClick={updateFontSizes}
                className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-colors duration-200"
              >
                Change Style
              </button>
              <div className="relative inline-block">
                <input
                  type="color"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                  className="opacity-0 absolute w-full h-full cursor-pointer"
                />
                <div
                  className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
                  style={{backgroundColor: fontColor}}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col min-h-screen space-y-4">
            <div ref={contentRef}
                 className="p-4 overflow-hidden border-2 border-gray-300  rounded-3xl bg-gray-50 h-3/5 huiwen-font whitespace-pre-wrap">
              {textBlocks}
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute -mb-32 bottom-0 w-full text-center text-gray-500 text-sm p-4">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="https://twitter.com/SliverKeigo1024" target="_blank" rel="noopener noreferrer"
             className="text-gray-500 hover:text-blue-400 transition-colors duration-200">
            <Twitter size={24} strokeWidth={1.5}/>
          </a>
          <a href="https://github.com/SliverKeigo/Text-Image-Generation" target="_blank" rel="noopener noreferrer"
             className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <Github size={24} strokeWidth={1.5}/>
          </a>
        </div>
        <p className="mt-2">© 2024 Text Image Generation. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default App;