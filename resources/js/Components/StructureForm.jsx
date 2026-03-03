import React, { useState } from 'react';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialData = [
    {
        id: generateId(),
        name: 'items',
        title: 'Items',
        description: 'Main menu items',
        elements: [
            { id: generateId(), title: 'Burger', description: 'Delicious beef burger', isRequired: false, price_addon: 0 },
            { id: generateId(), title: 'Pizza', description: 'Cheese pizza', isRequired: false, price_addon: 0 }
        ]
    },
    {
        id: generateId(),
        name: 'modifiers',
        title: 'Modifiers',
        description: 'Item modifiers and add-ons',
        elements: [
            { id: generateId(), title: 'Extra Cheese', description: 'Add extra cheese', isRequired: false, isSingleChoice: true, price_addon: 1.5 },
            { id: generateId(), title: 'No Onions', description: 'Remove onions', isRequired: false, isSingleChoice: false, price_addon: 0 }
        ]
    }
];

export default function StructureForm({ initialDataProp = initialData, onSave }) {
    const [categories, setCategories] = useState(initialDataProp);

    const moveCategory = (index, direction) => {
        if ((direction === -1 && index === 0) || (direction === 1 && index === categories.length - 1)) return;
        const newCategories = [...categories];
        const temp = newCategories[index];
        newCategories[index] = newCategories[index + direction];
        newCategories[index + direction] = temp;
        setCategories(newCategories);
    };

    const moveElement = (catIndex, elemIndex, direction) => {
        const category = categories[catIndex];
        if ((direction === -1 && elemIndex === 0) || (direction === 1 && elemIndex === category.elements.length - 1)) return;

        const newElements = [...category.elements];
        const temp = newElements[elemIndex];
        newElements[elemIndex] = newElements[elemIndex + direction];
        newElements[elemIndex + direction] = temp;

        const newCategories = [...categories];
        newCategories[catIndex] = { ...category, elements: newElements };
        setCategories(newCategories);
    };

    const updateCategory = (index, field, value) => {
        const newCategories = [...categories];
        newCategories[index] = { ...newCategories[index], [field]: value };
        setCategories(newCategories);
    };

    const updateElement = (catIndex, elemIndex, field, value) => {
        const newCategories = [...categories];
        const newElements = [...newCategories[catIndex].elements];
        newElements[elemIndex] = { ...newElements[elemIndex], [field]: value };
        newCategories[catIndex].elements = newElements;
        setCategories(newCategories);
    };

    const addCategory = () => {
        setCategories([...categories, { id: generateId(), name: 'new_category', title: 'New Category', description: '', elements: [] }]);
    };

    const removeCategory = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const addElement = (catIndex) => {
        const newCategories = [...categories];
        newCategories[catIndex].elements.push({
            id: generateId(),
            title: 'New Item',
            description: '',
            isRequired: false,
            isSingleChoice: false,
            price_addon: 0
        });
        setCategories(newCategories);
    };

    const removeElement = (catIndex, elemIndex) => {
        const newCategories = [...categories];
        newCategories[catIndex].elements = newCategories[catIndex].elements.filter((_, i) => i !== elemIndex);
        setCategories(newCategories);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) onSave(categories);
        else console.log('Saved Structure:', categories);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Imported Structure</h2>
                <p className="text-gray-600">Review, modify, and reorder categorized data before finalizing.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {categories.map((category, catIndex) => (
                    <div key={category.id} className="border border-gray-200 rounded-lg p-5 bg-gray-50 relative shadow-sm">

                        {/* Category Header Controls */}
                        <div className="absolute right-4 top-4 flex items-center space-x-2">
                            <button type="button" onClick={() => moveCategory(catIndex, -1)} disabled={catIndex === 0} className="p-1 text-gray-500 hover:text-indigo-600 disabled:opacity-30">
                                ↑
                            </button>
                            <button type="button" onClick={() => moveCategory(catIndex, 1)} disabled={catIndex === categories.length - 1} className="p-1 text-gray-500 hover:text-indigo-600 disabled:opacity-30">
                                ↓
                            </button>
                            <button type="button" onClick={() => removeCategory(catIndex)} className="p-1 text-red-500 hover:text-red-700 ml-2">
                                ✕
                            </button>
                        </div>

                        {/* Category Fields */}
                        <div className="grid gap-4 mb-6 md:grid-cols-2 pr-24">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category Title</label>
                                <input
                                    type="text"
                                    value={category.title}
                                    onChange={(e) => updateCategory(catIndex, 'title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    value={category.description}
                                    onChange={(e) => updateCategory(catIndex, 'description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>

                        {/* Elements List */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-gray-700 border-b pb-2">Elements in {category.title}</h4>
                            {category.elements.map((elem, elemIndex) => (
                                <div key={elem.id} className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-gray-100 rounded-md shadow-sm items-start md:items-center relative pl-8">
                                    {/* Item Reorder Controls */}
                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center">
                                        <button type="button" onClick={() => moveElement(catIndex, elemIndex, -1)} disabled={elemIndex === 0} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30 leading-none">▲</button>
                                        <button type="button" onClick={() => moveElement(catIndex, elemIndex, 1)} disabled={elemIndex === category.elements.length - 1} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30 leading-none">▼</button>
                                    </div>

                                    <div className="flex-1 grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
                                        <div className="lg:col-span-1">
                                            <label className="block text-xs text-gray-500 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={elem.title}
                                                onChange={(e) => updateElement(catIndex, elemIndex, 'title', e.target.value)}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1.5 border"
                                                required
                                            />
                                        </div>
                                        <div className="lg:col-span-1">
                                            <label className="block text-xs text-gray-500 mb-1">Description</label>
                                            <input
                                                type="text"
                                                value={elem.description}
                                                onChange={(e) => updateElement(catIndex, elemIndex, 'description', e.target.value)}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1.5 border"
                                            />
                                        </div>
                                        <div className="lg:col-span-1">
                                            <label className="block text-xs text-gray-500 mb-1">Price Add-on ($)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={elem.price_addon || 0}
                                                onChange={(e) => updateElement(catIndex, elemIndex, 'price_addon', parseFloat(e.target.value))}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1.5 border"
                                            />
                                        </div>

                                        <div className="lg:col-span-1 flex flex-col justify-center gap-2 pt-4">
                                            <label className="flex items-center space-x-2 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={elem.isRequired || false}
                                                    onChange={(e) => updateElement(catIndex, elemIndex, 'isRequired', e.target.checked)}
                                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span>Required</span>
                                            </label>
                                            {category.name === 'modifiers' && (
                                                <label className="flex items-center space-x-2 text-sm text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        checked={elem.isSingleChoice || false}
                                                        onChange={(e) => updateElement(catIndex, elemIndex, 'isSingleChoice', e.target.checked)}
                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <span>Single Choice</span>
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    <button type="button" onClick={() => removeElement(catIndex, elemIndex)} className="text-gray-400 hover:text-red-600 shrink-0 p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => addElement(catIndex)}
                                className="mt-2 inline-flex items-center px-3 py-1.5 border border-dashed border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                + Add Element
                            </button>
                        </div>

                    </div>
                ))}

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={addCategory}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add New Category
                    </button>

                    <button
                        type="submit"
                        className="inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Finalize Structure
                    </button>
                </div>
            </form>
        </div>
    );
}
