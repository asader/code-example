export const setBlocks = (blocks: any) => ({
  type: 'SET_BLOCKS',
  blocks,
});

export const addBlock = (block: any) => ({
  type: 'ADD_BLOCK',
  block,
});

export const updateBlock = (id: string, block: any) => ({
  type: 'UPDATE_BLOCK',
  block,
  id,
});

export const deleteBlock = (id: string) => ({
  type: 'DELETE_BLOCK',
  id,
});
