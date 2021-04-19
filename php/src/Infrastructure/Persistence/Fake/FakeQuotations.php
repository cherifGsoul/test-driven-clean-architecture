<?php


namespace Sales\Infrastructure\Persistence\Fake;

use Sales\Domain\Quotation;
use Sales\Domain\QuotationNotFound;
use Sales\Domain\Quotations;

class FakeQuotations implements Quotations
{
    private array $quotations = [];

    public function add(Quotation $quotation): void
    {
        $id = (string)count($this->quotations);
        $quotation->setId($id);
        $this->quotations[$id] = $quotation;
    }

    public function get(string $id): Quotation
    {
        if (!array_key_exists($id, $this->quotations)) {
            throw new QuotationNotFound("Quotation $id not found");
        }
        return $this->quotations[$id];
    }
}