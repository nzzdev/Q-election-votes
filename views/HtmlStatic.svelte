<script>
  import Header from "./Header.svelte";
  import Threshold from "./Threshold.svelte";
  import ElectionItem from "./ElectionItem.svelte";
  import ElectionItemErrorMargin from "./ElectionItemErrorMargin.svelte";
  import Footer from "./Footer.svelte";

  export let item;
  export let displayOptions;

  let hideTitle = displayOptions.hideTitle;
  let hasCurrentResults = getHasCurrentResults(item);
  let hasCurrentErrorMargins = getHasCurrentErrorMargins(item);
  let sortedParties = getSortedParties(item);
  let hasTrendSpace = getHasTrendSpace(item);
  let maxResult = getMaxResult(sortedParties, item);
  let maxErrorMarginValue = getMaxErrorMarginValue(sortedParties, item);
  let base = getBase(
    maxResult,
    maxErrorMarginValue,
    hasCurrentResults,
    hasCurrentErrorMargins
  );
  let enhancedParties = getEnhancedParties(sortedParties, maxResult);
  let hasErrorMargin = getHasErrorMargin(item);
  let thresholdOffsetClasses = getThresholdOffsetClasses(item, base);
  let hideUpdatedDate = item.options && item.options.hideUpdatedDate;

  function getHasCurrentResults(item) {
    let currentResults = item.parties.filter(
      party => party.percentage !== undefined
    );
    return currentResults.length > 0;
  }

  function getHasCurrentErrorMargins(item) {
    let currentResults = item.parties.filter(
      party =>
        party.errorMargin !== undefined &&
        party.errorMargin.bestGuess !== undefined
    );
    return currentResults.length > 0;
  }

  function getSortedParties(item) {
    if (item.parties !== undefined) {
      if (item.withErrorMargin) {
        return item.parties.sort(function(partyA, partyB) {
          // if both have no errorMargin set, keep the order
          if (
            partyA.errorMargin === undefined &&
            partyB.errorMargin === undefined
          ) {
            return 0;
          } // if only A has no errorMargin, sort B before A
          if (
            partyA.errorMargin === undefined &&
            partyB.errorMargin !== undefined
          ) {
            return 1;
          }
          // if only A has no bestGuess or B bestGuess is higher than A, sort B before A
          if (
            (partyA.errorMargin.bestGuess === undefined &&
              partyB.errorMargin.bestGuess !== undefined) ||
            partyA.errorMargin.bestGuess < partyB.errorMargin.bestGuess
          ) {
            return 1;
          }
          // otherwise sort A before B
          return -1;
        });
      }
      return item.parties.sort(function(partyA, partyB) {
        if (
          (partyA.percentage === undefined &&
            partyB.percentage === undefined) ||
          partyA.percentage === partyB.percentage
        ) {
          return 0;
        }
        if (
          (partyA.percentage === undefined &&
            partyB.percentage !== undefined) ||
          partyA.percentage < partyB.percentage
        ) {
          return 1;
        }
        return -1;
      });
    } else {
      return [];
    }
  }

  function getHasTrendSpace(item) {
    const partiesWithPreviousResult = item.parties.filter(
      party => party.previous !== undefined
    );
    return partiesWithPreviousResult.length > 0;
  }

  function getMaxResult(sortedParties, item) {
    let maxResult = 0;
    // get maxResult of all parties, others included
    maxResult = Math.max(
      ...sortedParties.map(parties => parties.percentage),
      0
    );
    if (item.threshold > maxResult) {
      return item.threshold;
    }
    return maxResult;
  }

  function getMaxErrorMarginValue(sortedParties, item) {
    let maxErrorMarginValue = undefined;
    // if there are already any errorMargins the first party
    // of sorted list of party has max errorMargin upper bound
    if (
      sortedParties[0] &&
      sortedParties[0].errorMargin &&
      sortedParties[0].errorMargin.bestGuess
    ) {
      maxErrorMarginValue = sortedParties[0].errorMargin.bestGuess;
    }
    if (
      sortedParties[0] &&
      sortedParties[0].errorMargin &&
      sortedParties[0].errorMargin.upper
    ) {
      maxErrorMarginValue = sortedParties[0].errorMargin.upper;
    }
    if (item.threshold > maxErrorMarginValue) {
      return item.threshold;
    }
    return maxErrorMarginValue;
  }

  function getBase(
    maxResult,
    maxErrorMarginValue,
    hasCurrentResults,
    hasCurrenterrorMargins
  ) {
    let base = Math.max(maxResult || 0, maxErrorMarginValue || 0);
    if (!hasCurrentResults && !hasCurrenterrorMargins) {
      base = 100;
    }
    return base;
  }

  // return the number of decimal places for each percentage number
  function getDecimalsInput(percentages) {
    return percentages.map(percentageValue => {
      if (percentageValue !== undefined) {
        let percentageString = percentageValue.toString();
        let parts = percentageString.split(".");
        if (parts[1] !== undefined) {
          return parts[1].length;
        }
      }
      return 0;
    });
  }

  // define the number of decimal places which shall be displayed, max = 2
  function setDecimalsOutput(decimals) {
    let bigDecimals = decimals.filter(value => value > 1);
    if (bigDecimals !== undefined && bigDecimals.length > 0) {
      return 2;
    }
    let oneDecimal = decimals.filter(value => value === 1);
    if (oneDecimal !== undefined && oneDecimal.length > 0) {
      return 1;
    }
    return 0;
  }

  function getEnhancedParties(sortedParties, maxResult) {
    // create an array for vote values (currentPercentages) and trend values (trendPercentages)
    let currentPercentages = sortedParties.map(party => party.percentage);
    let trendPercentages = sortedParties.map(party =>
      parseFloat((party.percentage - party.previous).toFixed(2))
    );

    // get number of decimal places for vote values and trend values
    let currentDecimals = getDecimalsInput(currentPercentages);
    let trendDecimals = getDecimalsInput(trendPercentages);

    // set number of decimals which should be displayed for vote values and trend values separately
    let currentNumberDecimals = setDecimalsOutput(currentDecimals);
    let trendNumberDecimals = setDecimalsOutput(trendDecimals);

    // if no color is defined for parties we assign a default color, which is one of the following
    // gray levels - other levels are either used or too light
    const defaultGrayLevels = [4, 5, 6, 7, 8, 9];

    sortedParties.forEach((party, index) => {
      // define width of each party's bar
      let width = "1px";
      if (maxResult > 0 && party.percentage && party.percentage > 0) {
        let widthPercentage = (party.percentage * 100) / maxResult;
        width = widthPercentage + "%";
      }
      party.width = width;

      // define color of each party's bar either via class attribute or color code
      let colorStyle = "";
      let colorClass = "";
      if (party.color) {
        if (party.color.classAttribute) {
          colorClass = party.color.classAttribute;
        } else if (party.color.colorCode) {
          colorStyle = "background-color: " + party.color.colorCode + ";";
        }
      }

      // if no color is defined assign a default color
      if (!colorClass && !colorStyle) {
        colorClass = `s-color-gray-${
          defaultGrayLevels[index % defaultGrayLevels.length]
        }`;
      }

      party.colorClass = colorClass;
      party.colorStyle = colorStyle;

      // calculate trend out of previous and current result and use it
      // to calculate rotation degree of trend arrow
      if (party.percentage !== undefined) {
        party.percentage = party.percentage.toFixed(currentNumberDecimals);

        if (party.previous !== undefined) {
          party.trend = party.percentage - party.previous;

          let trendDegree = (Math.min(Math.abs(party.trend), 5) * 90) / 5;
          if (party.trend > 0) {
            trendDegree = -trendDegree;
          }
          party.trendDegree = trendDegree;
          party.trend = party.trend.toFixed(trendNumberDecimals);
        }
      }
      party.trendWidth = 32 + trendNumberDecimals * 8 + "px"; // 32px as base-width
    });

    // process the group of other parties differently - not part of the threshold
    let othersIndex = sortedParties.findIndex(party => {
      let othersPattern = /((.*(A|a)ndere.*)|(.*(S|s)onstig.*))/;
      return othersPattern.test(party.name);
    });
    if (othersIndex >= 0) {
      let others = sortedParties.splice(othersIndex, 1);
      return {
        parties: sortedParties,
        others: others[0]
      };
    } else {
      return {
        parties: sortedParties
      };
    }
  }

  function getHasErrorMargin(item) {
    return item.parties.some(party => {
      return (
        party.errorMargin &&
        party.errorMargin.lower !== undefined &&
        party.errorMargin.upper !== undefined
      );
    });
  }

  function getThresholdOffsetClasses(item, base) {
    if (item.threshold !== undefined && item.threshold > 0 && base > 0) {
      let classes = "q-election-threshold-offset";
      if (item.withErrorMargin) {
        classes += " q-election-threshold-offset--error-margin";
      }
      return classes;
    }
    return "";
  }
</script>

<div class="s-q-item q-election" style="opacity: 0;">
  <Header
    title={item.title}
    {hideTitle}
    subtitle={item.subtitle}
    withErrorMargin={item.withErrorMargin}
    {hasErrorMargin}
    errorMarginLabels={item.errorMarginLabels} />
  <div class="q-election-parties {thresholdOffsetClasses}">
    <Threshold threshold={item.threshold} {base} />
    {#each enhancedParties.parties as party}
      {#if item.withErrorMargin}
        <ElectionItemErrorMargin item={party} {maxErrorMarginValue} />
      {:else}
        <ElectionItem item={party} {hasTrendSpace} />
      {/if}
    {/each}
  </div>
  {#if enhancedParties.others}
    <div class="q-election-others">
      {#if item.withErrorMargin}
        <ElectionItemErrorMargin
          item={enhancedParties.others}
          {maxErrorMarginValue} />
      {:else}
        <ElectionItem item={enhancedParties.others} {hasTrendSpace} />
      {/if}
    </div>
  {/if}
  <Footer
    sources={item.sources}
    notes={item.notes}
    updatedDate={item.updatedDate}
    {hideUpdatedDate} />
</div>
