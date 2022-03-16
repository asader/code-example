import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect, DispatchProp, Provider } from 'react-redux';
import { createStore } from 'redux';

import {
  getImageCodeFromPath,
  getImagePathByCode,
  imageBase64ToCode,
  isBase64,
  makeid,
} from '../../utils/utils';
import {
  addBlock, deleteBlock, setBlocks, updateBlock,
} from './actions';

import { BlockButtonsList } from './blockFactory/BlockButtonsList';
import { BlockFactory } from './blockFactory/blockFactory';
import { LeadParagraphBlock } from './blockFactory/blocks/LeadParagraphBlock/LeadParagraphBlock';
import { OfferThumbnailBlock } from './blockFactory/blocks/OfferThumbnailBlock/OfferThumbnailBlock';
import { SubTitleBlock } from './blockFactory/blocks/SubTitleBlock/SubTitleBlock';
import { TitleBlock } from './blockFactory/blocks/TitleBlock/TitleBlock';
import { cabinComponentsToWysiwygBlocks } from './converters/cabinComponentsToWysiwygBlocks';
import { wysiwygBlocksToCabinComponents } from './converters/wysiwygBlocksToCabinComponents';
import { RectangleButton } from '../../components/Button';
import { Loader, PageLoader } from '../../components/Loader';
import { H1 } from '../../components/Typography';
import { useCustomRouter } from '../../hooks/useCustomRouter';
import {
  ssoCreateOfferItem,
  ssoEditOfferItem,
  ssoIsOfferEditable,
} from '../../requests/s7WMediaService/offer/ssoOfferRequests';
import { useUser } from '../../swr/hooks/useUser';
import { BlockList } from './BlockList';
import reducer from './reducers';
import { UndoRedo } from './UndoRedo';

import { OfferType } from '../../constants/app';
import { ButtonColor } from '../../constants/button';
import { ROUTES } from '../../constants/routes';

import { ComponentType } from '../../definitions/component';
import { EntityItem } from '../../definitions/entity';
import { WithLoginCheck } from '../../components/WithLoginCheck';
import {reqWysiwygRequests, reqWysiwygSave} from "./requests/fakeService/category/reqWysiwygRequests";

export interface EditorTemplateProps {
  entityData?: EntityItem;
  offer: OfferType;
  offerId?: string;
}

export type EditorProps = EditorTemplateProps &
DispatchProp & { blocks: any[] };

let EditorTemplate: React.FC<EditorProps> = ({
  wysiwygBlocks,
  offer,
  offerId,
  dispatch,
  blocks,
}) => {

  useEffect(() => {
    dispatch(setBlocks(wysiwygBlocks));
  }, []);

  const save = async () => {
    reqWysiwygSave()
  };

  const onBlockSubmit = (id: string, newValue: any) => {
    const oldValue = blocks.find((block) => block.id === id);
    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      dispatch(updateBlock(id, newValue));
    }
  };

  const editorBottomRef = useRef<HTMLDivElement>(null);

  const onDelete = (id: string) => {
    dispatch(deleteBlock(id));
  };

  const onCreateBlock = (block: any) => {
    dispatch(addBlock(block));
  };

  return (
    <>
      <BlockList
        blocks={blocks}
        onDelete={onDelete}
        onBlockSubmit={onBlockSubmit}
      />

      <div className="mx-auto max-w-screen-4xl sticky bottom-0 z-10">
        <div className="px-4 sm:px-6 py-4 bg-white border-t border-n-40 border-solid border-l border-r z-50 relative flex flex-row justify-between">
          <RectangleButton color={ButtonColor.Green} onClick={() => save()}>
            <div className="text-bold-18 p-2 flex items-center justify-center">
              <span>Сохранить</span>
            </div>
          </RectangleButton>

          <BlockButtonsList
            onCreateBlock={onCreateBlock}
            editorBottomRef={editorBottomRef}
          />

          <UndoRedo />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  blocks: state.blocks.present,
});

EditorTemplate = connect(mapStateToProps)(EditorTemplate);

const store = createStore(reducer);

export const Editor: React.FC<EditorTemplateProps> = (props) => (
  <Provider store={store}>
    <EditorTemplate {...(props as EditorProps)} />
  </Provider>
);
