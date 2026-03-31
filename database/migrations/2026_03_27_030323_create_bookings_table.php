<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('barber_id')->nullable()->constrained()->onDelete('set null');
            $table->json('service_ids');
            $table->date('booking_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('total_price')->default(0);
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
