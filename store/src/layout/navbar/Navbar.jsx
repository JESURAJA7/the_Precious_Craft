import Link from "next/link";

//internal imports
import TopNavbar from "./TopNavbar";
import NavbarPromo from "@layout/navbar/NavbarPromo";
import SearchInput from "@components/navbar/SearchInput";
import NotifyIcon from "@components/navbar/NotifyIcon";
import ProfileDropDown from "@components/navbar/ProfileDropDown";
import { getShowingLanguage } from "@services/SettingServices";
import { getShowingCategory } from "@services/CategoryService";
import MobileFooter from "@layout/footer/MobileFooter";

const Navbar = async ({ globalSetting, storeCustomization }) => {
  const { languages } = await getShowingLanguage();
  const { categories, error: categoryError } = await getShowingCategory();

  const currency = globalSetting?.default_currency || "$";
  // console.log(storeCustomization)
  return (
    // Navbar.jsx
    <div className=" z-20 top-0 w-full">
      {/* navbar top section */}

      <TopNavbar storeCustomization={storeCustomization} />

      <header className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 lg:divide-y lg:divide-gray-200">
          <div className="relative flex h-20 justify-between">
            <div className="relative z-10 hidden sm:flex px-2 lg:px-0">
              <Link href="/" className="flex flex-shrink-0 items-center">
                <img
                  className="h-12 w-auto animate-[spin_6s_linear_infinite]"
                  src="/logo/Precious.svg"
                  alt="Precious"
                />
                <span className="text-[24px] italic font-bold text-purple-900 whitespace-nowrap ml-2">
                  Precious Craft
                </span>
              </Link>
            </div>

            {/* search input section */}
            <div className="min-w-0 flex-1 md:px-8 lg:px-10 xl:col-span-6">
              <div className="flex items-center lg:justify-center md:justify-center justify-center px-9 py-9">
                <div className="w-full">
                  <SearchInput />
                </div>
              </div>
            </div>

            {/* notification icons */}
            <div className="hidden md:flex xl:col-span-2">
              <NotifyIcon />
            </div>

          </div>
        </div>
      </header>
      {/* navbar bottom */}
      <NavbarPromo
        languages={languages}
        categories={categories}
        categoryError={categoryError}
      />
      <MobileFooter
        categories={categories}
        categoryError={categoryError}
        globalSetting={globalSetting}
      />
    </div>
  );
};

export default Navbar;
