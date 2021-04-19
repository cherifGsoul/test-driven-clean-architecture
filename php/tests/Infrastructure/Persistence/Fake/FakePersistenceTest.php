<?php
declare(strict_types=1);

namespace Sales\Test\Infrastructure\Persistence\Fake;

use PHPUnit\Framework\TestCase;
use Sales\Infrastructure\Persistence\Fake\FakeQuotations;
use Sales\Test\Domain\QuotationsContract;

class FakePersistenceTest extends TestCase
{
    use QuotationsContract;

    protected function setUp(): void
    {
        $this->quotations = new FakeQuotations();
    }

}