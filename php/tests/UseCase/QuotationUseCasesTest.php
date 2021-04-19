<?php
declare(strict_types=1);

namespace Sales\Test\UseCase;

use PHPUnit\Framework\TestCase;
use Sales\Infrastructure\Persistence\Fake\FakeQuotations;
use Sales\UseCase\QuotationUseCase;

class QuotationUseCasesTest extends TestCase
{
    private QuotationUseCase $useCase;

    protected function setUp(): void
    {
        $this->useCase = new QuotationUseCase(new FakeQuotations);
    }

    /** @test */
    function it_should_add_items()
    {
        $quotationId = $this->useCase->createNew();
        $this->useCase->addItem($quotationId,'KEYBOARD');
        $actual = $this->useCase->listItems($quotationId);
        $expected = [
            ['item' => 'KEYBOARD', 'quantity' => 1]
        ];
        $this->assertEquals($expected, $actual);
    }

    /** @test */
    function it_should_aggregate_items_quantity()
    {
        $quotationId = $this->useCase->createNew();
        $this->useCase->addItem($quotationId, 'KEYBOARD');
        $this->useCase->addItem($quotationId, 'KEYBOARD');
        $this->useCase->addItem($quotationId, 'MOUSE');
        $actual = $this->useCase->listItems($quotationId);

        $expected = [
                ['item' => 'KEYBOARD', 'quantity' => 2],
                ['item' => 'MOUSE', 'quantity' => 1]
        ];
        $this->assertEquals($expected, $actual);
    }
}