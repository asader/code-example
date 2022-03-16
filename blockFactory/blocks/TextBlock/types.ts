import { EditorState } from 'draft-js';

export type TextProps = {
  content: string;
};

export interface FormattedValueProps{
  content: EditorState;
}
