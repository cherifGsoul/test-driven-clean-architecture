<?php
declare(strict_types=1);

namespace Sales\Test\Domain;

use PHPUnit\Framework\TestCase;
use Sales\Domain\Quotation;

class QuotationTest extends TestCase
{
    private $quotation;
    
    protected function setUp(): void
    {
        $this->quotation = new Quotation;
    }

    protected function tearDown(): void
    {
        $this->quotation = null;
    }

    /** @test */
    public function it_has_no_identity_by_default()
    {
        $this->assertNull($this->quotation->getId());
    }

    /** @test */
    public function it_should_add_items()
    {
        $this->quotation->addItem('KEYBOARD');
        $actual = $this->quotation->getItems();
        $expected = [
            'KEYBOARD' => 1
        ];
        $this->assertEquals($expected, $actual);
    }

    /** @test */
    public function it_aggregates_items_quantity()
    {
        $this->quotation->addItem('KEYBOARD');
        $this->quotation->addItem('KEYBOARD');
        $actual = $this->quotation->getItems();
        $expected = [
            'KEYBOARD' => 2
        ];
        $this->assertEquals($expected, $actual);
    }
}