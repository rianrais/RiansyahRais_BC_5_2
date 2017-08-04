<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Event;
use App\Ticket;

class EventListController extends Controller
{
    public function viewEvent() {
        $eventList = Event::get();
        return response()->json($eventList, 200);
    }

    public function newEvent() {
        try 
        {
            //Membuat validasi atas property.
            $this->validate($request, [
                'event_name' => 'required',
                'event_time' => 'required',
                'event_price' => 'required',
                'event_ticket_amount' => 'required'
            ]);
            
            //Memasukan input-request kedalam variable.
            $name = $request->input('event_name');
            $time = $request->input('event_time');
            $price = $request->input('event_price');
            $ticketAmount = $request->input('event_ticket_amount');

            //Dari variable diatas dimasukan kedalam DB.
            $event = new Event;
            $event->event_name = $name;
            $event->event_time = $time;
            $event->event_price = $price;
            $event->event_ticket_amount = $ticketAmount;
            $event->save();


            // Setelah save() mereturn data kembali.
            $eventList = Event::get();

            /*Message yang dikeluarkan setelah sukses memasukan data.
            Fungsi DB commit memasukan semua data yang sukses */
            DB::commit();
            return response()->json($eventList, 200);
        }

        catch(\Exception $e) 
        {
            DB::rollBack(); /* Fungsi ini merollback apabila terdapat 
                            data yang gagal/error masuk kedalam DB */
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    public function buyTicket() {
        try 
        {
            //Membuat validasi atas property.
            $this->validate($request, [
                'event_id' => 'required',
                'ticket_buyer_email' => 'required'
            ]);
            
            //Memasukan input-request kedalam variable.
            $eventid = $request->input('event_id');
            $buyerEmail= $request->input('ticket_buyer_email');

            //Dari variable diatas dimasukan kedalam DB.
            $buy = new Ticket;
            $buy->event_id = $eventid;
            $buy->ticket_buyer_email = $buyerEmail;
            $buy->ticket_code = str_random(20); // fungsi randomize code
            $buy->save();

            // Melakukan decrement ticket amount di table Event
            $event = Event::where('event_id', '=', $eventid)->decrement('event_ticket_amount');

            // Setelah save() mereturn data kembali.
            $eventList = Event::get();

            /*Message yang dikeluarkan setelah sukses memasukan data.
            Fungsi DB commit memasukan semua data yang sukses */
            DB::commit();
            return response()->json($eventList, 200);
        }

        catch(\Exception $e) 
        {
            DB::rollBack(); /* Fungsi ini merollback apabila terdapat 
                            data yang gagal/error masuk kedalam DB */
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
}
