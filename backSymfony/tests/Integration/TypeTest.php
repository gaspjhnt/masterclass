<?php

namespace App\Tests\Integration;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class TypeControllerTest extends WebTestCase
{
    public function testRead()
    {
        $client = static::createClient();
        $client->request('GET', '/api/type');

        $response = $client->getResponse();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
    }

    public function testCreate()
    {
        $client = static::createClient();
        $client->request('POST', '/api/type', [], [], [], json_encode([
            'name' => 'Type Test',
        ]));

        $response = $client->getResponse();

        $this->assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
    }

    /**
     * @depends testCreate
     */
    public function testUpdate()
{
    $client = static::createClient();
    $client->request('GET', '/api/type');
    $types = json_decode($client->getResponse()->getContent(), true)['types'];

    $client->request('PUT', '/api/type/' . $types[0]['id'], [], [], [], json_encode([
        'name' => 'Test event updated',
    ]));

    $response = $client->getResponse();
    $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

    $client->request('GET', '/api/type');
    $updatedTypes = json_decode($client->getResponse()->getContent(), true)['types'];

    $this->assertEquals('Test event updated', $updatedTypes[0]['name']);
}

    /**
     * @depends testUpdate
     */
    public function testDelete()
    {
        $client = static::createClient();
        $client->request('GET', '/api/type');
        $types = json_decode($client->getResponse()->getContent(), true)['types'];

        $client->request('DELETE', '/api/type/' . $types[0]['id']);
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
    }
}