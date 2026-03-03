<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'reservation_date',
        'reservation_time',
        'party_size',
        'status',
        'special_requests'
    ];
}
