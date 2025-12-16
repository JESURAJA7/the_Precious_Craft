//internal import

import useUtilsFunction from "@hooks/useUtilsFunction";
import CarouselCard from "@components/carousel/CarouselCard";
import {
  getStoreCustomizationSetting,
  getGlobalSetting,
} from "@services/SettingServices";
import { showingTranslateValue } from "@lib/translate";

const MainCarousel = async () => {
  const { showingUrl, showingImage } = useUtilsFunction();

  const { storeCustomizationSetting } = await getStoreCustomizationSetting();
  const { globalSetting } = await getGlobalSetting();
  const slider = storeCustomizationSetting?.slider;

  const bannerSliderImages = globalSetting?.banner_slider;
  const coverImage = globalSetting?.banner_cover || globalSetting?.banner;

  // console.log("DEBUG: MainCarousel bannerSliderImages:", bannerSliderImages);
  // console.log("DEBUG: MainCarousel old slider settings:", slider);

  // If we have banner slider images from the new uploader, use them
  let sliderData = [];

  console.log("DEBUG: MainCarousel sliderData:", bannerSliderImages);

  if (bannerSliderImages && bannerSliderImages.length > 0) {
    sliderData = bannerSliderImages.map((img, index) => ({
      id: index + 1,
      title: "",
      info: "",
      buttonName: "",
      url: "#",
      image: img,
    }));
  } else if (coverImage) {
    // If we have a single cover image, use it as a single slide
    sliderData = [
      {
        id: 1,
        title: "",
        info: "",
        buttonName: "",
        url: "#",
        image: coverImage,
      }
    ];
  } else {
    // Fallback to the old customization setting
    sliderData = [
      {
        id: 1,
        title: showingTranslateValue(slider?.first_title),
        info: showingTranslateValue(slider?.first_description),
        buttonName: showingTranslateValue(slider?.first_button),
        url: showingUrl(slider?.first_link),
        image: showingImage(slider?.first_img),
      },
      {
        id: 2,
        title: showingTranslateValue(slider?.second_title),
        info: showingTranslateValue(slider?.second_description),
        buttonName: showingTranslateValue(slider?.second_button),
        url: showingUrl(slider?.second_link),
        image: showingImage(slider?.second_img),
      },
      {
        id: 3,
        title: showingTranslateValue(slider?.third_title),
        info: showingTranslateValue(slider?.third_description),
        buttonName: showingTranslateValue(slider?.third_button),
        url: showingUrl(slider?.third_link),
        image: showingImage(slider?.third_img),
      },
      {
        id: 4,
        title: showingTranslateValue(slider?.four_title),
        info: showingTranslateValue(slider?.four_description),
        buttonName: showingTranslateValue(slider?.four_button),
        url: showingUrl(slider?.four_link),
        image: showingImage(slider?.four_img),
      },
      {
        id: 5,
        title: showingTranslateValue(slider?.five_title),
        info: showingTranslateValue(slider?.five_description),
        buttonName: showingTranslateValue(slider?.five_button),
        url: showingUrl(slider?.five_link),
        image: showingImage(slider?.five_img),
      },
    ];

    // Filter out slides with no image
    sliderData = sliderData.filter((item) => item.image);
  }

  return (
    <>
      <CarouselCard
        sliderData={sliderData}
        storeCustomizationSetting={storeCustomizationSetting}
      />
    </>
  );
};

export default MainCarousel;
