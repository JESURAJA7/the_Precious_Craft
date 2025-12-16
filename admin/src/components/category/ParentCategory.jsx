import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";

//internal import
import useAsync from "@/hooks/useAsync";
import { notifySuccess, notifyError } from "@/utils/toast";
import CategoryServices from "@/services/CategoryServices";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const ParentCategory = ({
  selectedCategory,
  setSelectedCategory,
  setDefaultCategory,
}) => {
  const { data, loading } = useAsync(CategoryServices?.getAllCategory);
  const { showingTranslateValue } = useUtilsFunction();

  // State for Cascading Dropdowns
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");

  const [subCatOptions, setSubCatOptions] = useState([]);
  const [childCatOptions, setChildCatOptions] = useState([]);

  // Populate Sub Categories when Main changes
  useEffect(() => {
    if (mainCategory && data) {
      const parent = data.find((c) => c._id === mainCategory);
      setSubCatOptions(parent?.children || []);
      setSubCategory(""); // Reset sub
      setChildCategory(""); // Reset child
      setChildCatOptions([]);
    }
  }, [mainCategory, data]);

  // Populate Child Categories when Sub changes
  useEffect(() => {
    if (subCategory && subCatOptions) {
      const parent = subCatOptions.find((c) => c._id === subCategory);
      setChildCatOptions(parent?.children || []);
      setChildCategory(""); // Reset child
    }
  }, [subCategory, subCatOptions]);


  const findObject = (obj, target) => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
        (acc, obj) => acc ?? findObject(obj, target),
        undefined
      );
  };

  const traverseAndFind = (targetId) => {
    if (!data) return undefined;
    for (const cat of data) {
      const found = findObject(cat, targetId);
      if (found) return found;
    }
    return undefined;
  }

  const handleAddCategory = () => {
    const idsToAdd = [mainCategory, subCategory, childCategory].filter(Boolean);

    if (idsToAdd.length === 0) {
      return notifyError("Please select at least a Main Category.");
    }

    const newCategories = [];

    idsToAdd.forEach((id) => {
      const isAlreadySelected = selectedCategory.some((c) => c._id === id);
      if (!isAlreadySelected) {
        const found = traverseAndFind(id);
        if (found) {
          newCategories.push({
            _id: found._id,
            name: showingTranslateValue(found.name),
          });
        }
      }
    });

    if (newCategories.length === 0) {
      return notifyError("Selected categories are already added!");
    }

    setSelectedCategory((pre) => [...pre, ...newCategories]);

    // Set the deepest selected category as the default
    const deepestId = idsToAdd[idsToAdd.length - 1];
    const deepestResult = traverseAndFind(deepestId);
    if (deepestResult) {
      setDefaultCategory(() => [
        {
          _id: deepestResult._id,
          name: showingTranslateValue(deepestResult.name),
        },
      ]);
    }

    notifySuccess("Categories Added!");
  };

  const handleRemove = (v) => {
    setSelectedCategory(v);
  };

  return (
    <>
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
          Selected Categories
        </label>
        <Multiselect
          displayValue="name"
          groupBy="name"
          isObject={true}
          hidePlaceholder={true}
          onKeyPressFn={function noRefCheck() { }}
          onRemove={(v) => handleRemove(v)}
          onSearch={function noRefCheck() { }}
          onSelect={(v) => { }} // Selection handled by custom logic now
          selectedValues={selectedCategory}
          placeholder={"Selected Categories will appear here"}
          className="bg-white dark:bg-gray-800"
        ></Multiselect>
      </div>

      {!loading && data !== undefined && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium mb-3 text-gray-600 dark:text-gray-400">Category Picker</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* Main Category */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Main Category</label>
              <Select value={mainCategory} onValueChange={setMainCategory}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-left">
                  <SelectValue placeholder="Select Main" />
                </SelectTrigger>
                <SelectContent className="z-[100000] bg-white dark:bg-gray-800">
                  {data?.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat?.name?.en || showingTranslateValue(cat.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sub Category */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Sub Category</label>
              <Select
                value={subCategory}
                onValueChange={setSubCategory}
                disabled={!mainCategory || subCatOptions.length === 0}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-left">
                  <SelectValue placeholder="Select Sub" />
                </SelectTrigger>
                <SelectContent className="z-[100000] bg-white dark:bg-gray-800">
                  {subCatOptions?.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat?.name?.en || showingTranslateValue(cat.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Child Category */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Child Category</label>
              <Select
                value={childCategory}
                onValueChange={setChildCategory}
                disabled={!subCategory || childCatOptions.length === 0}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-left">
                  <SelectValue placeholder="Select Child" />
                </SelectTrigger>
                <SelectContent className="z-[100000] bg-white dark:bg-gray-800">
                  {childCatOptions?.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat?.name?.en || showingTranslateValue(cat.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="button" onClick={handleAddCategory} className="w-full md:w-auto h-9 text-sm">
              <FiPlus className="mr-1" /> Add Category
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ParentCategory;
