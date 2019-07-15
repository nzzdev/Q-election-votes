<script>
  export let item;
  export let hasTrendSpace;
</script>

<div class="q-election-item">
  <div class="q-election-item-text">
    <div class="s-font-text-s q-election-item-text-party">{item.name}</div>
    {#if item.percentage}
      <div class="s-font-note q-election-item-text-current">
         {item.percentage}%
      </div>
      {#if hasTrendSpace}
        <div
          class="s-font-note q-election-item-text-previous"
          style="width: {item.trendWidth};">
          {#if item.trend}{#if item.trend > 0}+{/if}{#if item.trend != 0}{item.trend}{/if}{/if}
        </div>
        <div class="q-election-item-text-trend-container">
          {#if item.trend}
            <svg
              style="transform: rotate({item.trendDegree}deg);"
              width="14"
              height="14"
              class="q-election-item-text-trend s-color-gray-8"
              viewBox="0 0 13 13"
              xmlns="http://www.w3.org/2000/svg">
              <g fill="currentColor" fill-rule="evenodd">
                <path
                  d="M11.096 11.096a6.5 6.5 0 1 1-9.192-9.192 6.5 6.5 0 0 1
                  9.192 9.192zm-.707-.707a5.5 5.5 0 1 0-7.778-7.778 5.5 5.5 0 0
                  0 7.778 7.778z" />
                <path d="M7 7H3V6h4V4l4 2.5L7 9V7z" />
              </g>
            </svg>
          {:else}
            <div class="q-election-item-text-trend" />
          {/if}
        </div>
      {/if}
    {/if}
  </div>
  <div class="q-election-item-bar s-color-gray-3">
    <div
      class="q-election-item-bar-color {item.colorClass}"
      style="width: {item.width}; {item.colorStyle}" />
  </div>
</div>
