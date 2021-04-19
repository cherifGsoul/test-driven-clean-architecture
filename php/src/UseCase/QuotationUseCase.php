<?php


namespace Sales\UseCase;


use Sales\Domain\Quotation;
use Sales\Domain\Quotations;

class QuotationUseCase
{
    private Quotations $quotations;

    public function __construct(Quotations $quotations)
    {
        $this->quotations = $quotations;
    }

    public function addItem(string $id, string $item): string
    {
        $quotation = $this->quotations->get($id);
        $quotation->addItem($item);
        $this->quotations->add($quotation);
        return $quotation->getId();
    }

    public function listItems(string $quotationId)
    {
        $quotation =$this->quotations->get($quotationId);
        $items = [];

        foreach ($quotation->getItems() as $item => $quantity) {
            $items[] = ['item' => $item, 'quantity' => $quantity];
        }
        return $items;
    }

    public function createNew()
    {
        $quotation = new Quotation();
        $this->quotations->add($quotation);
        return $quotation->getId();
    }
}