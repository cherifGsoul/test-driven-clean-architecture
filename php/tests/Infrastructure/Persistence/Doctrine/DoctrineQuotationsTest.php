<?php
declare(strict_types=1);

namespace Sales\Test\Infrastructure\Persistence\Doctrine;

use PHPUnit\Framework\TestCase;
use Sales\Test\Domain\QuotationsContract;

class DoctrineQuotationsTest extends TestCase
{
    use QuotationsContract;

    protected function setUp(): void
    {
        $this->quotations = new DoctrineQuotations;
    }
}