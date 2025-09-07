'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  id: string;
  name: string;
  initialImageUrl?: string;
}

export default function ImageUploader({ id, name, initialImageUrl }: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);

  // Reset preview URL if initialImageUrl changes
  useEffect(() => {
    if (!selectedFile && initialImageUrl) {
      setPreviewUrl(initialImageUrl);
    }
  }, [initialImageUrl, selectedFile]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      
      // Create a preview URL for the selected image
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  // Clear selected file
  const handleClearFile = () => {
    setSelectedFile(null);
    if (initialImageUrl) {
      setPreviewUrl(initialImageUrl);
    } else {
      setPreviewUrl(null);
    }
    
    // Reset the file input
    const fileInput = document.getElementById(id) as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <input
          type="file"
          id={id}
          name={name}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex space-x-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => document.getElementById(id)?.click()}
            className="flex-1"
          >
            {selectedFile ? 'Change Image' : 'Select Image'}
          </Button>
          
          {selectedFile && (
            <Button 
              type="button" 
              variant="destructive"
              onClick={handleClearFile}
            >
              Clear
            </Button>
          )}
        </div>
        
        <p className="text-sm text-gray-500 mt-1">
          {selectedFile ? selectedFile.name : 'No file selected'}
        </p>
      </div>
      
      {/* Image Preview */}
      {previewUrl && (
        <div className="mt-4 border border-gray-200 rounded-md p-2 relative">
          <div className="relative h-48 w-full">
            <Image
              src={previewUrl}
              alt="Logo preview"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
