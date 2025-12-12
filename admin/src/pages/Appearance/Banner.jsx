import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";

//internal import
import PageTitle from "@/components/Typography/PageTitle";
import Uploader from "@/components/image-uploader/Uploader";
import useBannerSubmit from "@/hooks/useBannerSubmit";
// We will create/use a hook later, for now just UI

const Banner = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("slider"); // 'slider' or 'cover'

  const {
    handleSubmit,
    onSubmit,
    isSubmitting,
    sliderImages,
    setSliderImages,
    coverImage,
    setCoverImage,
  } = useBannerSubmit();

  // Helper to add image to slider array
  const handleAddSliderImage = (url) => {
    if (url) {
      setSliderImages([...sliderImages, url]);
    }
  };

  // Helper to remove image from slider array
  const handleRemoveSliderImage = (index) => {
    const newImages = [...sliderImages];
    newImages.splice(index, 1);
    setSliderImages(newImages);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <PageTitle>Appearance Settings</PageTitle>

      <div className="container p-6 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`py-2 px-4 focus:outline-none border-b-2 font-medium ${activeTab === "slider"
              ? "border-green-500 text-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            onClick={() => handleTabChange("slider")}
          >
            ✓ Slider
          </button>
          <button
            className={`py-2 px-4 focus:outline-none border-b-2 font-medium ${activeTab === "cover"
              ? "border-green-500 text-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            onClick={() => handleTabChange("cover")}
          >
            ✕ Cover
          </button>
        </div>

        {/* Content */}
        <div className="py-4">
          {activeTab === "slider" && (
            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Slider Images (Width: 1920px, Height: 630px)
              </h4>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Map sliderImages */}
                {sliderImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt="Slider" className="w-full h-32 object-cover rounded border" />
                    <button
                      type="button"
                      onClick={() => handleRemoveSliderImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1 shadow hover:bg-red-600"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}

                {/* Uploader integration */}
                <div className="col-span-full">
                  {/* Accessing the underlying uploader requires a bit of trick if it only accepts single image setting. 
                        Most Uploaders set a single string. We can use a temp state or just let the user pick one, 
                        then we append it to our list. 
                    */}
                  <Uploader
                    imageUrl=""
                    setImageUrl={handleAddSliderImage}
                    folder="slider"
                  />
                  <p className="text-xs text-gray-500 mt-1">Select an image to add to slider</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 hidden">
                {/* Hiding these buttons for now as Uploader handles addition directly above */}
                <Button className="w-full justify-center bg-blue-500 hover:bg-blue-600">
                  <FiPlus className="mr-2" /> Add Slide Image
                </Button>
                <Button className="w-full justify-center bg-white border border-blue-500 text-blue-500 hover:bg-blue-50">
                  <FiPlus className="mr-2" /> Add Additional Image
                </Button>
              </div>
            </div>
          )}

          {activeTab === "cover" && (
            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Cover Image
              </h4>
              <div className="mb-6">
                <Uploader imageUrl={coverImage} setImageUrl={setCoverImage} folder="cover" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>

      </div>
    </>
  );
};

export default Banner;
