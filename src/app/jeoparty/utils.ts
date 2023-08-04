import { delay, getRandomInteger } from '@/globals/utils';
import { apiRoutes, jeopartyConsts } from './constants';
import type { JeopardyCategory, QueryParams } from './types';

function getValidId(idsToIgnore: Set<number>) {
  let newId;

  do {
    newId = getRandomInteger(1, jeopartyConsts.categoryCount);
  } while (idsToIgnore.has(newId));
  return newId;
}

/**
 * Removes simple html brackets
 */
function removeSpecialCharacters(str: string): string {
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}

async function fetchCategoryById(id: number): Promise<JeopardyCategory> {
  await delay(50); // avoid too many quick requests on external api
  const res = await fetch(apiRoutes.category + id.toString(), {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Problem fetching category ${id}.`);
  }

  const data = (await res.json()) as JeopardyCategory;
  data.clues.forEach(clue => {
    clue.answer = removeSpecialCharacters(clue.answer);
    clue.question = removeSpecialCharacters(clue.question);
  });
  return data;
}

async function fetchCategoriesByParam(
  param: string,
): Promise<JeopardyCategory[]> {
  const categoryIds = param.split(jeopartyConsts.categorySeparator);
  if (categoryIds.length !== jeopartyConsts.categoriesToPlay)
    throw new Error('Invalid category url params.');

  const categories: JeopardyCategory[] = [];
  categoryIds.forEach(async categoryId => {
    categories.push(await fetchCategoryById(parseInt(categoryId)));
  });

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

/** Since some of the questions from the api do not have clue values,
 * check and replace with some value before sorting.
 */
function fillSort(category: JeopardyCategory) {
  category.clues = category.clues.map(clue => {
    return { ...clue, value: clue.value ?? 300 };
  });
  category.clues.sort((a, b) => a.value - b.value);
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

  categoryWithSelection.map(category => fillSort(category));

  return categoryWithSelection;
}

function selectRandomClues(categories: JeopardyCategory[]): JeopardyCategory[] {
  categories.forEach(category => {
    while (category.clues.length > jeopartyConsts.questionsToPlay) {
      category.clues.splice(getRandomInteger(0, category.clues.length), 1);
    }
    fillSort(category);
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

export function isCorrect(guess: string, answer: string): boolean {
  const ignoreWords = new RegExp(/\b(the|a|an)\b/g, 'i');
  const ignoreChars = new RegExp(/s\b|[-<>?!@#$%^*(),._+=\"'\{\}\[\]]*/g);
  const parensGroup = new RegExp(/\(([^)]+)\)/g);

  function normalize(str: string): string {
    return str
      .normalize()
      .toLowerCase()
      .replaceAll('&', 'and')
      .replaceAll(parensGroup, '')
      .replace(ignoreWords, '')
      .replace(ignoreChars, '')
      .trim();
  }

  const stdGuess = normalize(guess);

  if (stdGuess == normalize(answer)) return true;
  const parensAnswer = answer.match(/(?<=\().*?(?=\))/);

  if (parensAnswer) {
    return stdGuess == normalize(parensAnswer[0]);
  }

  return false;
}
