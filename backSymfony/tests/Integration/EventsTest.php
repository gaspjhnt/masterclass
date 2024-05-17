<?php

namespace App\Tests\Integration;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class EventControllerTest extends WebTestCase
{
    public function testRead()
    {
        $client = static::createClient();
        $client->request('GET', '/api/events');

        $response = $client->getResponse();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
    }

    // public function testCreate()
    // {
    //     $client = static::createClient();
    //     $client->request('POST', '/api/events', [], [], [], json_encode([
    //         'name' => 'Test event',
    //         'type' => 5,
    //         'start_date' => '2021-12-01T00:00:00+00:00',
    //         'end_date' => '2021-12-02T00:00:00+00:00',
    //         'image' => 'test.jpg',
    //         'places_total' => 100,
    //         'places_reserved' => 0,
    //         'adult_only' => false,
    //         'canceled' => false,
    //         'canceled_message' => "",
    //         'description' => 'Test description',
    //     ]));

    //     $response = $client->getResponse();

    //     $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
    // }

    // /**
    //  * @depends testCreate
    //  */
    // public function testUpdate()
    // {
    //     $client = static::createClient();
    //     $client->request('GET', '/api/events');
    //     $events = json_decode($client->getResponse()->getContent(), true)['events'];

    //     $client->request('PUT', '/api/events/' . $events[0]['id'], [], [], [], json_encode([
    //         'name' => 'Test event updated',
    //         'type' => 1,
    //         'start_date' => '2021-12-01T00:00:00+00:00',
    //         'end_date' => '2021-12-02T00:00:00+00:00',
    //         'image' => 'test.jpg',
    //         'places_total' => 100,
    //         'places_reserved' => 0,
    //         'adult_only' => false,
    //         'canceled' => true,
    //         'canceled_message' => "",
    //         'description' => 'Test description',
    //     ]));

    //     $response = $client->getResponse();
    //     $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

    //     $client->request('GET', '/api/events');
    //     $updatedEvents = json_decode($client->getResponse()->getContent(), true)['events'];

    //     fwrite(STDERR, print_r($updatedEvents, TRUE));
    //     $this->assertEquals(true, $updatedEvents[0]['canceled']);
    // }

    // /**
    //  * @depends testUpdate
    //  */
    // public function testDelete()
    // {
    //     $client = static::createClient();
    //     $client->request('GET', '/api/events');
    //     $events = json_decode($client->getResponse()->getContent(), true)['events'];

    //     $client->request('DELETE', '/api/events/' . $events[0]['id']);
    //     $response = $client->getResponse();
    //     $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
    // }
}