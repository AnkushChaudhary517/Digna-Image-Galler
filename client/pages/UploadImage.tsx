import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadImages from "@/components/UploadImages";
import productHeaderSvgs from "@/components/decorativeSvgs/productHeaderSvgs";
import ImageMetaEditor from "@/components/ImageMetaEditor";

export default function UploadImage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMetaEditor, setShowMetaEditor] = useState(false);
  const navigate = useNavigate();

  // Navigate immediately when upload completes / success is shown
  useEffect(() => {
    if ((uploadedFiles && uploadedFiles.length > 0) || showSuccess) {
      try {
        navigate("/profile", { replace: true });
      } catch (err) {
        // ignore navigation error
      }
    }
  }, [uploadedFiles, showSuccess, navigate]);

  const handleUploadComplete = (files: File[]) => {
    setUploadedFiles(files);
    setShowSuccess(true);
    // keep message briefly if you still want to display it before navigation,
    // but navigation happens immediately via useEffect above.
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Called when user clicks "Add More" inside ImageMetaEditor
  const handleAddMore = () => {
    setShowMetaEditor(false); // Go back to UploadImages component
  };

  // Called when user finishes editing and submits
  const handleMetaSubmitComplete = () => {
    setShowMetaEditor(false); // Close the editor
    setUploadedFiles([]); // Optional: clear files
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header decorativeSvg={productHeaderSvgs} heading=" " description=" " height="300px" />

      <main className="flex-1 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8" style={{backgroundColor:"#FFFCF3"}}>
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 p-4 sm:p-6 rounded-lg" style={{backgroundColor:"white"}}>
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                <ImageIcon size={24} className="sm:w-8 sm:h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Drag & Drop to Upload
            </h1>
            {/* Upload Component */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <UploadImages
              onUploadComplete={handleUploadComplete}
              maxFiles={20}
              maxFileSize={10 * 1024 * 1024}
              acceptedFormats={[
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
              ]}
            />
          </div>

          {/* Success Message */}
          {showSuccess && uploadedFiles.length > 0 && (
            <ImageMetaEditor initialFiles={uploadedFiles} onAddMore={handleAddMore} onSubmitComplete={handleMetaSubmitComplete}/>
            // <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            //   <CheckCircle size={20} className="text-green-600" />
            //   <div>
            //     <p className="font-semibold text-green-900">
            //       Success! {uploadedFiles.length} image{uploadedFiles.length !== 1 ? "s" : ""} uploaded
            //     </p>
            //     <p className="text-sm text-green-700">
            //       Your images are now available in your gallery.
            //     </p>
            //   </div>
            // </div>
          )}

          

          {/* Upload Requirements */}


          {/* Bulk Actions for Uploaded */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 sm:mt-8 md:mt-12 p-4 sm:p-6 md:p-8 border border-border rounded-xl">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Successfully Uploaded ({uploadedFiles.length})
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={() => setUploadedFiles([])}
                  variant="outline"
                  style={{
                    fontFamily: "Sora, system-ui, sans-serif",
                    fontSize: "15px",
                    lineHeight: "20px",
                    fontWeight: 500,
                  }}
                  className="min-h-[44px] w-full sm:w-auto rounded-xl"
                >
                  Clear History
                </Button>
                <Button 
                  style={{
                    backgroundColor: "#2B21DA",
                    color: "#FFFFFF",
                    fontFamily: "Sora, system-ui, sans-serif",
                    fontSize: "15px",
                    lineHeight: "20px",
                    fontWeight: 500,
                  }}
                  className="hover:bg-[#2319b5] text-white min-h-[44px] w-full sm:w-auto rounded-xl"
                >
                  View in Gallery
                </Button>
              </div>
            </div>
          )}
                    <div className="mt-6 sm:mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Original content you captured</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Excludes nudity, violence, or hate</span>
                  </li>
                </ul>
              </div>
                <div>
                    <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                        <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Mindful of the rights of others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>To be downloaded& used for free</span>
                  </li>
                    </ul>
                </div>
              <div>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>High quality photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Read the Digna Terms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
            
          </div>

          
        </div>
      </main>

      <Footer />
    </div>
  );
}
