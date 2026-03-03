<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        // Fetch categories with their available menu items
        $categories = Category::with([
            'menuItems' => function ($query) {
                $query->where('is_available', true);
            }
        ])->get();

        return Inertia::render('Menu/Index', [
            'categories' => $categories
        ]);
    }
}
