import * as React from 'react';
import { useFormik } from 'formik';

import { draftJsToHtml } from '../../../../../utils/draftJs';
import { stripHtml } from '../../../../../utils/utils';

import { ToolbarComponent } from '../../../../../components/WysiswygEditor/HTMLEditor/HTMLEditor';
import { HTMLField } from '../../../../../components/WysiswygEditor/HTMLField';
import { IViewProps } from '../Block';

import { TextProps } from './types';
import { getFormattedValues, getSubmitValues } from './TextForm';

export const TextView: React.FC<IViewProps<TextProps>> = ({
  values, children, onSubmit,
}) => {
  const formik = useFormik({
    initialValues: getFormattedValues(values),
    onSubmit: (submitValues, { resetForm }) => {
      const formattedSubmitValues = getSubmitValues(submitValues);
      onSubmit(formattedSubmitValues);
      resetForm({
        values: getFormattedValues(formattedSubmitValues),
      });
    },
  });

  const { getFieldProps, setFieldValue, handleBlur } = formik;
  const contentFieldProps = getFieldProps('content');

  const onSave = () => {
    if (stripHtml(draftJsToHtml(contentFieldProps.value)).replace(/&nbsp;/g, ' ').trim()) {
      return formik.handleSubmit();
    }
    return () => {};
  };

  return (
    <div className="max-w-3xl relative group w-full mx-auto">
      {children}
      <HTMLField
        inline
        forceFocus
        inlineToolbarButtons={[
          ToolbarComponent.BOLD,
          ToolbarComponent.ITALIC,
          ToolbarComponent.UNDERLINE,
          ToolbarComponent.LINK,
          ToolbarComponent.SEPARATOR,
          ToolbarComponent.HEADLINES,
          ToolbarComponent.SEPARATOR,
          ToolbarComponent.UNORDERED_LIST,
          ToolbarComponent.ORDERED_LIST,
          ToolbarComponent.SEPARATOR,
          ToolbarComponent.TEXT_ALIGNMENT,
        ]}
        name="content"
        editorState={contentFieldProps.value}
        setFieldValue={setFieldValue}
        onSave={onSave}
        onBlur={handleBlur}
        placeholder="Начните писать текст"
        label="Текст"
        fieldDescription=""
      />
    </div>
  );
};
