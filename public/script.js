const main = () => {
  google.charts.load("45", { packages: ["corechart"] });

  google.charts.setOnCallBack(allQuestions_pie);

  const allQuestions_pie = () => {
    $.ajax({
      url: "questions",
      dataType: "json",
      success: jsonData => {
        const data = new google.visualization.DataTable(jsonData);
      }
    });
  };
};

window.onload = main;
