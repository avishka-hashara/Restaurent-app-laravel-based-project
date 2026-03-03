<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Models\Reservation;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ReservationController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Reservations/Create');
    }

    public function store(StoreReservationRequest $request): RedirectResponse
    {
        Reservation::create($request->validated());

        return redirect()->route('home')->with('success', 'Reservation request submitted successfully! We will confirm shortly.');
    }
}
