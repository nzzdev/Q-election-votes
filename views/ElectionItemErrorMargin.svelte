<script>
  import * as d3format from 'd3-format';

  const locale = d3format.formatDefaultLocale({
    decimal: ",",
    thousands: " ", // this is a viertelgeviert U+2005
    type: " ",
    minus: "–" // U+2013
  });

  const formatSigned = d3format.format('+~r');
  const format = d3format.format('~r');

  export let item;
  export let maxErrorMarginValue;

  let hasErrorMargin =
    item.errorMargin &&
    item.errorMargin.lower !== undefined &&
    item.errorMargin.upper !== undefined;
  let barWidthPercentage = getBarWidthPercentage(item, maxErrorMarginValue);
  let coloredSlimBarWidthPercentage = getColoredSlimBarWidthPercentage(
    item,
    maxErrorMarginValue,
    hasErrorMargin
  );
  let errorMarginLeftPercentage = getErrorMarginLeftPercentage(
    item,
    maxErrorMarginValue,
    hasErrorMargin
  );
  let dotPositionLeftPercentage = getDotPositionLeftPercentage(
    item,
    maxErrorMarginValue
  );

  function getBarWidthPercentage(item, maxErrorMarginValue) {
    if (
      maxErrorMarginValue === undefined ||
      !item.errorMargin ||
      item.errorMargin.lower === undefined ||
      !item.errorMargin.upper === undefined
    ) {
      return 0;
    }
    return (
      (item.errorMargin.upper / maxErrorMarginValue) * 100 -
      (item.errorMargin.lower / maxErrorMarginValue) * 100
    );
  }

  function getColoredSlimBarWidthPercentage(
    item,
    maxErrorMarginValue,
    hasErrorMargin
  ) {
    if (hasErrorMargin) {
      if (
        maxErrorMarginValue === undefined ||
        !item.errorMargin ||
        item.errorMargin.lower === undefined
      ) {
        return 0;
      }
      return (item.errorMargin.lower / maxErrorMarginValue) * 100;
    } else {
      if (
        maxErrorMarginValue === undefined ||
        !item.errorMargin ||
        item.errorMargin.bestGuess === undefined
      ) {
        return 0;
      }
      return (item.errorMargin.bestGuess / maxErrorMarginValue) * 100;
    }
  }

  function getErrorMarginLeftPercentage(item, maxErrorMarginValue) {
    return maxErrorMarginValue === undefined ||
      !item.errorMargin ||
      item.errorMargin.lower === undefined
      ? 0
      : (item.errorMargin.lower / maxErrorMarginValue) * 100;
  }

  function getDotPositionLeftPercentage(item, maxErrorMarginValue) {
    return maxErrorMarginValue === undefined ||
      !item.errorMargin ||
      item.errorMargin.bestGuess === undefined
      ? 0
      : (item.errorMargin.bestGuess / maxErrorMarginValue) * 100;
  }
</script>

<div class="q-election-item">
  <div class="q-election-item-text">
    <div class="s-font-text-s q-election-item-text-party">{item.name}</div>
    {#if hasErrorMargin}
      <div class="s-font-note q-election-item-text-current">
         {format(item.errorMargin.lower)}–{format(item.errorMargin.upper)}%
      </div>
    {:else if item.errorMargin && item.errorMargin.bestGuess}
      <div class="s-font-note q-election-item-text-current">
         {format(item.errorMargin.bestGuess)}%
      </div>
    {/if}
  </div>
  <div class="q-election-item-error-margin-bar">
    <div
      class="q-election-item-bar-color q-election-item-bar-color--fullwidth
      q-election-item-bar-color--slim s-color-gray-3" />
    <div
      class="q-election-item-bar-color q-election-item-bar-color--slim {item.colorClass}"
      style="width: {coloredSlimBarWidthPercentage}%; {item.colorStyle}" />
    {#if hasErrorMargin}
      <div
        class="q-election-item-bar-color q-election-item-bar-color--error-margin
        {item.colorClass}"
        style="left: {errorMarginLeftPercentage}%; width: {barWidthPercentage}%;
        {item.colorStyle}" />
    {/if}
    <div
      class="q-election-item-dot-color {item.colorClass}"
      style="left: {dotPositionLeftPercentage}%; {item.colorStyle}" />
  </div>
</div>
