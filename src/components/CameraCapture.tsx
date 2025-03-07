
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw, Trash2 } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please make sure camera permissions are granted.");
      setIsStreaming(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      const width = video.videoWidth;
      const height = video.videoHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const fileName = `invoice-scan-${new Date().getTime()}.jpg`;
            const file = new File([blob], fileName, { type: "image/jpeg" });
            
            setCapturedImage(URL.createObjectURL(blob));
            onCapture(file);
            stopCamera();
          }
        }, "image/jpeg", 0.95);
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleButtonClick = () => {
    if (!isStreaming && !capturedImage) {
      startCamera();
    } else if (isStreaming && !capturedImage) {
      captureImage();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-border shadow-sm bg-background">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured invoice"
            className="w-full object-contain animate-scale-in"
            style={{ maxHeight: "300px" }}
          />
        ) : (
          <div className="relative bg-black w-full" style={{ height: "300px" }}>
            {isStreaming ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Camera className="h-16 w-16 text-muted-foreground opacity-30" />
              </div>
            )}
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-destructive animate-fade-in">
          {error}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {capturedImage ? (
          <>
            <Button
              variant="outline"
              onClick={retakePhoto}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retake Photo
            </Button>
            <Button
              variant="destructive"
              onClick={() => setCapturedImage(null)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Discard
            </Button>
          </>
        ) : (
          <Button onClick={handleButtonClick} className="btn-primary flex items-center gap-2">
            <Camera className="h-4 w-4" />
            {isStreaming ? "Capture Invoice" : "Open Camera"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
