<?php


namespace Sales\Domain;


class Quotation
{
    private ?string $id = null;
    private array $items = [];

    public function getId(): ?string
    {
        return $this->id;
    }

    public function addItem(string $item)
    {
        if (!array_key_exists($item, $this->items)) {
            $this->items[$item] = 0;
        }
        $this->items[$item]++;
    }

    /**
     * @return array
     */
    public function getItems(): array
    {
        return $this->items;
    }

    public function setId(string $id)
    {
        $this->id = $id;
    }
}