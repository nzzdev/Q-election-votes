<script>
  export let errorMarginLabels;
  export let hasErrorMargin;
</script>

<div class="s-legend-icon-label">
  {#if errorMarginLabels}
    <div class="s-legend-item-label__item">
      <div class="s-legend-item-label__item__icon s-legend-item-label__item__icon--default s-viz-color-party-default-5" /><div class="s-legend-item-label__item__label">{errorMarginLabels.bestGuessLabel}</div>
    </div>
  {/if}
  {#if hasErrorMargin && errorMarginLabels}
    <div class="s-legend-item-label__item">
      <div class="s-legend-item-label__item__icon"><div class="q-election-error-margin-legend-symbol-margin s-color-gray-5" /></div><div class="s-legend-item-label__item__label">{errorMarginLabels.errorMarginLabel}</div>
    </div>
  {/if}
</div>
