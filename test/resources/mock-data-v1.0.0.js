module.exports = {
  title: "Stimmanteile Parlament",
  subtitle: "Möglichkeit zusätzliche Informationen als Untertitel zu erfassen",
  sources: [
    {
      text: "some source",
      link: {
        url: "https://www.nzz.ch",
        isValid: true
      }
    }],
  threshold: 5,
  parties: [
    {
      color: {
        colorCode: "#0084c7"
      },
      percentage: 30,
      previous: 35
    },
    {
      name: "SPD",
      color: {
        colorCode: "#c31906"
      },
      percentage: 20,
      previous: 18
    },
    {
      name: "B90/Die Grünen",
      color: {
        colorCode: "#66a622"
      },
      percentage: 10,
      previous: 7
    }
  ]
}
