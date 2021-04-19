<?php
declare(strict_types=1);

namespace Sales\Test\Domain;

use Sales\Domain\Quotation;
use Sales\Domain\QuotationNotFound;

trait QuotationsContract
{
    private $quotations;

    /** @test */
    public function it_gives_an_id_to_quotation()
    {
        $quotation = new Quotation();
        $this->quotations->add($quotation);
        $this->assertNotNull($quotation->getId());
    }

    /** @test */
    public function it_finds_saved_quotation()
    {
        $quotation = new Quotation();
        $quotation->addItem('KEYBOARD');
        $this->quotations->add($quotation);
        $persisted = $this->quotations->get($quotation->getId());
        $this->assertEquals($quotation->getId(), $persisted->getId());
    }

    /** @test */
    public function it_throws_for_invalid_id()
    {
        $this->expectException(QuotationNotFound::class);
        $this->quotations->get('INVALID');
    }
}