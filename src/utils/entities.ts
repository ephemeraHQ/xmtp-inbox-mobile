export interface EntityObject<T> {
  ids: string[];
  entities: Record<string, T>;
}

export const createEntityObject = <T>(
  items: T[],
  idExtractor: (item: T) => string,
): EntityObject<T> => {
  const ids: string[] = [];
  const entities: Record<string, T> = {};
  items.forEach(item => {
    const id = idExtractor(item);
    ids.push(id);
    if (id in entities) {
      console.error('Duplicate id');
    }
    entities[id] = item;
  });
  return {ids, entities};
};

export const removeEntityObject = <T>(
  entityObject: EntityObject<T>,
  id: string,
): EntityObject<T> => {
  const ids = entityObject.ids.filter(it => it !== id);
  const entities = {...entityObject.entities};
  delete entities[id];
  return {ids, entities};
};
