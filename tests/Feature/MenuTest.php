<?php

use App\Models\Category;
use App\Models\MenuItem;
use function Pest\Laravel\get;
use function Pest\Laravel\post;


it('loads the public menu page successfully', function () {
    // Act & Assert: Hit the route and expect a 200 OK status
    get('/menu')->assertStatus(200);
});

it('displays available menu items on the menu page', function () {
    // Arrange: Create a category and an available menu item
    $category = Category::create(['name' => 'Desserts', 'slug' => 'desserts']);

    MenuItem::create([
        'category_id' => $category->id,
        'name' => 'Chocolate Lava Cake',
        'slug' => 'chocolate-lava-cake',
        'description' => 'Warm, gooey chocolate cake.',
        'price' => 8.99,
        'is_available' => true,
    ]);

    // Act & Assert: Ensure the item name appears on the page
    get('/menu')
        ->assertStatus(200)
        ->assertSee('Chocolate Lava Cake')
        ->assertSee('8.99');
});

it('does not display unavailable menu items', function () {
    $category = Category::create(['name' => 'Drinks', 'slug' => 'drinks']);

    MenuItem::create([
        'category_id' => $category->id,
        'name' => 'Seasonal Smoothie',
        'slug' => 'seasonal-smoothie',
        'price' => 5.99,
        'is_available' => false, // Set to false
    ]);

    // Act & Assert: The hidden item should not be rendered
    get('/menu')
        ->assertStatus(200)
        ->assertDontSee('Seasonal Smoothie');
});