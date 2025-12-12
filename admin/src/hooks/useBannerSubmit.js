
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import SettingServices from "@/services/SettingServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useBannerSubmit = () => {
    const { setIsUpdate } = useContext(SidebarContext);
    const [isSave, setIsSave] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State for images
    const [sliderImages, setSliderImages] = useState([]);
    const [coverImage, setCoverImage] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const settingData = {
                name: "globalSetting",
                setting: {
                    // We need to preserve existing settings!
                    // This is tricky. Ideally the backend should support PATCH or we fetch-merge-save.
                    // For now, looking at Setting.jsx, it seems it sends a big object.
                    // But here we only want to update banner related stuff.
                    // Let's assume the controller merges if we use the same key?
                    // checking controller... it calculates `setObject`.
                    // const setObject = Object.keys(setting).reduce...
                    // It uses $set. So if we send only { "banner_slider": [...] }, it should ONLY update that field
                    // and leave others intact.

                    banner_slider: sliderImages,
                    banner_cover: coverImage,
                },
            };

            if (!isSave) {
                const res = await SettingServices.updateGlobalSetting(settingData);
                if (res) {
                    setIsUpdate(true);
                    setIsSubmitting(false);
                    notifySuccess(res.message);
                }
            } else {
                const res = await SettingServices.addGlobalSetting(settingData);
                setIsUpdate(true);
                setIsSubmitting(false);
                notifySuccess(res.message);
            }
        } catch (err) {
            notifyError(err?.response?.data?.message || err?.message);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await SettingServices.getGlobalSetting();
                if (res) {
                    setIsSave(false);
                    // Load existing values
                    setSliderImages(res.banner_slider || []);
                    setCoverImage(res.banner_cover || "");
                }
            } catch (err) {
                notifyError(err?.response?.data?.message || err?.message);
            }
        })();
    }, []);

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSave,
        isSubmitting,
        sliderImages,
        setSliderImages,
        coverImage,
        setCoverImage,
    };
};

export default useBannerSubmit;
