import * as React from 'react';
import { useFormik } from 'formik';

import { draftJsToHtml, getEditorStateFromHtml } from '../../../../../utils/draftJs';

import { Form } from '../../../../../components/WysiswygEditor/Form';
import { ToolbarComponent } from '../../../../../components/WysiswygEditor/HTMLEditor/HTMLEditor';
import { HTMLField } from '../../../../../components/WysiswygEditor/HTMLField/HTMLField';
import { IFormProps } from '../Block';
import { BlockFormButtons } from '../BlockFormButtons';

import { FormattedValueProps, TextProps } from './types';

export const getFormattedValues = (values?: TextProps): FormattedValueProps => {
  return {
    content: getEditorStateFromHtml(values?.content),
  };
};
export const getSubmitValues = (values: FormattedValueProps): TextProps => {
  return {
    content: draftJsToHtml(values?.content),
  };
};

export const TextForm: React.FC<IFormProps<TextProps>> = (
  {
    values,
    onSubmit,
    onCancel,
    blockActions,
  },
) => {
  const formik = useFormik({
    initialValues: getFormattedValues(values),
    onSubmit: (submitValues) => {
      const formattedSubmitValues = getSubmitValues(submitValues);
      onSubmit(formattedSubmitValues);
    },
  });
  const {
    getFieldProps,
    setFieldValue,
    handleBlur,
    submitForm,
  } = formik;

  const contentFieldProps = getFieldProps('content');

  return (
    <div className="flex flex-col space-y-10">
      {blockActions(submitForm)}
      <Form onSubmit={formik.handleSubmit}>
        <HTMLField
          name="content"
          editorState={contentFieldProps.value}
          onBlur={handleBlur}
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
          ]}
          setFieldValue={setFieldValue}
          label="Текст"
          fieldDescription=""
        />

        <BlockFormButtons
          onCancel={onCancel}
          submitTitle="Сохранить текст"
        />
      </Form>
    </div>
  );
};
