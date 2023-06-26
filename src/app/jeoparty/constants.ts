export const jeopartyConsts = {
  categoriesToPlay: 6,
  questionsToPlay: 5,
  /** Total number of categories in the jServiceApi  */
  categoryCount: 28163,
  /** Manually discovered categories that do not have enough questions for Jeoparty */
  invalidCategories: [1, 21, 35, 70, 78, 128],
  categoryDigits: function () {
    return this.categoryCount.toString().length;
  },
  questionDigits: 3,
  categorySeparator: '-',
  questionSeparator: '_',
  disclaimer:
    'These clue/answers come from a third party api (jservice.io) and cannot be guaranteed to be properly solvable.',
};

export const apiRoutes = {
  /** Route to get a category by id and all of its questions. */
  category: 'http://jservice.io/api/category?id=',
};
