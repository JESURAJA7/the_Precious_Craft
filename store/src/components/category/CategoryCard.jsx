// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import {
//   IoChevronDownOutline,
//   IoChevronForwardOutline,
//   IoRemoveSharp,
// } from "react-icons/io5";

// import useUtilsFunction from "@hooks/useUtilsFunction";

// const CategoryCard = ({ title, icon, nested, id, onClose }) => {
//   const router = useRouter();
//   const { showingTranslateValue } = useUtilsFunction();

//   const [show, setShow] = useState(false);
//   const [showSubCategory, setShowSubCategory] = useState({
//     id: "",
//     show: false,
//   });

//   // ✅ Search only when clicking on the category name
//   const handleSearch = (id, categoryName) => {
//     const name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
//     router.push(`/search?category=${name}&_id=${id}`);
//     if (onClose) {
//       onClose();
//     }
//   };

//   // ✅ Toggle expand only when clicking the arrow/icon
//   const toggleExpand = () => {
//     setShow(!show);
//   };

//   const handleSubNestedToggle = (id) => {
//     setShowSubCategory({
//       id: id,
//       show: showSubCategory.id === id ? !showSubCategory.show : true,
//     });
//   };

//   return (
//     <>
//       <div className="p-2 flex items-center rounded-md hover:bg-gray-50 w-full">
//         {icon ? (
//           <Image src={icon} width={18} height={18} alt="Category" />
//         ) : (
//           <Image
//             src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
//             width={18}
//             height={18}
//             alt="category"
//           />
//         )}

//         {/* ✅ Clicking name = search */}
//         <div
//           onClick={() => handleSearch(id, title)}
//           className="ml-3 text-sm font-medium flex-1 cursor-pointer hover:text-purple-600"
//         >
//           {title}
//         </div>

//         {/* ✅ Clicking arrow = expand */}
//         {nested?.length > 0 && (
//           <span
//             onClick={toggleExpand}
//             className="cursor-pointer text-gray-400 hover:text-purple-600"
//           >
//             {show ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
//           </span>
//         )}
//       </div>

//       {/* Nested categories */}
//       {show && nested.length > 0 && (
//         <ul className="pl-6 pb-3 pt-1 -mt-1">
//           {nested.map((children) => (
//             <li key={children._id}>
//               {children.children.length > 0 ? (
//                 <div className="flex items-center py-1">
//                   <span className="text-xs text-gray-500 pr-2">
//                     <IoRemoveSharp />
//                   </span>
//                   <div
//                     onClick={() =>
//                       handleSearch(
//                         children._id,
//                         showingTranslateValue(children.name)
//                       )
//                     }
//                     className="flex-1 text-sm text-gray-600 hover:text-purple-600 cursor-pointer"
//                   >
//                     {showingTranslateValue(children.name)}
//                   </div>
//                   <span
//                     onClick={() => handleSubNestedToggle(children._id)}
//                     className="cursor-pointer text-gray-400 hover:text-purple-600"
//                   >
//                     {showSubCategory.id === children._id &&
//                     showSubCategory.show ? (
//                       <IoChevronDownOutline />
//                     ) : (
//                       <IoChevronForwardOutline />
//                     )}
//                   </span>
//                 </div>
//               ) : (
//                 <div
//                   onClick={() =>
//                     handleSearch(
//                       children._id,
//                       showingTranslateValue(children.name)
//                     )
//                   }
//                   className="flex items-center py-1 text-sm text-gray-600 hover:text-purple-600 cursor-pointer"
//                 >
//                   <span className="text-xs text-gray-500 pr-2">
//                     <IoRemoveSharp />
//                   </span>
//                   {showingTranslateValue(children.name)}
//                 </div>
//               )}

//               {/* Sub children */}
//               {showSubCategory.id === children._id && showSubCategory.show && (
//                 <ul className="pl-6 pb-3">
//                   {children.children.map((subChildren) => (
//                     <li
//                       key={subChildren._id}
//                       onClick={() =>
//                         handleSearch(
//                           subChildren._id,
//                           showingTranslateValue(subChildren.name)
//                         )
//                       }
//                       className="flex items-center py-1 text-sm text-gray-600 hover:text-purple-600 cursor-pointer"
//                     >
//                       <span className="text-xs text-gray-500 pr-2">
//                         <IoRemoveSharp />
//                       </span>
//                       {showingTranslateValue(subChildren.name)}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// };

// export default CategoryCard;



import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from "react-icons/io5";

import useUtilsFunction from "@hooks/useUtilsFunction";

