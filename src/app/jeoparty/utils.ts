import { getRandomInteger } from '@/globals/utils';
import { apiRoutes, jeopartyConsts } from './constants';
import type { JeopardyCategory, QueryParams } from './types';

function getValidId(idsToIgnore: Set<number>) {
  let newId;

  do {
    //TODO reinstate after testing complete
    // newId = getRandomInteger(1, jeopartyConsts.categoryCount);
    newId = getRandomInteger(1, 10);
  } while (idsToIgnore.has(newId));
  return newId;
}

async function fetchCategoryById(id: number): Promise<JeopardyCategory> {
  console.log('category ' + id + ' is being fecthed!');
  const res = await fetch(apiRoutes.category + id.toString());

  if (!res.ok) {
    throw new Error(`Problem fetching category ${id}.`);
  }
  return res.json() as Promise<JeopardyCategory>;
}

async function fetchCategoriesByParam(
  param: string,
): Promise<JeopardyCategory[]> {
  const categoryIds = param.split(jeopartyConsts.categorySeparator);
  if (categoryIds.length !== jeopartyConsts.categoriesToPlay)
    throw new Error('Invalid category url params.');

  const categories = await Promise.all(
    categoryIds.map(categoryId => {
      return fetchCategoryById(parseInt(categoryId));
    }),
  );

  const tooFewQuestions = categories.find(
    category => category.clues_count < jeopartyConsts.questionsToPlay,
  );
  if (tooFewQuestions)
    //TODO add category id to blacklist
    throw new Error(
      `Not enough questions for the given category: ${tooFewQuestions.title} with id: ${tooFewQuestions.id}`,
    );

  return categories;
}

async function fetchRandomCategories(): Promise<JeopardyCategory[]> {
  const categories: JeopardyCategory[] = [];
  const idIgnoreSet = new Set(jeopartyConsts.invalidCategories);

  for (let count = 0; count < jeopartyConsts.categoriesToPlay; count++) {
    let category: JeopardyCategory;

    do {
      const id = getValidId(idIgnoreSet);
      category = await fetchCategoryById(id);
      //TODO add category id to blacklist
    } while (category.clues_count < 5);

    categories.push(category);
    idIgnoreSet.add(category.id);
  }
  return categories;
}

function selectCluesByParam(
  categories: JeopardyCategory[],
  questionParam: string,
): JeopardyCategory[] {
  const clueSelection = questionParam
    .split(jeopartyConsts.categorySeparator)
    .map(category => category.split(jeopartyConsts.questionSeparator));

  const categoryWithSelection = clueSelection.map((qs, index) => {
    categories[index].clues = qs.map(q => {
      const clue = categories[index].clues.find(
        clue => clue.id === parseInt(q),
      );
      if (!clue) throw new Error('Invalid Clue url params');
      return clue;
    });
    return categories[index];
  });

  categoryWithSelection.map(category =>
    category.clues.sort((a, b) => a.value - b.value),
  );

  return categoryWithSelection;
}

function selectRandomClues(categories: JeopardyCategory[]): JeopardyCategory[] {
  categories.forEach(category => {
    while (category.clues.length < jeopartyConsts.questionsToPlay) {
      category.clues.splice(getRandomInteger(0, category.clues.length), 1);
    }
    category.clues.sort((a, b) => a.value - b.value);
  });
  return categories;
}

export async function getCategoryQuestions(
  queryParams?: QueryParams | undefined,
): Promise<JeopardyCategory[]> {
  let categories: JeopardyCategory[];

  if (queryParams && queryParams.categories && queryParams.questions) {
    categories = await fetchCategoriesByParam(queryParams.categories);
    return selectCluesByParam(categories, queryParams.questions);
  }
  categories = await fetchRandomCategories();
  return selectRandomClues(categories);
}

export async function generateURLParams(categories: JeopardyCategory[]) {}
