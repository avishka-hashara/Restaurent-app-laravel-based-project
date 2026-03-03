<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class AdminMenuItemController extends Controller
{
    public function index(): Response
    {
        // Fetch all menu items along with their category name
        $menuItems = MenuItem::with('category')->latest()->get();

        return Inertia::render('Admin/MenuItems/Index', [
            'menuItems' => $menuItems
        ]);
    }

    public function create(): Response
    {
        // We need categories for the dropdown when creating an item
        $categories = Category::all();

        return Inertia::render('Admin/MenuItems/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'is_available' => 'boolean',
        ]);

        // Automatically generate a URL-friendly slug from the name
        $validated['slug'] = Str::slug($validated['name']);

        MenuItem::create($validated);

        return redirect()->route('admin.menu-items.index')->with('success', 'Menu item added successfully!');
    }

    public function destroy(MenuItem $menuItem): RedirectResponse
    {
        $menuItem->delete();

        return redirect()->route('admin.menu-items.index')->with('success', 'Menu item removed.');
    }
}