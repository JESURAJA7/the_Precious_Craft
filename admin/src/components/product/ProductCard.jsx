
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FiEdit, FiTrash2, FiZoomIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Tooltip from '@/components/tooltip/Tooltip';
import CheckBox from '@/components/form/others/CheckBox';
import useUtilsFunction from '@/hooks/useUtilsFunction';
import useToggleDrawer from '@/hooks/useToggleDrawer';
import { useAction } from '@/context/ActionContext';
import EditDeleteButton from '@/components/table/EditDeleteButton';
import ShowHideButton from '@/components/table/ShowHideButton';

const ProductCard = ({ products }) => {
    const { handleModalOpen, handleUpdate } = useToggleDrawer();
    const { selectedIds, handleSelect } = useAction();
    const { currency, showingTranslateValue, getNumberTwo } = useUtilsFunction();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {products?.map((product) => (
                <Card
                    key={product._id}
                    className="group relative border border-gray-100 dark:border-gray-700 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 dark:bg-gray-800 bg-white overflow-hidden rounded-xl"
                >
                    {/* Header Actions */}
                    <div className="absolute top-3 left-3 z-10">
                        <CheckBox
                            type="checkbox"
                            id={product._id}
                            handleSelect={handleSelect}
                            isChecked={selectedIds?.includes(product._id)}
                        />
                    </div>
                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                        {/* Show/Hide Button Integrated nicely */}
                        <div className="bg-white dark:bg-gray-700 rounded-full shadow-sm p-1">
                            <ShowHideButton id={product._id} status={product.status} />
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-48 w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                        {product.stock <= 0 && (
                            <div className="absolute inset-0 bg-black/50 z-[5] flex items-center justify-center">
                                <Badge variant="danger" className="text-sm px-3 py-1">Stock Out</Badge>
                            </div>
                        )}

                        {product?.image[0] ? (
                            <img
                                src={product.image[0]}
                                alt={product.title?.en}
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`} />
                                <AvatarFallback>P</AvatarFallback>
                            </Avatar>
                        )}
                    </div>

                    <CardContent className="p-4">
                        {/* Category */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {showingTranslateValue(product?.category?.name)}
                        </div>

                        {/* Title */}
                        <Link to={`/product/${product._id}`} className="block mb-2">
                            <h3 className="font-semibold text-gray-800 dark:text-white truncate" title={showingTranslateValue(product?.title)}>
                                {showingTranslateValue(product?.title)}
                            </h3>
                        </Link>

                        {/* Price & Stock */}
                        <div className="flex items-center justify-between mt-3">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 line-through">
                                    {currency}{product?.isCombination ? getNumberTwo(product?.variants[0]?.originalPrice) : getNumberTwo(product?.prices?.originalPrice)}
                                </span>
                                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                    {currency}{product?.isCombination ? getNumberTwo(product?.variants[0]?.price) : getNumberTwo(product?.prices?.price)}
                                </span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Stock</span>
                                <span className={`text-sm font-bold ${product.stock > 0 ? 'text-gray-800 dark:text-gray-100' : 'text-red-500'}`}>
                                    {product.stock}
                                </span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center gap-2">
                        <Link
                            to={`/product/${product._id}`}
                            className="flex-1"
                        >
                            <Button variant="outline" size="sm" className="w-full text-xs h-8">
                                <FiZoomIn className="mr-1" /> Details
                            </Button>
                        </Link>

                        <div className="flex gap-1">
                            <div onClick={() => handleUpdate(product._id)}>
                                <Button size="sm" className="h-8 w-8 p-0 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 dark:hover:bg-emerald-900/40">
                                    <FiEdit />
                                </Button>
                            </div>
                            <div onClick={() => handleModalOpen(product._id, showingTranslateValue(product?.title))}>
                                <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                                    <FiTrash2 />
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ProductCard;
