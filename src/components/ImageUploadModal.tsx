import React, { useState, useRef, useCallback } from 'react';
import { X, Upload, Image as ImageIcon, Type, Palette, Download, Sparkles } from 'lucide-react';
import clsx from 'clsx';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageData: string, title: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const filters = [
    { id: 'none', name: 'Original', filter: 'none' },
    { id: 'sepia', name: 'Vintage', filter: 'sepia(100%)' },
    { id: 'grayscale', name: 'B&W', filter: 'grayscale(100%)' },
    { id: 'blur', name: 'Blur', filter: 'blur(2px)' },
    { id: 'brightness', name: 'Bright', filter: 'brightness(150%)' },
    { id: 'contrast', name: 'Sharp', filter: 'contrast(150%)' },
  ];

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const generateMeme = useCallback(() => {
    if (!selectedImage || !canvasRef.current) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const img = new Image();
    img.onload = () => {
      // Set canvas size
      canvas.width = img.width;
      canvas.height = img.height;

      // Apply filter
      if (selectedFilter !== 'none') {
        const filterStyle = filters.find(f => f.id === selectedFilter)?.filter || 'none';
        ctx.filter = filterStyle;
      }

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Reset filter for text
      ctx.filter = 'none';

      // Set text style
      const fontSize = Math.max(canvas.width / 20, 24);
      ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 15;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      // Draw top text
      if (topText) {
        const lines = topText.toUpperCase().split('\n');
        lines.forEach((line, index) => {
          const y = 20 + (index * fontSize * 1.2);
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }

      // Draw bottom text
      if (bottomText) {
        ctx.textBaseline = 'bottom';
        const lines = bottomText.toUpperCase().split('\n');
        lines.reverse().forEach((line, index) => {
          const y = canvas.height - 20 - (index * fontSize * 1.2);
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }
    };
    img.src = selectedImage;
  }, [selectedImage, topText, bottomText, selectedFilter, filters]);

  React.useEffect(() => {
    if (selectedImage) {
      generateMeme();
    }
  }, [selectedImage, topText, bottomText, selectedFilter, generateMeme]);

  const handleUpload = () => {
    if (!canvasRef.current || !title.trim()) return;
    
    const imageData = canvasRef.current.toDataURL('image/png');
    onUpload(imageData, title);
    onClose();
    
    // Reset form
    setSelectedImage(null);
    setTitle('');
    setTopText('');
    setBottomText('');
    setSelectedFilter('none');
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `meme-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl mx-4 rounded-xl overflow-hidden animate-fade-in shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Meme</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!selectedImage ? (
            /* Upload Area */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={clsx(
                'border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer',
                isDragging
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Upload Your Image
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Drag and drop an image here, or click to browse
              </p>
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : (
            /* Editor */
            <div className="space-y-6">
              {/* Preview */}
              <div className="text-center">
                <div className="relative inline-block">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-80 rounded-lg shadow-lg"
                    style={{ filter: selectedFilter !== 'none' ? filters.find(f => f.id === selectedFilter)?.filter : 'none' }}
                  />
                </div>
              </div>

              {/* Text Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Type className="w-4 h-4 inline mr-1" />
                    Top Text
                  </label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Enter top text..."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Type className="w-4 h-4 inline mr-1" />
                    Bottom Text
                  </label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Enter bottom text..."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Filters
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={clsx(
                        'p-3 rounded-lg text-sm font-medium transition-all',
                        selectedFilter === filter.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      )}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your meme a catchy title..."
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ImageIcon className="w-4 h-4 inline mr-2" />
                  Change Image
                </button>
                <button
                  onClick={handleDownload}
                  className="py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Download
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!title.trim()}
                  className="flex-1 py-3 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Post Meme
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;