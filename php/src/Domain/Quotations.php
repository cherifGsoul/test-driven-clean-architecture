<?php


namespace Sales\Domain;


interface Quotations
{

    public function add(Quotation $quotation);
    public function get(string $id): Quotation;
}