var stackexchange = require("stackexchange");
var fs = require("fs");

var options = { version: 2.2 };
var context = new stackexchange(options);
// console.log(context);
var filter = {
  key: "xGaOIBmQmZhokjE1)NfHlQ((",
  pagesize: 100,
  tagged: "node.js",
  sort: "activity",
  order: "asc"
};

// Get all the questions (http://api.stackexchange.com/docs/questions)
context.questions.questions(filter, function(err, results) {
  if (err) throw err;

  //console.log("questions has more:", results.has_more);
  const questions_notScraped = results.items;
  var main_data = [];
  var tags = [];
  questions_notScraped.forEach(question => {
    var answered_plus = 0;
    if (question.is_answered) answered_plus = 1;
    for (const tag of question.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag);
        main_data.push({
          name: tag,
          count: 1,
          answered_count: answered_plus
        });
      } else {
        main_data[tags.indexOf(tag)].count++;
        main_data[tags.indexOf(tag)].answered_count += answered_plus;
      }
    }
  });
  fs.appendFileSync("./public/questions.json", JSON.stringify(main_data));
  fs.appendFileSync(
    "./old_questions.json",
    JSON.stringify(questions_notScraped)
  );
});