const CategoryCard = ({ title, icon, nested, id, onClose }) => {
  const router = useRouter();
  const { showingTranslateValue } = useUtilsFunction();

  const [show, setShow] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState({
    id: "",
    show: false,
  });

  // ✅ Navigate to category page
  const handleSearch = (id, categoryName) => {
    const name = categoryName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""); // clean slug

    router.push(`/search?category=${name}&_id=${id}`);

    // ✅ Automatically close the list
    if (onClose) onClose();
  };

  // ✅ Toggle expand/collapse for children
  const toggleExpand = () => {
    setShow(!show);
  };

  const handleSubNestedToggle = (id) => {
    setShowSubCategory({
      id: id,
      show: showSubCategory.id === id ? !showSubCategory.show : true,
    });
  };

  return (
    <>
      {/* Parent category */}
      <div className="p-2 flex items-center rounded-md hover:bg-gray-50 w-full">
        {icon ? (
          <Image src={icon} width={18} height={18} alt="Category" />
        ) : (
          <Image
            src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
            width={18}
            height={18}
            alt="category"
          />
        )}

        {/* ✅ Clicking name = search */}
        <div
          onClick={() => handleSearch(id, title)}
          className="ml-3 text-sm font-medium flex-1 cursor-pointer hover:text-purple-600"
        >
          {title}
        </div>

        {/* ✅ Clicking arrow = expand */}
        {nested?.length > 0 && (
          <span
            onClick={toggleExpand}
            className="cursor-pointer text-gray-400 hover:text-purple-600"
          >
            {show ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
          </span>
        )}
      </div>

      {/* ✅ Nested categories */}
      {show && nested.length > 0 && (
        <ul className="pl-6 pb-3 pt-1 -mt-1">
          {nested.map((children) => (
            <li key={children._id}>
              {children.children.length > 0 ? (
                <div className="flex items-center py-1">
                  <span className="text-xs text-gray-500 pr-2">
                    <IoRemoveSharp />
                  </span>

                  {/* ✅ Child category with logo */}
                  <div
                    onClick={() =>
                      handleSearch(
                        children._id,
                        showingTranslateValue(children.name)
                      )
                    }
                    className="flex items-center gap-2 flex-1 text-sm text-gray-600 hover:text-purple-600 cursor-pointer"
                  >
                    {children.icon ? (
                      <Image
                        src={children.icon}
                        width={16}
                        height={16}
                        alt={showingTranslateValue(children.name)}
                      />
                    ) : (
                      <Image
                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                        width={16}
                        height={16}
                        alt="category"
                      />
                    )}
                    {showingTranslateValue(children.name)}
                  </div>

                  {/* Toggle sub-categories */}
                  <span
                    onClick={() => handleSubNestedToggle(children._id)}
                    className="cursor-pointer text-gray-400 hover:text-purple-600"
                  >
                    {showSubCategory.id === children._id &&
                    showSubCategory.show ? (
                      <IoChevronDownOutline />
                    ) : (
                      <IoChevronForwardOutline />
                    )}
                  </span>
                </div>
              ) : (
                /* ✅ Child without subcategories (still shows logo) */
                <div
                  onClick={() =>
                    handleSearch(
                      children._id,
                      showingTranslateValue(children.name)
                    )
                  }
                  className="flex items-center gap-2 py-1 text-sm text-gray-600 hover:text-purple-600 cursor-pointer"
                >
                  <span className="text-xs text-gray-500">
                    <IoRemoveSharp />
                  </span>
                  {children.icon ? (
                    <Image
                      src={children.icon}
                      width={16}
                      height={16}
                      alt={showingTranslateValue(children.name)}
                    />
                  ) : (
                    <Image
                      src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                      width={16}
                      height={16}
                      alt="category"
                    />
                  )}
                  {showingTranslateValue(children.name)}
                </div>
              )}

              {/* ✅ Sub-children with logo */}
              {showSubCategory.id === children._id && showSubCategory.show && (
                <ul className="pl-6 pb-3">
                  {children.children.map((subChildren) => (
                    <li
                      key={subChildren._id}
                      onClick={() =>
                        handleSearch(
                          subChildren._id,
                          showingTranslateValue(subChildren.name)
                        )
                      }
                      className="flex items-center gap-2 py-1 text-sm text-gray-600 hover:text-purple-600 cursor-pointer"
                    >
                      <span className="text-xs text-gray-500">
                        <IoRemoveSharp />
                      </span>
                      {subChildren.icon ? (
                        <Image
                          src={subChildren.icon}
                          width={14}
                          height={14}
                          alt={showingTranslateValue(subChildren.name)}
                        />
                      ) : (
                        <Image
                          src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                          width={14}
                          height={14}
                          alt="category"
                        />
                      )}
                      {showingTranslateValue(subChildren.name)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CategoryCard;

