import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_DEALS,
  PERIOD_ANALYTICS_MAP,
  SIDEBAR_NAV_ITEMS,
  TRAFFIC_SEGMENTS,
  filterDeals,
  formatCurrency,
  paginateDeals,
  sortDeals,
  validateDealForm,
} from './dashboardLogic';

test('sidebar navigation items match the 21 required items in exact order', () => {
  assert.equal(SIDEBAR_NAV_ITEMS.length, 21);
  assert.equal(SIDEBAR_NAV_ITEMS[0], 'Dashboard');
  assert.equal(SIDEBAR_NAV_ITEMS[20], 'Documentation');
});

test('monthly analytics matches exact reference figures ($3468.96 and 82)', () => {
  const monthly = PERIOD_ANALYTICS_MAP.Monthly;
  assert.equal(monthly.earnings, 3468.96);
  assert.equal(monthly.sales, 82);
  assert.equal(monthly.chartData.length, 6);
  assert.equal(monthly.chartData[0].label, 'Jan');
  assert.equal(monthly.chartData[5].label, 'Jun');
});

test('traffic segments sum to 100% with 33%, 55%, and 12%', () => {
  const percentages = TRAFFIC_SEGMENTS.map((s) => s.percentage).sort((a, b) => a - b);
  assert.deepEqual(percentages, [12, 33, 55]);
  const total = percentages.reduce((acc, val) => acc + val, 0);
  assert.equal(total, 100);
});

test('filterDeals searches by invoice, customer, country, or status', () => {
  const byCustomer = filterDeals(INITIAL_DEALS, 'Marko');
  assert.equal(byCustomer.length, 1);
  assert.equal(byCustomer[0].from, 'Italy');

  const byCountry = filterDeals(INITIAL_DEALS, 'Brazil');
  assert.equal(byCountry.length, 1);
  assert.equal(byCountry[0].customer, 'Charly Dues');

  const emptyMatch = filterDeals(INITIAL_DEALS, 'NonExistentXYZ');
  assert.equal(emptyMatch.length, 0);
});

test('sortDeals sorts records by price ascending and descending', () => {
  const sample = INITIAL_DEALS.slice(0, 5);
  const asc = sortDeals(sample, 'price', 'asc');
  assert.equal(asc[0].price, 299);
  assert.equal(asc[asc.length - 1].price, 2642);

  const desc = sortDeals(sample, 'price', 'desc');
  assert.equal(desc[0].price, 2642);
  assert.equal(desc[desc.length - 1].price, 299);
});

test('paginateDeals slices items accurately and clamps out-of-range pages', () => {
  const page1 = paginateDeals(INITIAL_DEALS, 1, 5);
  assert.equal(page1.items.length, 5);
  assert.equal(page1.startIndex, 1);
  assert.equal(page1.endIndex, 5);
  assert.equal(page1.totalPages, 4);

  const clamped = paginateDeals(INITIAL_DEALS, 99, 5);
  assert.equal(clamped.safePage, 4);
  assert.equal(clamped.items.length, 5);
});

test('validateDealForm rejects empty or invalid inputs and accepts valid deal data', () => {
  const invalidErrors = validateDealForm({
    invoice: '',
    customer: '',
    from: '',
    price: '-10',
    status: 'Process',
  });
  assert.ok(invalidErrors.invoice);
  assert.ok(invalidErrors.customer);
  assert.ok(invalidErrors.from);
  assert.ok(invalidErrors.price);

  const validErrors = validateDealForm({
    invoice: '12399',
    customer: 'Acme Corp',
    from: 'USA',
    price: '1450',
    status: 'Open',
  });
  assert.equal(Object.keys(validErrors).length, 0);
});

test('formatCurrency formats decimals and integers cleanly', () => {
  assert.equal(formatCurrency(3468.96, true), '$3468.96');
  assert.equal(formatCurrency(299, false), '$299');
});
