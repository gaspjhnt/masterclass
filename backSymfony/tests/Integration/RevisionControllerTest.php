<?php

namespace App\Tests\Integration;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class ReservationControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();
        $client->request('GET', '/api/reservation/');
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
    }

    public function testCreate()
    {
        $client = static::createClient();
        $client->request('POST', '/api/events', [], [], [], json_encode([
            'name' => 'Test event',
            'type_id' => 1,
            'start_date' => '2021-12-01T00:00:00+00:00',
            'end_date' => '2021-12-02T00:00:00+00:00',
            'image' => 'test.jpg',
            'places_total' => 100,
            'places_reserved' => 0,
            'adult_only' => false,
            'canceled' => false,
            'canceled_message' => "",
        ]));

        $client->request('GET', '/api/events');
        $events = json_decode($client->getResponse()->getContent(), true)['events'];
        $postData = json_encode([
            'nb_persons' => 3,
            'user_id' => 1,  
            'event_id' => $events[0]['id'],
        ]);

        $client->request('POST', '/api/reservation/create', [], [], [], $postData);
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
    }

    /**
     * @depends testCreate
     */
    public function testUpdate()
    {
        $client = static::createClient();
        $client->request('GET', '/api/reservation/');
        $reservations = json_decode($client->getResponse()->getContent(), true)['reservations'];
        $reservationId = $reservations[0]['id'];

        $updateData = json_encode([
            'nb_persons' => 4,
        ]);

        $client->request('POST', '/api/reservation/update/' . $reservationId, [], [], [], $updateData);
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
    }

    /**
     * @depends testUpdate
     */
    public function testDelete()
    {
        $client = static::createClient();
        $client->request('GET', '/api/reservation/');
        $reservations = json_decode($client->getResponse()->getContent(), true)['reservations'];
        $reservationId = $reservations[0]['id']; 

        
        $client->request('DELETE', '/api/reservation/delete/' . $reservationId);
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        
        $client->request('DELETE', '/api/events/' . $reservations[0]['event']['id']);
    }
}
