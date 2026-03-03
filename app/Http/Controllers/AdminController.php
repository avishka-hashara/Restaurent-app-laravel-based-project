<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Reservation;
use App\Models\ContactMessage;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        // Gather quick stats for the admin to see at a glance
        $stats = [
            'total_menu_items' => MenuItem::count(),
            'pending_reservations' => Reservation::where('status', 'pending')->count(),
            'unread_messages' => ContactMessage::where('is_read', false)->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}